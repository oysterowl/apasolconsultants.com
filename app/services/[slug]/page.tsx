import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import CTASection from '@/components/CTASection';
import Link from 'next/link';
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
  toolsTitle?: string;
  toolsDescription?: string;
  tools?: Array<{ id?: string; name: string; description: string }>;
  benefitsTitle?: string;
  benefitsDescription?: string;
  benefits?: Array<{ id?: string; value?: string; title: string; description: string }>;
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
    return { title: 'Service Not Found' };
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

  const capabilities = service.capabilities || [];
  const tools = service.tools || [];
  const benefits = service.benefits || [];
  const processSteps = service.processSteps || [];

  const deliverables = capabilities.map(cap => ({
    title: cap.title,
    description: cap.description,
  }));

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <Link
              href="/services"
              className="inline-flex items-center text-[#0057FF] hover:text-[#26AFFF] font-medium mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Services
            </Link>

            {service.badgeFeatures && service.badgeFeatures.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {service.badgeFeatures.map((item, index) => (
                  <span
                    key={item.id || index}
                    className="px-4 py-2 bg-[#0057FF]/10 text-[#0057FF] border border-[#0057FF]/20 rounded-full text-sm font-medium"
                  >
                    {item.feature}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {service.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      {deliverables.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
                What We Deliver
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Packages with actionable plans, specifications, and risk controls you can execute.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#26AFFF] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#26AFFF]/15 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#26AFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2C3E50] mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities Section */}
      {capabilities.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
                {service.capabilitiesTitle || 'What We Optimize'}
              </h2>
              {service.capabilitiesDescription && (
                <p className="text-gray-600 max-w-3xl mx-auto">
                  {service.capabilitiesDescription}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {capabilities.map((cap, idx) => (
                <div
                  key={cap.id || idx}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-[#26AFFF] transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{cap.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{cap.description}</p>
                  {cap.features && cap.features.length > 0 && (
                    <ul className="space-y-2">
                      {cap.features.map((feat, fIdx) => (
                        <li key={feat.id || fIdx} className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-[#26AFFF] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-600">{feat.feature}</span>
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

      {/* Tools & Placeholder */}
      {tools.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                  {service.toolsTitle || 'Advanced Tools & Technology'}
                </h2>
                {service.toolsDescription && (
                  <p className="text-gray-600 mb-8 text-lg">
                    {service.toolsDescription}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-6">
                  {tools.map((tool, idx) => (
                    <div key={tool.id || idx} className="text-left">
                      <h4 className="font-bold text-[#2C3E50]">{tool.name}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl overflow-hidden">
                <div className="w-full h-80 bg-gradient-to-br from-[#e5f1ff] via-[#d6ecff] to-[#e5f1ff] relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {processSteps.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
                {service.processTitle || 'Our Process'}
              </h2>
              {service.processDescription && (
                <p className="text-gray-600 max-w-3xl mx-auto">
                  {service.processDescription}
                </p>
              )}
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {processSteps.map((step, index) => (
                <div
                  key={step.id || index}
                  className="flex gap-6 bg-white p-6 rounded-xl border border-gray-200 hover:border-[#26AFFF] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#26AFFF]/10 text-[#26AFFF] border-2 border-[#26AFFF] rounded-full flex items-center justify-center font-bold text-xl">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section (Why Choose) */}
      {benefits.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                  {service.benefitsTitle || `Why Choose ${service.title}?`}
                </h2>
                {service.benefitsDescription && (
                  <p className="text-gray-600 mb-6">
                    {service.benefitsDescription}
                  </p>
                )}
                <div className="space-y-6">
                  {benefits.map((benefit, idx) => (
                    <div key={benefit.id || idx} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#26AFFF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-[#26AFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#2C3E50] mb-1">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-gray-200 rounded-xl overflow-hidden">
                {benefits.slice(0, 4).map((benefit, idx) => (
                  <div key={benefit.id || idx} className="bg-white p-8 text-center">
                    <div className="text-4xl font-bold mb-2 text-[#0057FF]">
                      {benefit.value || benefit.title}
                    </div>
                    <p className="text-gray-600 text-sm uppercase tracking-wider">
                      {benefit.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <CTASection
            title={service.ctaTitle || 'Ready to Transform Your Project?'}
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
