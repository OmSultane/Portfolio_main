import React from 'react';
import type { AIAction } from '../../data/aiKnowledge';
import { ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';

interface ActionButtonsProps {
  actions?: AIAction[];
  onActionExecuted?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ actions, onActionExecuted }) => {
  if (!actions || actions.length === 0) return null;

  const handleActionClick = (action: AIAction) => {
    if (action.type === 'scroll') {
      const el = document.getElementById(action.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (action.type === 'open_modal') {
      // First scroll to projects section if needed
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        projectsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Dispatch event to open modal
      window.dispatchEvent(
        new CustomEvent('open-project-modal', {
          detail: { projectId: action.target }
        })
      );
    } else if (action.type === 'external_link') {
      window.open(action.target, '_blank', 'noopener,noreferrer');
    }

    if (onActionExecuted) {
      onActionExecuted();
    }
  };

  return (
    <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex flex-wrap gap-2">
      {actions.map((act) => (
        <button
          key={`${act.id}-${act.label}`}
          onClick={() => handleActionClick(act)}
          className="glass-pill-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-indigo-300 hover:text-white cursor-pointer active:scale-95 group text-left shadow-sm"
        >
          <Sparkles className="w-3 h-3 text-indigo-400 group-hover:text-indigo-300 transition-colors shrink-0" />
          <span>{act.label}</span>
          {act.type === 'external_link' ? (
            <ArrowUpRight className="w-3 h-3 text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          ) : (
            <ChevronRight className="w-3 h-3 text-indigo-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          )}
        </button>
      ))}
    </div>
  );
};
