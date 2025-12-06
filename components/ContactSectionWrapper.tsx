import { getSiteInfo, getHomePageData } from '@/lib/api'
import ContactSection from './ContactSection'
import type { SiteInfo } from '@/types/siteInfo'

type HomeContactSection = {
  tagline?: string;
  heading?: string;
  description?: string;
  phoneTitle?: string;
  phoneSubtitle?: string;
  phoneHours?: string;
  emailTitle?: string;
  emailSubtitle?: string;
  emailNote?: string;
  visitTitle?: string;
  visitSubtitle?: string;
  visitHours?: string;
};

type HomeData = {
  contactSection?: HomeContactSection;
};

export default async function ContactSectionWrapper() {
  const [siteInfo, homeData] = await Promise.all([
    getSiteInfo() as Promise<SiteInfo | null>,
    getHomePageData() as Promise<HomeData | null>,
  ])

  const contactContent = homeData?.contactSection

  return <ContactSection siteInfo={siteInfo} contactContent={contactContent || undefined} />
}
