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
    const response = await fetch(`${CMS_URL}/api/sectors?limit=100`, {
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

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getSectorsPageData();

  return {
    title: pageData?.seo?.title || 'Our Sectors - APASOL Consultants',
    description: pageData?.seo?.description || 'Water solutions across every sector - from municipalities to industries.',
  };
}

export default async function SectorsPage() {
  const [pageData, sectors] = await Promise.all([
    getSectorsPageData(),
    getSectors()
  ]);

  const hero = pageData?.hero;
  const cta = (pageData as { cta?: { heading?: string; description?: string; primaryButton?: { text?: string; link?: string }; secondaryButton?: { text?: string; link?: string } } })?.cta;

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
          <SectorsGrid sectors={sectors} />
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Our Integrated Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that delivers results across all sectors
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0057FF] via-[#26AFFF] to-[#0057FF] opacity-20"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  phase: 'Assess',
                  title: 'Comprehensive Analysis',
                  items: ['Site Survey', 'Needs Assessment', 'Feasibility Study']
                },
                {
                  phase: 'Design',
                  title: 'Engineering Excellence',
                  items: ['Detailed Design', 'Technical Specs', '3D Modeling']
                },
                {
                  phase: 'Build',
                  title: 'Quality Implementation',
                  items: ['Construction', 'Quality Control', 'Testing']
                },
                {
                  phase: 'Sustain',
                  title: 'Long-term Support',
                  items: ['O&M Services', 'Performance Monitoring', 'Optimization']
                }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#26AFFF] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </div>

                    <div className="text-[#0057FF] font-bold text-sm uppercase tracking-wider mb-3">
                      {step.phase}
                    </div>

                    <h3 className="text-lg font-bold text-[#2C3E50] mb-4">
                      {step.title}
                    </h3>

                    <ul className="space-y-2">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
              Our Collective Impact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Measurable results across sectors, transforming communities
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">21</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Projects Delivered</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">3M+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Lives Impacted</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">475+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">MLD Capacity</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">95%+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {cta && (
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <CTASection
              title={cta.heading ?? ''}
              description={cta.description ?? ''}
              primaryButtonText={cta.primaryButton?.text ?? ''}
              primaryButtonHref={cta.primaryButton?.link ?? ''}
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
