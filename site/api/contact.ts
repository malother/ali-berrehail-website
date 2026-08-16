import type { VercelRequest, VercelResponse } from '@vercel/node'

interface ContactPayload {
  name: string
  email: string
  company?: string
  category?: string
  message: string
  lang?: string
  ts?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const body = req.body as ContactPayload
    if (!body || !body.name || !body.email || !body.message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' })
    }

    const payload: ContactPayload = {
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      company: String(body.company || '').trim(),
      category: String(body.category || '').trim(),
      message: String(body.message).trim(),
      lang: String(body.lang || 'en').trim(),
      ts: body.ts || new Date().toISOString(),
    }

    const logEntry = {
      type: 'contact',
      receivedAt: new Date().toISOString(),
      payload,
    }

    console.log('[contact]', JSON.stringify(logEntry, null, 2))

    const adminKey = process.env.ADMIN_KEY || ''
    if (adminKey) {
      res.setHeader('X-Admin-Key-Configured', 'true')
    }

    return res.status(200).json({
      ok: true,
      message: 'Received. You will be contacted shortly.',
    })
  } catch (err) {
    console.error('[contact] error:', err)
    return res.status(500).json({ ok: false, error: 'Internal server error' })
  }
}