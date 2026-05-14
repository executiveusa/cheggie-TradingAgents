import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

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
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'backend_error', skill: body.skill, mode: 'demo-fallback' }, { status: 502 })
  }
}
