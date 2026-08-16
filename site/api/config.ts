import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const config = {
    brand: process.env.BRAND || 'Ali Berrehail',
    brandTag: process.env.BRAND_TAG || 'B2B · Food Sourcing',
    owner: process.env.OWNER || 'Ali Berrehail',
    siteEmail: process.env.SITE_EMAIL || 'a.ecommerce@outlook.fr',
    whatsappNumber: process.env.WHATSAPP_NUMBER || '213555231119',
    whatsappDisplay: process.env.WHATSAPP_DISPLAY || '+213 555 23 11 19',
    directPhone: process.env.DIRECT_PHONE || '+213 664 58 28 45',
    registrationId: process.env.REGISTRATION_ID || '109404******6109',
    location: process.env.LOCATION || 'Algeria',
  }

  res.setHeader('Cache-Control', 'no-cache')
  return res.status(200).json(config)
}