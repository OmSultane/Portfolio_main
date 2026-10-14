import React, { useState, useRef, useEffect } from 'react';
import { Send, CornerDownLeft } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  placeholder = "Ask about Om's projects, skills, experience..."
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    onSendMessage(trimmed);
    setInput('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-adjust height
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <form onSubmit={handleSubmit} className="glass-chat-input-bar relative p-3 shrink-0 z-10">
      <div className="glass-chat-input-field relative flex items-end rounded-2xl transition-all">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={1000}
          rows={1}
          disabled={isLoading}
          className="w-full resize-none bg-transparent py-2.5 pl-3.5 pr-11 text-xs sm:text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none max-h-28 overflow-y-auto"
          aria-label="Message input"
        />

        <div className="absolute right-2 bottom-1.5 flex items-center">
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white disabled:opacity-40 disabled:hover:from-indigo-500 disabled:hover:to-indigo-600 transition-all cursor-pointer disabled:cursor-not-allowed shadow-[0_0_12px_rgba(99,102,241,0.4)] hover:scale-105 active:scale-95 border border-white/20"
          >
            {isLoading ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-1 font-mono">
        <span className="flex items-center gap-1 hidden sm:inline-flex">
          <CornerDownLeft className="w-2.5 h-2.5 text-indigo-400" />
          <span>Press Enter to send, Shift+Enter for new line</span>
        </span>
        <span className="sm:hidden">Press Enter to send</span>
        <span>{input.length}/1000</span>
      </div>
    </form>
  );
};
