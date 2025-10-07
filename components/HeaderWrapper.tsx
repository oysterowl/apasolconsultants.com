import { getSiteInfo } from '@/lib/api'
import Header from './Header'
import type { SiteInfo } from '@/types/siteInfo'

export default async function HeaderWrapper() {
  const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL
  const siteInfo = await getSiteInfo() as SiteInfo | null
  let logoUrl = siteInfo?.headerLogo?.url

  // If logo URL is a relative path, construct full URL
  if (logoUrl?.startsWith('/') && CMS_URL) {
    logoUrl = `${CMS_URL}${logoUrl}`
  }

  return <Header logoUrl={logoUrl} siteInfo={siteInfo} />
}