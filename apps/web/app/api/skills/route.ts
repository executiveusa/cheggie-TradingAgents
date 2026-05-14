import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.skill || typeof body.skill !== 'string') {
    return NextResponse.json({ error: 'skill field is required' }, { status: 400 })
  }

  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    return NextResponse.json({ error: 'backend_offline', skill: body.skill, data_source: 'demo' }, { status: 503 })
  }

  try {
    const res = await fetch(`${apiUrl}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
    })
    if (!res.ok) {
      console.error(`[API /skills] Backend returned ${res.status}`)
      return NextResponse.json({ error: 'backend_error', skill: body.skill }, { status: 502 })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('[API /skills] Backend request failed:', err)
    return NextResponse.json({ error: 'backend_error', skill: body.skill, mode: 'demo-fallback' }, { status: 502 })
  }
}
