import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-2.5 animate-fadeIn">
      {/* Bot Icon */}
      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600/30 to-cyan-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
        <Bot className="w-4 h-4 text-indigo-400" />
      </div>

      <div className="bg-[#121626] border border-white/[0.08] px-4 py-3 rounded-2xl rounded-tl-sm inline-flex items-center gap-1.5 shadow-md">
        <span className="w-2 h-2 rounded-full bg-indigo-400/80 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-indigo-400/80 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-indigo-400/80 animate-bounce" />
        <span className="text-[11px] font-mono text-slate-400 ml-1.5">Thinking...</span>
      </div>
    </div>
  );
};
