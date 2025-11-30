import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import ServicesPageContent from './ServicesPageContent';
import type { Metadata } from 'next';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

async function getServicesPageData() {
  try {
    const response = await fetch(`${CMS_URL}/api/globals/services-page`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching services page data:', error);
    return null;
  }
}

async function getServices() {
  try {
    const response = await fetch(`${CMS_URL}/api/services?limit=100`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getServicesPageData();

  return {
    title: pageData?.seo?.metaTitle || 'Our Services - APASOL Consultants',
    description: pageData?.seo?.metaDescription || 'Comprehensive water engineering solutions from concept to commissioning.',
  };
}

export default async function ServicesPage() {
  const [pageData, services] = await Promise.all([
    getServicesPageData(),
    getServices()
  ]);

  const hero = pageData?.hero;
  const cta = pageData?.cta;
  const servicesSection = pageData?.services;
  const serviceCategories = servicesSection?.categories || [];

  // Add featured Energy Audit service card to highlight the new page
  const featuredServices = [
    ...services,
    {
      id: 'energy-audit-optimization',
      title: 'Energy Audit & Optimization',
      slug: 'energy-audit-optimization',
      heroDescription: 'Comprehensive energy assessments and optimization for water and wastewater facilities.',
    },
  ].filter(
    (svc, index, arr) =>
      arr.findIndex(other => (other as { slug?: string }).slug === (svc as { slug?: string }).slug) === index
  );

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      <PageHero
        variant="secondary"
        badge={hero?.badge}
        title={hero?.heading}
        description={hero?.description}
      />

      <ServicesPageContent
        services={featuredServices}
        heading={servicesSection?.heading}
        description={servicesSection?.description}
      />

      {/* Additional Services from CMS */}
      {serviceCategories.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
                {servicesSection?.heading ? `${servicesSection.heading} Categories` : 'Service Categories'}
              </h2>
              {servicesSection?.description && (
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {servicesSection.description}
                </p>
              )}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCategories.map((category: { title?: string; description?: string; services?: Array<{ name?: string; description?: string }> }, idx: number) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#26AFFF] hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-3">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>
                  )}
                  {category.services && category.services.length > 0 && (
                    <ul className="space-y-2 text-sm text-gray-700">
                      {category.services.map((svc, sIdx) => (
                        <li key={sIdx} className="flex items-start">
                          <svg className="w-4 h-4 text-[#26AFFF] mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div>
                            <p className="font-medium text-[#2C3E50]">{svc.name}</p>
                            {svc.description && (
                              <p className="text-gray-600 text-xs">{svc.description}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {cta && (
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <CTASection
              title={cta.heading}
              description={cta.description}
              primaryButtonText={cta.primaryButton?.text || ''}
              primaryButtonHref={cta.primaryButton?.link || ''}
              secondaryButtonText={cta.secondaryButton?.text}
              secondaryButtonHref={cta.secondaryButton?.link}
            />
          </div>
        </section>
      )}

      <FooterWrapper />
    </div>
  );
}
