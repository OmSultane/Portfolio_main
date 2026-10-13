import type { AIAction } from '../../data/aiKnowledge';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: AIAction[];
  isFallback?: boolean;
}

export interface SuggestedQuestion {
  id: string;
  label: string;
}

export const DEFAULT_SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { id: '1', label: "Tell me about Om." },
  { id: '2', label: "Show me his best projects." },
  { id: '3', label: "What technologies does he know?" },
  { id: '4', label: "Tell me about his internship." },
  { id: '5', label: "What is he learning currently?" },
  { id: '6', label: "How can I contact him?" },
];
