import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import ServiceCard from './ServiceCard';
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
    title: pageData?.seo?.title || 'Our Services - APASOL Consultants',
    description: pageData?.seo?.description || 'Comprehensive water engineering solutions from concept to commissioning.',
  };
}

export default async function ServicesPage() {
  const [pageData, services] = await Promise.all([
    getServicesPageData(),
    getServices()
  ]);

  const hero = pageData?.hero;
  const cta = pageData?.cta;

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      <PageHero
        variant="secondary"
        badge={hero?.badge}
        title={hero?.heading}
        description={hero?.description}
      />

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: { id: string; title: string; slug: string; heroDescription: string }) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-[#2C3E50] mb-12 text-center">
            Additional Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Project Management Consultancy',
              'Third-Party Inspection',
              'Asset Management',
              'Training & Capacity Building',
              'Environmental Impact Assessment',
              'Energy Audit & Optimization',
              'O&M Support Services',
              'Feasibility Studies'
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#26AFFF] hover:shadow-md transition-all duration-300"
              >
                <p className="font-semibold text-[#2C3E50]">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {cta && (
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <CTASection
              title={cta.heading}
              description={cta.description}
              primaryButtonText={cta.primaryButton?.text || 'Get in Touch'}
              primaryButtonHref={cta.primaryButton?.link || '/contact'}
            />
          </div>
        </section>
      )}

      <FooterWrapper />
    </div>
  );
}
