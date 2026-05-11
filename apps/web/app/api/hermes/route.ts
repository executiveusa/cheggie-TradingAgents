import { NextRequest, NextResponse } from 'next/server'

type HermesRequest = {
  ticker: string
  size?: string
  catalyst?: string
  downside?: string
  context_mode?: string
  route_preference?: string
}

type HermesResponse = {
  brief: string
  model_used: string
  tokens: number
  route: string
  timestamp: string
  confidence: string
  risk?: string
  catalyst_read?: string
  hedge_path?: string
  duration_ms?: number
}

const DEMO_RESPONSE: HermesResponse = {
  brief:
    'A 28% NVDA weight is now portfolio risk, not just single-name risk. Treat the earnings catalyst like an exposure event and size the hedge before you size the optimism.',
  model_used: 'nvidia/llama-3.1-nemotron-70b',
  tokens: 1847,
  route: 'openrouter → nvidia free lane',
  timestamp: new Date().toISOString(),
  confidence: 'moderate',
  risk: 'high',
  catalyst_read:
    'Q2 earnings in 11 days. Market has priced in significant upside; miss risk is asymmetric.',
  hedge_path:
    'Reduce to 15–18% weight before the event, or hedge with near-dated puts. Do not size the optimism.',
  duration_ms: 2104,
}

export async function POST(request: NextRequest) {
  let body: HermesRequest

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!body.ticker || typeof body.ticker !== 'string') {
    return NextResponse.json({ error: 'ticker is required' }, { status: 422 })
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (apiUrl) {
    try {
      const upstream = await fetch(`${apiUrl}/hermes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(15000),
      })

      if (!upstream.ok) {
        throw new Error(`Upstream ${upstream.status}`)
      }

      const data = await upstream.json()
      return NextResponse.json(data)
    } catch {
      // Fall through to demo mode if backend is unreachable
    }
  }

  // Demo mode — return sample brief
  return NextResponse.json({
    ...DEMO_RESPONSE,
    timestamp: new Date().toISOString(),
    brief: `Demo mode — NEXT_PUBLIC_API_URL is not set. Showing sample brief for ${body.ticker.toUpperCase()}.`,
  })
}
