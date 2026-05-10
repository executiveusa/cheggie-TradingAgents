/**
 * Zeus Agent - Aleksa's AI Trading Command Center
 * Chat interface to control Zeus - the autonomous trading decision engine
 * Ask Zeus anything. It analyzes, decides, and executes.
 */

'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'zeus';
  content: string;
  timestamp: Date;
  analysis?: {
    ticker?: string;
    decision?: string;
    confidence?: number;
    reasoning?: string;
  };
}

interface ZeusAnalysis {
  recommendation: string;
  confidence: number;
  reasoning: string;
  valuations: Record<string, number>;
  risks: string[];
  nextSteps: string[];
}

const ZEUS_SYSTEM_MESSAGE = `You are Zeus, an autonomous trading agent. You analyze stocks, identify opportunities, and make trading decisions.
When users ask about stocks, provide:
1. Clear recommendation (BUY/SELL/HOLD)
2. Confidence level (0-100)
3. Why you're recommending it
4. Key risks
5. What to do next

Keep responses concise and actionable.`;

export default function ZeusCommandCenter() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'zeus',
      content: "I'm Zeus. Ask me about any stock and I'll analyze it, compare valuations, assess risk, and tell you exactly what to do.",
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
      // Call Zeus API
      const response = await fetch('http://localhost:8000/zeus/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: input,
          tenant_id: 'aleksa',
          user_id: 'aleksa'
        })
      });

      const data = await response.json();

      const zeusMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'zeus',
        content: data.message || 'Analysis complete',
        timestamp: new Date(),
        analysis: data.analysis
      };

      setMessages(prev => [...prev, zeusMessage]);
    } catch (error) {
      console.error('[Zeus Error]', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'zeus',
        content: 'Connection error. Try again in a moment.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-950 border-b border-emerald-500/30 px-6 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Zeus Agent</h1>
              <p className="text-sm text-emerald-400">AI Trading Decision Engine</p>
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
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">⚡</span>
                </div>
              )}
              
              <div
                className={`max-w-2xl px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-slate-700 text-slate-100 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                
                {msg.analysis && (
                  <div className="mt-3 pt-3 border-t border-slate-600 space-y-2">
                    {msg.analysis.confidence !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-300">Confidence</span>
                        <div className="w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400"
                            style={{ width: `${msg.analysis.confidence}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {msg.analysis.risks && msg.analysis.risks.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-red-400">Risks:</p>
                        <ul className="text-xs text-slate-300 list-disc list-inside">
                          {msg.analysis.risks.slice(0, 2).map((risk, i) => (
                            <li key={i}>{risk}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-xs text-slate-400 mt-2">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">A</span>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm animate-pulse">⚡</span>
              </div>
              <div className="bg-slate-700 rounded-lg rounded-bl-none px-4 py-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-slate-950 border-t border-emerald-500/30 px-6 py-4 shadow-lg">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask Zeus about any stock... (e.g., 'Should I buy NVDA?' or 'Analyze TSLA')"
            className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-3 border border-emerald-500/30 focus:border-emerald-500 focus:outline-none placeholder-slate-500 text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
          >
            {loading ? 'Analyzing...' : 'Ask Zeus'}
          </button>
        </form>
        
        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto mt-3 flex gap-2 flex-wrap">
          <button
            onClick={() => setInput('Should I buy NVDA?')}
            className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
          >
            NVDA analysis
          </button>
          <button
            onClick={() => setInput('What are the risks in my tech portfolio?')}
            className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
          >
            Risk check
          </button>
          <button
            onClick={() => setInput('Find me the best entry point for TSLA')}
            className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
          >
            Find entry
          </button>
        </div>
      </div>
    </div>
  );
}
