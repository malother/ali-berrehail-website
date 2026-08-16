import type { VercelRequest, VercelResponse } from '@vercel/node'

interface WholesalePayload {
  company: string
  name: string
  email: string
  phone?: string
  quantity?: string
  inquiryType: string
  categories?: string[]
  message: string
  lang?: string
  ts?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const body = req.body as WholesalePayload
    if (!body || !body.company || !body.name || !body.email || !body.inquiryType || !body.message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' })
    }

    const payload: WholesalePayload = {
      company: String(body.company).trim(),
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone || '').trim(),
      quantity: String(body.quantity || '').trim(),
      inquiryType: String(body.inquiryType).trim(),
      categories: Array.isArray(body.categories) ? body.categories : [],
      message: String(body.message).trim(),
      lang: String(body.lang || 'en').trim(),
      ts: body.ts || new Date().toISOString(),
    }

    const logEntry = {
      type: 'wholesale',
      receivedAt: new Date().toISOString(),
      payload,
    }

    console.log('[wholesale]', JSON.stringify(logEntry, null, 2))

    return res.status(200).json({
      ok: true,
      message: 'Received. You will be contacted shortly.',
    })
  } catch (err) {
    console.error('[wholesale] error:', err)
    return res.status(500).json({ ok: false, error: 'Internal server error' })
  }
}