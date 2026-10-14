import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
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

const emptySubscribe = () => () => {};

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnreadNotice, setHasUnreadNotice] = useState(true);
  const [providerNotice, setProviderNotice] = useState<string | null>(null);

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [messages, setMessages] = useState<ChatMessage[]>(() => [createInitialWelcomeMessage()]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen && !isMinimized && !isClosing) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen, isMinimized, isClosing]);

  const handleOpenChat = () => {
    setIsClosing(false);
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnreadNotice(false);
  };

  const handleCloseChat = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  }, [isClosing]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleCloseChat]);

  const handleToggleChat = () => {
    if (isOpen && !isMinimized) {
      handleCloseChat();
    } else {
      handleOpenChat();
    }
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

  if (!isClient) {
    return null;
  }

  const isPanelVisible = (isOpen || isClosing) && !isMinimized;

  const content = (
    <>
      {/* Floating Chat Dashboard Panel - Rendered via React Portal */}
      {isPanelVisible && (
        <div
          ref={chatContainerRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="ai-assistant-title"
          className={`glass-chat-panel glass-chat-dashboard ${
            isClosing ? 'animate-chat-close' : 'animate-chat-open'
          }`}
        >
          {/* Glass Header */}
          <div className="glass-chat-header relative px-4 py-3.5 flex items-center justify-between shrink-0 z-10">
            {/* Header Identity */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500/60 via-indigo-600/40 to-cyan-400/40 p-[1px] shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  <div className="w-full h-full bg-[#0a0d18]/60 backdrop-blur-md rounded-[11px] flex items-center justify-center border border-white/10">
                    <Bot className="w-5 h-5 text-indigo-300 drop-shadow-[0_0_6px_rgba(99,102,241,0.8)]" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#090b14] shadow-[0_0_6px_#10b981]" />
              </div>

              <div>
                <h3 id="ai-assistant-title" className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Om's AI Assistant</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 backdrop-blur-xs">
                    AI Guide
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Portfolio intelligence & career guide
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClearChat}
                className="glass-pill-btn p-1.5 rounded-lg text-slate-300 hover:text-white"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="glass-pill-btn p-1.5 rounded-lg text-slate-300 hover:text-white"
                title="Minimize chat"
                aria-label="Minimize chat"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCloseChat}
                className="glass-pill-btn p-1.5 rounded-lg text-slate-300 hover:text-white"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Provider Notification Banner */}
          {providerNotice && (
            <div className="px-3.5 py-2 bg-indigo-950/30 backdrop-blur-md border-b border-indigo-500/20 text-[11px] text-indigo-300 flex items-center justify-between shrink-0 z-10">
              <div className="flex items-center gap-1.5 line-clamp-1">
                <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{providerNotice}</span>
              </div>
              <button
                onClick={() => setProviderNotice(null)}
                className="text-slate-400 hover:text-white ml-2 text-xs transition-colors"
                aria-label="Dismiss notice"
              >
                &times;
              </button>
            </div>
          )}

          {/* Messages Scroll Area - Genuine Translucent Layer */}
          <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3 scroll-smooth relative z-10">
            {messages.map((msg) => (
              <ChatMessageItem
                key={msg.id}
                message={msg}
                onActionExecuted={() => {
                  if (window.innerWidth < 640) {
                    setIsMinimized(true);
                  }
                }}
              />
            ))}

            {/* Suggested Questions Section */}
            {messages.length <= 1 && (
              <div className="mt-4 pt-3 border-t border-white/[0.08] animate-fadeIn">
                <p className="text-[11px] font-mono text-slate-300 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Suggested questions to explore:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {DEFAULT_SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleSuggestedClick(q.label)}
                      className="glass-pill-btn px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-200 hover:text-white active:scale-95 text-left cursor-pointer"
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

          {/* Floating Glass Chat Input Area */}
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            placeholder="Ask about Om's skills, projects, or experience..."
          />
        </div>
      )}

      {/* Floating Chat Launcher Dock Bar / Orb */}
      <div className="glass-chat-launcher-container">
        {/* Minimized Dock Bar */}
        {isOpen && isMinimized ? (
          <div className="glass-chat-panel flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-2xl animate-chat-open">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500/40 to-cyan-500/30 border border-white/20 flex items-center justify-center text-indigo-300 shadow-inner">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white tracking-wide">Om's AI Assistant</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                  Active Session
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 ml-3 border-l border-white/10 pl-2">
              <button
                onClick={() => setIsMinimized(false)}
                className="glass-pill-btn p-1.5 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                aria-label="Expand assistant"
                title="Expand assistant"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCloseChat}
                className="glass-pill-btn p-1.5 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                aria-label="Close assistant"
                title="Close assistant"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Invitation Tooltip when chat is closed */}
            {hasUnreadNotice && !isOpen && (
              <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full glass-chat-panel border border-indigo-400/30 text-xs font-medium text-slate-200 shadow-2xl shadow-indigo-950/50 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="tracking-wide">Ask Om's AI Assistant</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHasUnreadNotice(false);
                  }}
                  className="text-slate-400 hover:text-white p-0.5 ml-1 transition-colors cursor-pointer"
                  aria-label="Dismiss banner"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Floating Launcher Button */}
            <button
              onClick={handleToggleChat}
              aria-label={isOpen && !isMinimized ? "Close AI Assistant" : "Open Om's AI Assistant"}
              aria-expanded={isOpen && !isMinimized}
              className={`glass-launcher-orb group relative p-3.5 sm:p-4 rounded-2xl text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${
                isOpen && !isMinimized ? 'ring-2 ring-indigo-400/60 shadow-indigo-500/30' : ''
              }`}
            >
              {/* Ambient halo glow */}
              <span className="absolute -inset-1.5 rounded-2xl bg-indigo-500/35 blur-lg group-hover:bg-indigo-400/55 transition-all pointer-events-none" />

              <div className="relative flex items-center gap-2.5 z-10">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                  {isOpen && !isMinimized ? (
                    <X className="w-4 h-4 text-white transition-transform duration-300" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  )}
                </div>
                <span className="hidden sm:inline font-semibold text-xs tracking-wider uppercase font-mono text-white drop-shadow">
                  {isOpen && !isMinimized ? 'Close Chat' : "Ask Om's AI"}
                </span>
              </div>

              {/* Glowing Emerald Online Indicator Badge (shown when not expanded) */}
              {(!isOpen || isMinimized) && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 z-20">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#090b14] shadow-[0_0_8px_#10b981]" />
                </span>
              )}
            </button>
          </>
        )}
      </div>
    </>
  );

  return createPortal(content, document.body);
};
