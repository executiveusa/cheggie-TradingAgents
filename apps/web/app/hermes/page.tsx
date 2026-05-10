/**
 * Zeus Agent - White-Label Chat Interface
 * Each customer gets Zeus with their branding
 * Simple chat to analyze stocks and make trading decisions
 */

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'zeus';
  content: string;
  timestamp: Date;
}

interface TenantTheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  logo?: string;
}

const TENANT_THEMES: Record<string, TenantTheme> = {
  'aleksa': {
    name: 'Aleksa',
    primary: '#10b981',
    secondary: '#1e293b',
    accent: '#f59e0b'
  },
  'client-a': {
    name: 'TechVest Capital',
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#06b6d4'
  },
  'client-b': {
    name: 'Velocity Trading',
    primary: '#ec4899',
    secondary: '#831843',
    accent: '#fbbf24'
  }
};

function ZeusWhiteLabelContent() {
  const searchParams = useSearchParams();
  const tenantId = searchParams.get('tenant') || 'aleksa';
  const theme = TENANT_THEMES[tenantId] || TENANT_THEMES['aleksa'];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'zeus',
      content: `I'm Zeus. Ask me anything about the market. I'll analyze stocks, identify opportunities, and tell you exactly what to do.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/zeus/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: input,
          tenant_id: tenantId,
          user_id: 'user-' + tenantId
        })
      });

      const data = await response.json();
      const zeusMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'zeus',
        content: data.message || 'Analysis complete. Let me know what else you need.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, zeusMessage]);
    } catch (error) {
      console.error('[Zeus Error]', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'zeus',
        content: 'Sorry, I had trouble analyzing that. Try again?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex flex-col h-screen"
      style={{ backgroundColor: theme.secondary }}
    >
      {/* Header */}
      <header 
        className="border-b px-6 py-4 shadow-lg"
        style={{ 
          backgroundColor: theme.secondary,
          borderColor: theme.primary + '30'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.primary }}
            >
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Zeus</h1>
              <p className="text-sm" style={{ color: theme.primary }}>
                Trading Analysis for {theme.name}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'zeus' && (
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: theme.primary }}
                >
                  <span className="text-white text-sm">⚡</span>
                </div>
              )}
              
              <div
                className={`max-w-2xl px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'rounded-br-none text-white'
                    : 'rounded-bl-none text-gray-100'
                }`}
                style={{
                  backgroundColor: msg.role === 'user' 
                    ? theme.primary 
                    : 'rgba(255,255,255,0.1)',
                  borderColor: theme.primary + '30'
                }}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs mt-2 opacity-60">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {msg.role === 'user' && (
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: theme.primary }}
                >
                  <span className="text-white text-sm">👤</span>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-4 justify-start">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: theme.primary }}
              >
                <span className="text-white text-sm animate-pulse">⚡</span>
              </div>
              <div className="rounded-lg rounded-bl-none px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <div className="flex gap-2">
                  <div 
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div 
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: theme.primary, animationDelay: '0.1s' }}
                  />
                  <div 
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: theme.primary, animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div 
        className="border-t px-6 py-4 shadow-lg"
        style={{ 
          backgroundColor: theme.secondary,
          borderColor: theme.primary + '30'
        }}
      >
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask Zeus about any stock..."
            className="flex-1 rounded-lg px-4 py-3 border focus:outline-none placeholder-gray-400 text-sm text-white"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderColor: theme.primary + '50',
              color: 'white'
            }}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 rounded-lg font-medium transition-opacity text-white disabled:opacity-50"
            style={{ backgroundColor: theme.primary }}
          >
            {loading ? 'Analyzing...' : 'Ask'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ZeusWhiteLabel() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen bg-slate-900">Loading...</div>}>
      <ZeusWhiteLabelContent />
    </Suspense>
  );
}
