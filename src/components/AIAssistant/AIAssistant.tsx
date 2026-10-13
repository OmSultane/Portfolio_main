import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from './types';
import { DEFAULT_SUGGESTED_QUESTIONS } from './types';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import {
  Sparkles,
  X,
  Minus,
  Maximize2,
  Trash2,
  Bot,
  Info
} from 'lucide-react';

const WELCOME_CONTENT = `Hey there! 👋 I'm Om's AI assistant.

Curious about Om's projects, technical skills, or development journey? Ask me anything, and I'll help you explore his portfolio.`;

const getTimestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const createInitialWelcomeMessage = (): ChatMessage => ({
  id: 'welcome',
  role: 'assistant',
  content: WELCOME_CONTENT,
  timestamp: getTimestamp(),
  actions: [
    { id: 'w1', label: 'Explore Projects', type: 'scroll', target: 'projects' },
    { id: 'w2', label: 'View Technical Skills', type: 'scroll', target: 'skills' },
    { id: 'w3', label: 'Contact Om', type: 'scroll', target: 'contact' }
  ]
});

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnreadNotice, setHasUnreadNotice] = useState(true);
  const [providerNotice, setProviderNotice] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [createInitialWelcomeMessage()]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnreadNotice(false);
  };

  const handleClearChat = () => {
    setMessages([createInitialWelcomeMessage()]);
    setProviderNotice(null);
  };

  const handleSendMessage = async (userText: string) => {
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: userTimestamp
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Build payload with role and content
      const payloadMessages = updatedMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: payloadMessages })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server responded with status ${res.status}`);
      }

      if (data.providerNote) {
        setProviderNotice(data.providerNote);
      }

      const botReply: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.text || "I'm ready to answer any questions about Om's work and background.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: data.actions || [],
        isFallback: !data.isLiveAI
      };

      setMessages(prev => [...prev, botReply]);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Connection error';
      console.error('Chat error:', err);

      const errorReply: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `Sorry, I encountered a temporary connection issue (${errorMsg}). You can explore Om's portfolio sections directly using the navigation above.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { id: 'e1', label: 'Explore Projects', type: 'scroll', target: 'projects' },
          { id: 'e2', label: 'View Technical Skills', type: 'scroll', target: 'skills' },
          { id: 'e3', label: 'Contact Om', type: 'scroll', target: 'contact' }
        ]
      };
      setMessages(prev => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          {/* Subtle invitation tooltip on desktop */}
          {hasUnreadNotice && (
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d1020]/90 backdrop-blur-md border border-indigo-500/30 text-xs font-medium text-slate-200 shadow-xl shadow-indigo-950/40 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Ask Om's AI Assistant</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasUnreadNotice(false);
                }}
                className="text-slate-400 hover:text-white p-0.5"
                aria-label="Dismiss banner"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <button
            onClick={handleOpenChat}
            aria-label="Open Om's AI Assistant"
            className="group relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-xl shadow-indigo-950/50 border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
          >
            {/* Glow ring */}
            <span className="absolute -inset-1 rounded-2xl bg-indigo-500/30 blur-md group-hover:bg-indigo-400/50 transition-all pointer-events-none" />

            <div className="relative flex items-center gap-2">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden sm:inline font-medium text-xs tracking-wide">
                Ask Om's AI
              </span>
            </div>

            {/* Online Indicator Badge */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#07090e]" />
            </span>
          </button>
        </div>
      )}

      {/* Minimized Dock Bar */}
      {isOpen && isMinimized && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#0e111e]/95 backdrop-blur-xl border border-indigo-500/30 shadow-2xl shadow-indigo-950/50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Om's AI Assistant</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Active session
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 ml-4 border-l border-white/[0.1] pl-2">
              <button
                onClick={() => setIsMinimized(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                aria-label="Expand assistant"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Panel */}
      {isOpen && !isMinimized && (
        <div
          ref={chatContainerRef}
          role="dialog"
          aria-labelledby="ai-assistant-title"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[580px] max-h-[calc(100vh-32px)] flex flex-col rounded-3xl bg-[#090b14]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl shadow-black/80 overflow-hidden animate-fadeIn duration-200"
        >
          {/* Header */}
          <div className="relative px-4 py-3.5 border-b border-white/[0.08] bg-gradient-to-r from-indigo-950/50 via-[#0e1222] to-[#0a0d18] flex items-center justify-between shrink-0">
            {/* Header Identity */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 shadow-md shadow-indigo-600/30">
                  <div className="w-full h-full bg-[#0a0d18] rounded-[10px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-indigo-400" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#090b14]" />
              </div>

              <div>
                <h3 id="ai-assistant-title" className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>Om's AI Assistant</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Guide
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Your guide to my developer journey.
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                title="Minimize chat"
                aria-label="Minimize chat"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Provider Notification Banner (if fallback or provider notice active) */}
          {providerNotice && (
            <div className="px-3.5 py-2 bg-indigo-950/40 border-b border-indigo-500/20 text-[11px] text-indigo-300/90 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5 line-clamp-1">
                <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{providerNotice}</span>
              </div>
              <button
                onClick={() => setProviderNotice(null)}
                className="text-slate-400 hover:text-white ml-2 text-xs"
                aria-label="Dismiss notice"
              >
                &times;
              </button>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-2">
            {messages.map((msg) => (
              <ChatMessageItem
                key={msg.id}
                message={msg}
                onActionExecuted={() => {
                  // Optional: minimize or keep open on mobile
                  if (window.innerWidth < 640) {
                    setIsMinimized(true);
                  }
                }}
              />
            ))}

            {/* Suggested Questions Section shown after welcome */}
            {messages.length <= 1 && (
              <div className="mt-4 pt-3 border-t border-white/[0.06] animate-fadeIn">
                <p className="text-[11px] font-mono text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>Suggested questions to explore:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {DEFAULT_SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleSuggestedClick(q.label)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-white/[0.04] hover:bg-indigo-600/20 hover:border-indigo-500/40 text-slate-300 hover:text-white border border-white/[0.08] transition-all text-left cursor-pointer active:scale-95"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            placeholder="Ask about Om's skills, projects, or experience..."
          />
        </div>
      )}
    </>
  );
};
