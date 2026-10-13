import React from 'react';
import type { ChatMessage } from './types';
import { ActionButtons } from './ActionButtons';
import { Bot, User } from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
  onActionExecuted?: () => void;
}

/**
 * Lightweight safe markdown formatter for chat responses
 */
const renderFormattedText = (text: string) => {
  // Split into lines to preserve linebreaks and bullets
  const lines = text.split('\n');

  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={idx} className="h-2" />;
    }

    // Process bold (**word**) and inline code (`code`)
    const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);

    const formattedContent = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={pIdx}
            className="px-1.5 py-0.5 rounded bg-black/40 text-indigo-300 font-mono text-[11px] border border-white/[0.08]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });

    const isBullet = trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ');

    return (
      <div
        key={idx}
        className={`leading-relaxed text-xs sm:text-[13px] ${
          isBullet ? 'pl-2 text-slate-300 my-0.5' : 'my-0.5'
        }`}
      >
        {formattedContent}
      </div>
    );
  });
};

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message, onActionExecuted }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex items-start gap-2.5 my-3 animate-fadeIn ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
          isUser
            ? 'bg-indigo-600/30 border border-indigo-400/40 text-indigo-300'
            : 'bg-gradient-to-br from-indigo-900/60 to-cyan-900/40 border border-indigo-500/30 text-indigo-300'
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-4 h-4 text-indigo-400" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[85%] sm:max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm text-slate-100 ${
            isUser
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-sm border border-indigo-500/30'
              : 'bg-[#111422] border border-white/[0.08] rounded-tl-sm text-slate-200'
          }`}
        >
          {/* Formatted Content */}
          <div className="space-y-0.5">
            {renderFormattedText(message.content)}
          </div>

          {/* Contextual Action Buttons */}
          {!isUser && message.actions && message.actions.length > 0 && (
            <ActionButtons actions={message.actions} onActionExecuted={onActionExecuted} />
          )}
        </div>

        {/* Timestamp */}
        <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};
