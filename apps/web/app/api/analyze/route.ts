import { NextRequest, NextResponse } from 'next/server'

const DEMO_BRIEF = {
  ticker: 'NVDA',
  risk: 'HIGH',
  catalyst: 'Earnings catalyst is real but priced. The position size makes this an exposure event, not a trade thesis.',
  hedge: 'Size down to 15% before the print or buy put spread 30 days out.',
  model_note: 'OpenRouter → NVIDIA free lane | demo mode',
  tokens: 1847,
  time_ms: 4200,
  mode: 'demo',
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.ticker || typeof body.ticker !== 'string' || !body.ticker.trim()) {
    return NextResponse.json({ error: 'Invalid ticker' }, { status: 400 })
  }

  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    return NextResponse.json({ ...DEMO_BRIEF, ticker: body.ticker })
  }

  try {
    const res = await fetch(`${apiUrl}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
    })
    if (!res.ok) {
      console.error(`[API /analyze] Backend returned ${res.status}`)
      throw new Error(`Backend error: ${res.status}`)
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ ...DEMO_BRIEF, ticker: body.ticker, mode: 'demo-fallback' })
  }
}
