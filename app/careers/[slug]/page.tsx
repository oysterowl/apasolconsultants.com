import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import CareerDetailContent from './CareerDetailContent';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

async function getCareerPosting(slug: string) {
  try {
    const response = await fetch(
      `${CMS_URL}/api/job-openings?where[slug][equals]=${slug}&limit=1&depth=1`,
      { next: { revalidate: 60 } }
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error('Error fetching job opening:', error);
    return null;
  }
}

async function getApplicationFormConfig() {
  try {
    const response = await fetch(`${CMS_URL}/api/globals/careers-page`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.applicationForm || null;
  } catch (error) {
    console.error('Error fetching application form config:', error);
    return null;
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const posting = await getCareerPosting((await params).slug);
  const siteInfo = await getSiteInfo();

  if (!posting) {
    return {
      title: 'Job Not Found',
    };
  }

  const descriptionText = posting.description?.root?.children?.[0]?.children?.[0]?.text || '';
  const title = `${posting.title} - Careers at APASOL Consultants`;

  return {
    title,
    description: descriptionText,
    openGraph: {
      title,
      description: descriptionText,
      type: 'website',
      images: siteInfo?.defaultOgImage?.url ? [siteInfo.defaultOgImage.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: descriptionText,
      images: siteInfo?.defaultOgImage?.url ? [siteInfo.defaultOgImage.url] : [],
    },
  };
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const posting = await getCareerPosting((await params).slug);
  const formConfig = await getApplicationFormConfig();

  if (!posting) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />
      <CareerDetailContent posting={posting} formConfig={formConfig} />
      <FooterWrapper />
    </div>
  );
}
