export interface SiteInfo {
  contact: {
    phone: string
    whatsapp: string
    email: string
  }
  address: {
    line1: string
    line2?: string
    city: string
    pincode: string
    state: string
    country: string
    mapLink?: string
  }
  logo?: {
    url: string
    alt?: string
  }
  favicon?: {
    url: string
  }
  defaultOgImage?: {
    url: string
  }
  socialMedia: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  headerLogo?: {
    url: string
    alt?: string
  }
  companyName?: string
  headerLinks?: {
    showAbout?: boolean
    showServices?: boolean
    showProjects?: boolean
    showClients?: boolean
    showSectors?: boolean
    showBlog?: boolean
    showCareers?: boolean
  }
  footerLogo?: {
    url: string
    alt?: string
  }
  copyrightText?: string
  footerQuickLinks?: Array<{
    label: string
    href: string
  }>
  footerSectors?: Array<{
    label: string
    href: string
  }>
}