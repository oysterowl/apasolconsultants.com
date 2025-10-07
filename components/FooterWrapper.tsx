import { getSiteInfo } from '@/lib/api'
import Footer from './Footer'
import type { SiteInfo } from '@/types/siteInfo'

export default async function FooterWrapper() {
  const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL
  const siteInfo = await getSiteInfo() as SiteInfo | null
  let logoUrl = siteInfo?.logo?.url

  // If logo URL is a relative path, construct full URL
  if (logoUrl?.startsWith('/') && CMS_URL) {
    logoUrl = `${CMS_URL}${logoUrl}`
  }

  return <Footer siteInfo={siteInfo} logoUrl={logoUrl} />
}