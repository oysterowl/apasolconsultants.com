import { getSiteInfo } from '@/lib/api'
import ContactSection from './ContactSection'
import type { SiteInfo } from '@/types/siteInfo'

export default async function ContactSectionWrapper() {
  const siteInfo = await getSiteInfo() as SiteInfo | null

  return <ContactSection siteInfo={siteInfo} />
}
