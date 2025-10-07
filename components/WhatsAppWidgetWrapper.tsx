import { getSiteInfo } from '@/lib/api'
import WhatsAppWidget from './WhatsAppWidget'
import type { SiteInfo } from '@/types/siteInfo'

export default async function WhatsAppWidgetWrapper() {
  const siteInfo = await getSiteInfo() as SiteInfo | null

  if (!siteInfo?.contact?.whatsapp) {
    return null
  }

  return <WhatsAppWidget phoneNumber={siteInfo.contact.whatsapp} />
}