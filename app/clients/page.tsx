import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import ClientsPageContent from './ClientsPageContent';
import { getGlobalData } from '@/lib/api';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

async function getClientsPageData() {
  return getGlobalData('clients-page');
}

async function getClients() {
  try {
    const response = await fetch(`${CMS_URL}/api/clients?limit=100&sort=name`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    'clients-page',
    'Our Clients - APASOL Consultants | Trusted Water Infrastructure Partners',
    'Discover the leading organizations partnering with APASOL Consultants for water infrastructure projects across India. 50+ active clients, 100% satisfaction.'
  );
}

export default async function ClientsPage() {
  const pageData = await getClientsPageData();
  const clients = await getClients();

  const hero = (pageData as { hero?: { badge?: string; heading?: string; description?: string } })?.hero;
  const stats = (pageData as { stats?: { items?: { value: string; label: string }[] } })?.stats;
  const testimonials = (pageData as { testimonials?: { heading?: string; description?: string; items?: { author: string; role: string; organization: string; text: string; rating?: number }[] } })?.testimonials;
  const cta = (pageData as { cta?: { heading?: string; description?: string; primaryButton?: { text?: string; link?: string }; secondaryButton?: { text?: string; link?: string } } })?.cta;

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      <PageHero
        variant="secondary"
        badge={hero?.badge}
        title={hero?.heading}
        description={hero?.description}
      />

      {/* Clients Grid */}
      <ClientsPageContent clients={clients as never[]} />

      {/* Stats Section */}
      {stats && stats.items && stats.items.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">Our Impact</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Delivering excellence across diverse sectors and geographies
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
              {stats.items.map((stat: { value: string; label: string }, index: number) => (
                <div key={index} className="flex items-center gap-8 lg:gap-12">
                  <div className="text-center relative">
                    <p className="text-4xl font-bold text-[#2C3E50] mb-2">{stat.value}</p>
                    <p className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</p>
                  </div>
                  {index < (stats.items?.length ?? 0) - 1 && (
                    <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.items && testimonials.items.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-4">
                {testimonials.heading}
              </h2>
              <p className="text-lg text-[#808080]">
                {testimonials.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.items.map((testimonial: { author: string; role: string; organization: string; text: string; rating?: number; quote?: string; clientName?: string; clientTitle?: string }, i: number) => (
                <div
                  key={i}
                  className="bg-[#f8f9fa] rounded-2xl p-8 border border-gray-200"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-[#26AFFF]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#808080] mb-4 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="border-t border-gray-300 pt-4">
                    <p className="font-bold text-[#1a1a1a]">{testimonial.clientName}</p>
                    <p className="text-sm text-[#808080]">{testimonial.clientTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta && (
        <section className="py-20">
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
