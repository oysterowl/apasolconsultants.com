import { Metadata } from 'next'
import { getGlobalData, getSiteInfo } from './api'
import type { SiteInfo } from '@/types/siteInfo'

interface PageSEO {
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string
  }
}

export async function generatePageMetadata(
  pageName: string,
  fallbackTitle: string,
  fallbackDescription: string
): Promise<Metadata> {
  const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL
  const [pageData, siteInfo] = await Promise.all([
    getGlobalData(pageName) as Promise<PageSEO | null>,
    getSiteInfo() as Promise<SiteInfo | null>
  ])

  const title = pageData?.seo?.metaTitle || fallbackTitle
  const description = pageData?.seo?.metaDescription || fallbackDescription
  const keywords = pageData?.seo?.keywords?.split(',').map(k => k.trim()) || []

  let ogImageUrl = siteInfo?.defaultOgImage?.url
  if (ogImageUrl?.startsWith('/') && CMS_URL) {
    ogImageUrl = `${CMS_URL}${ogImageUrl}`
  }

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: title
          }
        ]
      }),
      type: 'website',
      siteName: 'APASOL Consultants'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] })
    }
  }
}