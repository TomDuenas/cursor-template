'use client';

import { AIModel } from './ChatInterface';

interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onModelChange('openai')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          selectedModel === 'openai'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        GPT-4
      </button>
      <button
        onClick={() => onModelChange('anthropic')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          selectedModel === 'anthropic'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Claude 3.5
      </button>
    </div>
  );
}
