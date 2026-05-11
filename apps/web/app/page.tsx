'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse-glow pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '2s' }} />
      
      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center glow-emerald">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight">Zeus</span>
            </div>
            
            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">How It Works</Link>
              <Link href="/aleksa" className="text-sm text-white/60 hover:text-white transition-colors">Dashboard</Link>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Link 
                href="/aleksa" 
                className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-emerald-400 transition-all hover:scale-105"
              >
                Launch Zeus
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.1s' }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-sm font-medium">AI-Powered Trading Analysis</span>
            </div>

            {/* Headline */}
            <h1 
              className={`text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.2s' }}
            >
              Your AI Agent That
              <br />
              <span className="gradient-text glow-text">Makes You Money</span>
            </h1>

            {/* Subheadline */}
            <p 
              className={`text-lg lg:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.3s' }}
            >
              Ask Zeus any trading question. It runs 6 institutional-grade analyses in parallel and tells you exactly what to do. Buy, sell, or hold.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.4s' }}
            >
              <Link 
                href="/aleksa" 
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-bold text-lg hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all hover:scale-105"
              >
                Start Trading with Zeus
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
              <Link 
                href="#how-it-works" 
                className="px-8 py-4 rounded-full border border-white/20 text-white/80 font-semibold hover:border-white/40 hover:text-white transition-all"
              >
                See How It Works
              </Link>
            </div>

            {/* Stats */}
            <div 
              className={`grid grid-cols-3 gap-8 max-w-2xl mx-auto ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.5s' }}
            >
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-black gradient-text">6</div>
                <div className="text-sm text-white/40 mt-1">Analysis Methods</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-black gradient-text">85%</div>
                <div className="text-sm text-white/40 mt-1">Avg Confidence</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-black gradient-text">3min</div>
                <div className="text-sm text-white/40 mt-1">Full Analysis</div>
              </div>
            </div>
          </div>

          {/* Hero Visual - Terminal/Chat Preview */}
          <div 
            className={`mt-20 mx-auto max-w-4xl ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.6s' }}
          >
            <div className="glass-card rounded-2xl p-1 glow-emerald">
              <div className="bg-black/80 rounded-xl p-6">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-white/40 text-sm font-mono">zeus-terminal</span>
                </div>
                
                {/* Chat Messages */}
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex gap-3">
                    <span className="text-emerald-400">you:</span>
                    <span className="text-white/80">Should I buy NVDA right now?</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-emerald-400">zeus:</span>
                    <div className="text-white/80">
                      <div className="mb-2">Analyzing NVDA across 6 methods...</div>
                      <div className="text-emerald-400 font-semibold">
                        BUY - 82% confidence
                      </div>
                      <div className="text-white/50 mt-2">
                        Trading signals: bullish | Comps: undervalued | DCF: $158 fair value<br/>
                        Risk: moderate | Compliance: clear | Entry: $145-148
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Everything You Need to
              <br />
              <span className="gradient-text">Trade with Confidence</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Zeus combines multiple institutional-grade analysis methods into one clear recommendation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Parallel Analysis',
                desc: '6 methods run simultaneously. Trading signals, comps, DCF, LBO, risk, and compliance.'
              },
              {
                icon: '🎯',
                title: 'One Clear Answer',
                desc: 'No confusion. Zeus synthesizes everything into buy, sell, or hold with exact confidence.'
              },
              {
                icon: '📊',
                title: 'Institutional Grade',
                desc: 'Same analysis methods used by hedge funds and investment banks. Now in your chat.'
              },
              {
                icon: '🔒',
                title: 'Full Audit Trail',
                desc: 'Every decision logged. Complete compliance documentation auto-generated.'
              },
              {
                icon: '🧠',
                title: 'Learns & Improves',
                desc: 'Zeus tracks outcomes and gets smarter. Detects new market patterns automatically.'
              },
              {
                icon: '🏷️',
                title: 'White-Label Ready',
                desc: 'Your branding, your pricing, your customers. Full control over the experience.'
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="glass-card rounded-2xl p-8 hover:border-emerald-500/30 transition-all hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Three Steps to
              <br />
              <span className="gradient-text">Better Trades</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Ask Zeus',
                desc: 'Type any trading question in plain English. "Should I buy NVDA?" or "Analyze AAPL for swing trade."'
              },
              {
                step: '02',
                title: 'Zeus Analyzes',
                desc: 'In 3 minutes, Zeus runs trading analysis, valuations, risk checks, and compliance in parallel.'
              },
              {
                step: '03',
                title: 'You Execute',
                desc: 'Get a clear recommendation with confidence score, entry points, stop-loss, and reasoning.'
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-black text-white/5 absolute -top-6 -left-2">{item.step}</div>
                <div className="relative pt-12">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl lg:text-6xl font-black mb-6">
            Ready to Trade
            <br />
            <span className="gradient-text">Like a Pro?</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Join traders who use Zeus to make better decisions with institutional-grade analysis.
          </p>
          <Link 
            href="/aleksa" 
            className="inline-block px-10 py-5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-bold text-lg hover:shadow-[0_0_60px_rgba(16,185,129,0.4)] transition-all hover:scale-105"
          >
            Launch Zeus Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                </svg>
              </div>
              <span className="font-bold">Zeus</span>
            </div>
            <div className="text-white/40 text-sm">
              AI-Powered Trading Analysis Platform
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
            ].map((feature, i) => (
              <div 
                key={i}
                className="glass-card rounded-2xl p-8 hover:border-emerald-500/30 transition-all hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Three Steps to
              <br />
              <span className="gradient-text">Better Trades</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Ask Zeus',
                desc: 'Type any trading question in plain English. "Should I buy NVDA?" or "Analyze AAPL for swing trade."'
              },
              {
                step: '02',
                title: 'Zeus Analyzes',
                desc: 'In 3 minutes, Zeus runs trading analysis, valuations, risk checks, and compliance in parallel.'
              },
              {
                step: '03',
                title: 'You Execute',
                desc: 'Get a clear recommendation with confidence score, entry points, stop-loss, and reasoning.'
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-black text-white/5 absolute -top-6 -left-2">{item.step}</div>
                <div className="relative pt-12">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl lg:text-6xl font-black mb-6">
            Ready to Trade
            <br />
            <span className="gradient-text">Like a Pro?</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Join traders who use Zeus to make better decisions with institutional-grade analysis.
          </p>
          <Link 
            href="/aleksa" 
            className="inline-block px-10 py-5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-bold text-lg hover:shadow-[0_0_60px_rgba(16,185,129,0.4)] transition-all hover:scale-105"
          >
            Launch Zeus Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                </svg>
              </div>
              <span className="font-bold">Zeus</span>
            </div>
            <div className="text-white/40 text-sm">
              AI-Powered Trading Analysis Platform
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
