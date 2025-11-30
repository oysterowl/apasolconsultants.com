import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import SectorsGrid from './SectorsGrid';
import type { Metadata } from 'next';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

async function getSectorsPageData() {
  try {
    const response = await fetch(`${CMS_URL}/api/globals/sectors-page`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching sectors page data:', error);
    return null;
  }
}

async function getSectors() {
  try {
    const response = await fetch(`${CMS_URL}/api/sectors?limit=100&depth=1`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return [];
  }
}

async function getSectorCategories() {
  try {
    const response = await fetch(`${CMS_URL}/api/sector-categories?limit=100&sort=name`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching sector categories:', error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getSectorsPageData();

  return {
    title: pageData?.seo?.metaTitle || 'Our Sectors - APASOL Consultants',
    description: pageData?.seo?.metaDescription || 'Water solutions across every sector - from municipalities to industries.',
  };
}

export default async function SectorsPage() {
  const [pageData, sectors, sectorCategories] = await Promise.all([
    getSectorsPageData(),
    getSectors(),
    getSectorCategories()
  ]);

  const hero = pageData?.hero;
  const cta = (pageData as {
    cta?: {
      heading?: string;
      description?: string;
      primaryButtonText?: string;
      primaryButtonLink?: string;
      secondaryButtonText?: string;
      secondaryButtonLink?: string;
    }
  })?.cta;
  const sectorsIntro = (pageData as { sectorsIntro?: { heading?: string; description?: string } })?.sectorsIntro;
  const sectorCategoriesList = sectorCategories ?? [];
  const approach = (pageData as {
    approach?: {
      heading?: string;
      description?: string;
      steps?: Array<{
        phase?: string;
        title?: string;
        items?: Array<{ item?: string }>;
      }>;
    };
  })?.approach;
  const stats = (pageData as {
    stats?: {
      heading?: string;
      description?: string;
      items?: Array<{
        value?: string;
        label?: string;
      }>;
    };
  })?.stats;

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      <PageHero
        variant="primary"
        badge={hero?.badge}
        title={hero?.heading}
        description={hero?.description}
      />

      {/* Main Sectors Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
          <SectorsGrid
            sectors={sectors}
            categories={sectorCategoriesList}
            heading={sectorsIntro?.heading}
            description={sectorsIntro?.description}
          />
        </div>
      </section>

      {/* Our Approach Section */}
      {approach?.steps && approach.steps.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
                {approach.heading ?? 'Our Integrated Approach'}
              </h2>
              {approach.description && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {approach.description}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0057FF] via-[#26AFFF] to-[#0057FF] opacity-20"></div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {approach.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#26AFFF] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </div>

                      {step.phase && (
                        <div className="text-[#0057FF] font-bold text-sm uppercase tracking-wider mb-3">
                          {step.phase}
                        </div>
                      )}

                      {step.title && (
                        <h3 className="text-lg font-bold text-[#2C3E50] mb-4">
                          {step.title}
                        </h3>
                      )}

                      {step.items && step.items.length > 0 && (
                        <ul className="space-y-2">
                          {step.items.map((itemObj, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-600">
                              <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              {itemObj.item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Impact Statistics */}
      {stats?.items && stats.items.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
                {stats.heading ?? 'Our Collective Impact'}
              </h2>
              {stats.description && (
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {stats.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
              {stats.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-8 lg:gap-12">
                  <div className="text-center relative">
                    <p className="text-4xl font-bold text-[#2C3E50] mb-2">{item.value}</p>
                    <p className="text-sm text-gray-600 uppercase tracking-wider">{item.label}</p>
                  </div>
                  {idx < (stats.items?.length ?? 0) - 1 && (
                    <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta && (
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <CTASection
              title={cta.heading ?? ''}
              description={cta.description ?? ''}
              primaryButtonText={cta.primaryButtonText ?? ''}
              primaryButtonHref={cta.primaryButtonLink ?? ''}
              secondaryButtonText={cta.secondaryButtonText}
              secondaryButtonHref={cta.secondaryButtonLink}
            />
          </div>
        </section>
      )}

      <FooterWrapper />
    </div>
  );
}
