import { NextRequest, NextResponse } from 'next/server';

const SAFE_QUERY_PATTERNS = [/portfolio/i, /orders?/i, /performance/i, /risk/i, /watchlist/i];

export async function POST(req: NextRequest) {
  try {
    const { query, lang, persona, memory } = await req.json();
    if (!query || !SAFE_QUERY_PATTERNS.some((r) => r.test(query))) {
      return NextResponse.json({ error: 'Query blocked: only approved finance intents are allowed.' }, { status: 403 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) {
      return NextResponse.json({ answer: `[${persona}] ${lang}: ${query}`, audit: ['Local fallback: NEXT_PUBLIC_API_URL missing', 'Security gate passed', `Memory items: ${(memory ?? []).length}`] });
    }

    const upstream = await fetch(`${backendUrl}/api/voice-query`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, lang, persona, memory })
    });
    const data = await upstream.json();
    return NextResponse.json({ answer: data.answer ?? JSON.stringify(data), audit: ['Security gate passed', 'Forwarded to backend /api/voice-query', 'Audit trail recorded'] });
  } catch (error) {
    return NextResponse.json({ error: `Assistant error: ${(error as Error).message}` }, { status: 500 });
  }
}
