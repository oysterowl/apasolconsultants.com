// API utility functions to fetch data from Payload CMS

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL
const CMS_API_KEY = process.env.CMS_API_KEY

interface GlobalData {
  [key: string]: unknown
}

export async function getGlobalData(slug: string): Promise<GlobalData | null> {
  try {
    const headers: HeadersInit = {}

    // Add API key authentication if available
    if (CMS_API_KEY) {
      headers['x-api-key'] = CMS_API_KEY
    }

    const response = await fetch(`${CMS_URL}/api/globals/${slug}?depth=2`, {
      headers,
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      // Silently return null if CMS is unavailable
      // This is expected during development when CMS may not be running
      return null
    }

    const text = await response.text()

    // Check if response is empty
    if (!text || text.trim() === '') {
      return null
    }

    const data = JSON.parse(text)
    return data
  } catch {
    // Silently fail if CMS is unavailable or returns invalid JSON
    // This is expected during development when CMS may not be running
    return null
  }
}

export async function getAboutPageData() {
  return getGlobalData('about-page')
}

export async function getServicesPageData() {
  return getGlobalData('services-page')
}

export async function getProjectsPageData() {
  return getGlobalData('projects-page')
}

export async function getSectorsPageData() {
  return getGlobalData('sectors-page')
}

export async function getBlogPageData() {
  return getGlobalData('blog-page')
}

export async function getCareersPageData() {
  return getGlobalData('careers-page')
}

export async function getContactPageData() {
  return getGlobalData('contact-page')
}

export async function getHomePageData() {
  return getGlobalData('home-page')
}

export async function getSiteInfo() {
  return getGlobalData('site-info')
}
