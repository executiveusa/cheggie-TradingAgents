'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { CTLogo } from '@/lib/logo'

export default function AssistantPage() {
  const { lang } = useLanguage()
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([])
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text: string) {
    if (!text.trim()) return
    const userMsg = { role: 'user' as const, content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/hermes/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || data.response || (lang === 'sr' ? 'Sistem trenutno nije dostupan.' : 'System currently unavailable.') }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: lang === 'sr' ? 'Greška pri komunikaciji sa asistentom.' : 'Error communicating with assistant.' }])
    } finally {
      setLoading(false)
    }
  }

  function startVoice() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert(lang === 'sr' ? 'Vaš pregledač ne podržava govorni unos.' : 'Your browser does not support voice input.')
      return
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'sr' ? 'sr-RS' : 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    setListening(true)
    recognition.start()
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setListening(false)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <CTLogo className="h-7 w-7 text-[var(--accent)]" aria-label="CheggieTrade" />
        <div>
          <p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase mb-0.5">
            {lang === 'sr' ? 'ASISTENT' : 'ASSISTANT'}
          </p>
          <h1 className="text-xl font-bold text-[var(--text)]">
            {lang === 'sr' ? 'Tržišni asistent' : 'Market Assistant'}
          </h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        {messages.length === 0 && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
            <p className="text-[var(--muted)]">
              {lang === 'sr'
                ? 'Pitajte o tržištu, poziciji ili riziku. Asistent je spreman.'
                : 'Ask about the market, a position, or risk. The assistant is ready.'}
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-[var(--accent)] text-black font-medium'
                : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-5 py-3">
              <div className="ct-progress-bar w-24 rounded" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage(input))}
          placeholder={lang === 'sr' ? 'Upit asistenta...' : 'Ask the assistant...'}
          aria-label={lang === 'sr' ? 'Poruka asistentu' : 'Message to assistant'}
          className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
        <button
          onClick={() => startVoice()}
          aria-label={listening ? (lang === 'sr' ? 'Slušam...' : 'Listening...') : (lang === 'sr' ? 'Govorni unos' : 'Voice input')}
          className={`rounded-xl border px-4 py-3 transition-colors ${
            listening
              ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] animate-pulse'
              : 'border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)]'
          }`}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zm7 9a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.08A7 7 0 0 0 19 11z"/>
          </svg>
        </button>
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-black hover:bg-[var(--accent-dim)] transition-colors disabled:opacity-40"
        >
          {lang === 'sr' ? 'Pošalji' : 'Send'}
        </button>
      </div>
      {listening && (
        <p className="text-xs text-[var(--accent)] mt-2 text-center animate-pulse">
          {lang === 'sr' ? '🎙 Slušam...' : '🎙 Listening...'}
        </p>
      )}
    </div>
  )
}
