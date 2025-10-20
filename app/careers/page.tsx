import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import PageHero from '@/components/PageHero';
import CareersPageContent from './CareersPageContent';
import type { Metadata } from 'next';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

async function getCareersPageData() {
  try {
    const response = await fetch(`${CMS_URL}/api/globals/careers-page`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching careers page data:', error);
    return null;
  }
}

async function getCareerPostings() {
  try {
    const response = await fetch(`${CMS_URL}/api/job-openings?where[status][equals]=active&limit=100&depth=1`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching job openings:', error);
    return [];
  }
}

async function getJobDepartments() {
  try {
    const response = await fetch(`${CMS_URL}/api/job-departments?limit=100&sort=order`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching job departments:', error);
    return [];
  }
}

async function getSiteInfo() {
  try {
    const response = await fetch(`${CMS_URL}/api/globals/site-info`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching site info:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getCareersPageData();
  const siteInfo = await getSiteInfo();

  const title = pageData?.seo?.metaTitle;
  const description = pageData?.seo?.metaDescription;
  const keywords = pageData?.seo?.keywords;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      images: siteInfo?.defaultOgImage?.url ? [siteInfo.defaultOgImage.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: siteInfo?.defaultOgImage?.url ? [siteInfo.defaultOgImage.url] : [],
    },
  };
}

export default async function CareersPage() {
  const pageData = await getCareersPageData();
  const positions = await getCareerPostings();
  const departments = await getJobDepartments();

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      <PageHero
        variant="primary"
        badge={pageData?.hero?.badge}
        title={pageData?.hero?.heading}
        description={pageData?.hero?.description}
      />

      <CareersPageContent
        positions={positions}
        pageData={pageData}
        departments={departments}
      />

      <FooterWrapper />
    </div>
  );
}
