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
    <form onSubmit={handleSubmit} className="relative p-3 border-t border-white/[0.08] bg-[#0c0f1c]">
      <div className="relative flex items-end rounded-xl bg-[#141828] border border-white/[0.1] focus-within:border-indigo-500/50 transition-colors">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={1000}
          rows={1}
          disabled={isLoading}
          className="w-full resize-none bg-transparent py-2.5 pl-3.5 pr-10 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none max-h-28 overflow-y-auto"
          aria-label="Message input"
        />

        <div className="absolute right-2 bottom-1.5 flex items-center">
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:hover:bg-indigo-600 transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 px-1 font-mono">
        <span className="flex items-center gap-1 hidden sm:inline-flex">
          <CornerDownLeft className="w-2.5 h-2.5" />
          <span>Press Enter to send, Shift+Enter for new line</span>
        </span>
        <span className="sm:hidden">Press Enter to send</span>
        <span>{input.length}/1000</span>
      </div>
    </form>
  );
};
