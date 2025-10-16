'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { ModelSelector } from './ModelSelector';
import { Loader2 } from 'lucide-react';

export type AIModel = 'openai' | 'anthropic';

export function ChatInterface() {
  const [selectedModel, setSelectedModel] = useState<AIModel>('openai');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('selectedModel');
    if (stored === 'openai' || stored === 'anthropic') {
      setSelectedModel(stored);
    }
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, stop } = useChat({
    api: '/api/chat',
    body: {
      model: selectedModel,
    },
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleModelChange = (model: AIModel) => {
    setSelectedModel(model);
    localStorage.setItem('selectedModel', model);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">AI Chat</h1>
          <ModelSelector selectedModel={selectedModel} onModelChange={handleModelChange} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Start a conversation</h2>
              <p className="text-gray-500 max-w-md">
                Ask me anything! I&apos;m powered by {selectedModel === 'openai' ? 'GPT-4' : 'Claude 3.5 Sonnet'}.
              </p>
            </div>
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
            <strong>Error:</strong> {error.message}
          </div>
        </div>
      )}

      <div className="border-t bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {isLoading && (
            <div className="mb-2 flex items-center gap-2">
              <button
                onClick={stop}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 transition-colors"
              >
                <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                Stop generating
              </button>
            </div>
          )}
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
