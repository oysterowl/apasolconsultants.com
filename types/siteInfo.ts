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
  footer: {
    copyrightText: string
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
}