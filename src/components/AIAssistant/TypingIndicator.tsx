import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-2.5 animate-fadeIn">
      {/* Bot Icon */}
      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 border border-white/15 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.25)] flex items-center justify-center shrink-0 mt-0.5 backdrop-blur-md">
        <Bot className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]" />
      </div>

      <div className="glass-bubble-ai px-4 py-3 rounded-2xl rounded-tl-xs inline-flex items-center gap-2 shadow-md">
        <span className="w-2 h-2 rounded-full bg-indigo-400/90 shadow-[0_0_6px_rgba(99,102,241,0.7)] animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-indigo-400/90 shadow-[0_0_6px_rgba(99,102,241,0.7)] animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-indigo-400/90 shadow-[0_0_6px_rgba(99,102,241,0.7)] animate-bounce" />
        <span className="text-[11px] font-mono text-slate-300 ml-1.5">Thinking...</span>
      </div>
    </div>
  );
};
