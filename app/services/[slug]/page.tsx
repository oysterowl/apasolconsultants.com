import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import CTASection from '@/components/CTASection';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

interface Service {
  id: string;
  title: string;
  slug: string;
  heroDescription: string;
  badgeFeatures?: Array<{ id?: string; feature: string }>;
  capabilitiesTitle?: string;
  capabilitiesDescription?: string;
  capabilities: Array<{
    id?: string;
    title: string;
    description: string;
    features?: Array<{ id?: string; feature: string }>;
  }>;
  showToolsSection?: boolean;
  toolsTitle?: string;
  toolsDescription?: string;
  tools?: Array<{ id?: string; name: string; description: string }>;
  showBenefitsSection?: boolean;
  benefitsTitle?: string;
  benefitsDescription?: string;
  benefits?: Array<{ id?: string; value: string; title: string; description: string }>;
  showProcessSection?: boolean;
  processTitle?: string;
  processDescription?: string;
  processSteps?: Array<{ id?: string; step: string; title: string; description: string }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryButtonText: string;
  ctaPrimaryButtonHref: string;
  ctaSecondaryButtonText?: string;
  ctaSecondaryButtonHref?: string;
  metaTitle?: string;
  metaDescription?: string;
}

async function getService(slug: string): Promise<Service | null> {
  try {
    const response = await fetch(`${CMS_URL}/api/services?where[slug][equals]=${slug}&limit=1`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.metaTitle || `${service.title} - APASOL Consultants`,
    description: service.metaDescription || service.heroDescription,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0046CC] via-[#0057FF] to-[#26AFFF] text-white pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            {/* Badge Features */}
            {service.badgeFeatures && service.badgeFeatures.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {service.badgeFeatures.map((item, index) => (
                  <span
                    key={item.id || index}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium"
                  >
                    {item.feature}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {service.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl">
              {service.heroDescription}
            </p>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
              {service.capabilitiesTitle || 'Our Capabilities'}
            </h2>
            {service.capabilitiesDescription && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {service.capabilitiesDescription}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.capabilities.map((capability, index) => (
              <div
                key={capability.id || index}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#26AFFF] hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">
                  {capability.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {capability.description}
                </p>
                {capability.features && capability.features.length > 0 && (
                  <ul className="space-y-2">
                    {capability.features.map((item, idx) => (
                      <li key={item.id || idx} className="flex items-start text-sm text-gray-600">
                        <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item.feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      {service.showToolsSection && service.tools && service.tools.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
                {service.toolsTitle || 'Advanced Software Tools'}
              </h2>
              {service.toolsDescription && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {service.toolsDescription}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {service.tools.map((tool, index) => (
                <div
                  key={tool.id || index}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#26AFFF] transition-all duration-300"
                >
                  <h3 className="font-bold text-[#2C3E50] mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {service.showBenefitsSection && service.benefits && service.benefits.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
                {service.benefitsTitle || 'Key Benefits'}
              </h2>
              {service.benefitsDescription && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {service.benefitsDescription}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {service.benefits.map((benefit, index) => (
                <div
                  key={benefit.id || index}
                  className="text-center p-8 bg-gray-50 rounded-xl"
                >
                  <div className="text-4xl font-bold text-[#0057FF] mb-3">
                    {benefit.value}
                  </div>
                  <h3 className="text-lg font-bold text-[#2C3E50] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {service.showProcessSection && service.processSteps && service.processSteps.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
                {service.processTitle || 'Our Process'}
              </h2>
              {service.processDescription && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {service.processDescription}
                </p>
              )}
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {service.processSteps.map((step, index) => (
                <div
                  key={step.id || index}
                  className="flex gap-6 bg-white p-8 rounded-xl border border-gray-200 hover:border-[#26AFFF] transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0057FF] to-[#26AFFF] text-white rounded-xl flex items-center justify-center text-2xl font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <CTASection
            title={service.ctaTitle}
            description={service.ctaDescription}
            primaryButtonText={service.ctaPrimaryButtonText}
            primaryButtonHref={service.ctaPrimaryButtonHref}
            secondaryButtonText={service.ctaSecondaryButtonText}
            secondaryButtonHref={service.ctaSecondaryButtonHref}
          />
        </div>
      </section>

      <FooterWrapper />
    </div>
  );
}
