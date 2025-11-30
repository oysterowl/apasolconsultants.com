import { notFound } from 'next/navigation'
import HeaderWrapper from '@/components/HeaderWrapper'
import FooterWrapper from '@/components/FooterWrapper'
import PageHero from '@/components/PageHero'
import CTASection from '@/components/CTASection'
import Image from 'next/image'
import type { Metadata } from 'next'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL

interface SectorResponse {
  docs?: Sector[]
}

interface Sector {
  id: string
  title?: string
  slug: string
  description?: string
  content?: string
  featuredImage?: { url?: string }
  category?: { name?: string; slug?: string } | string
  stats?: Array<{ value?: string; label?: string }>
  services?: Array<{
    title?: string
    description?: string
    features?: Array<{ feature?: string }>
  }>
  approach?: Array<{ title?: string; description?: string }>
  approachHeading?: string
  approachDescription?: string
  servicesHeading?: string
  servicesDescription?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  partnerBadge?: string
  partnerHeading?: string
  partnerDescription?: string
  ctaHeading?: string
  ctaDescription?: string
  ctaPrimaryButtonText?: string
  ctaPrimaryButtonLink?: string
  ctaSecondaryButtonText?: string
  ctaSecondaryButtonLink?: string
  benefits?: Array<{ title?: string; description?: string }>
}

function resolveUrl(url?: string) {
  if (!url) return undefined
  if (url.startsWith('http')) return url
  return CMS_URL ? `${CMS_URL}${url}` : url
}

function getColorClasses(category?: string) {
  const slug = category?.toLowerCase() || ''
  if (slug.includes('municipal')) {
    return { bg: 'bg-[#0057FF]', bgLight: 'bg-[#0057FF]/10', text: 'text-[#0057FF]', border: 'border-[#0057FF]' }
  }
  if (slug.includes('industrial')) {
    return { bg: 'bg-[#26AFFF]', bgLight: 'bg-[#26AFFF]/10', text: 'text-[#26AFFF]', border: 'border-[#26AFFF]' }
  }
  if (slug.includes('environment')) {
    return { bg: 'bg-[#0088cc]', bgLight: 'bg-[#0088cc]/10', text: 'text-[#0088cc]', border: 'border-[#0088cc]' }
  }
  return { bg: 'bg-[#0057FF]', bgLight: 'bg-[#0057FF]/10', text: 'text-[#0057FF]', border: 'border-[#0057FF]' }
}

async function getSector(slug: string): Promise<Sector | null> {
  try {
    const response = await fetch(`${CMS_URL}/api/sectors?where[slug][equals]=${slug}&depth=2`, {
      next: { revalidate: 60 },
    })
    if (!response.ok) return null
    const data = (await response.json()) as SectorResponse
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching sector:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sector = await getSector(params.slug)
  if (!sector) {
    return { title: 'Sector not found | APASOL Consultants' }
  }

  const title = sector.seo?.metaTitle || sector.title || 'Sector | APASOL Consultants'
  const description =
    sector.seo?.metaDescription ||
    sector.description ||
    'Discover sector-specific water and wastewater solutions from APASOL Consultants.'

  return {
    title,
    description,
  }
}

export default async function SectorDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const sector = await getSector(slug)
  if (!sector) return notFound()

  const categorySlug = typeof sector.category === 'string' ? sector.category : sector.category?.slug || sector.category?.name
  const categoryName = typeof sector.category === 'string' ? sector.category : sector.category?.name
  const colors = getColorClasses(categorySlug)
  const longDescription = sector.content || sector.description || ''
  const imageUrl = resolveUrl(sector.featuredImage?.url)
  const stats = sector.stats || []
  const services = sector.services || []
  const approach = sector.approach || []
  const benefits = sector.benefits?.filter(b => b.title).map(b => ({ title: b.title!, description: b.description })) || []
  const displayedBenefits = benefits.slice(0, 4)
  const servicesHeading = sector.servicesHeading
  const servicesDescription = sector.servicesDescription
  const partnerBadge = sector.partnerBadge
  const partnerHeading = sector.partnerHeading
  const partnerDescription = sector.partnerDescription
  const approachHeading = sector.approachHeading
  const approachDescription = sector.approachDescription
  const ctaHeading = sector.ctaHeading
  const ctaDescription = sector.ctaDescription
  const ctaPrimaryButtonText = sector.ctaPrimaryButtonText
  const ctaPrimaryButtonLink = sector.ctaPrimaryButtonLink
  const ctaSecondaryButtonText = sector.ctaSecondaryButtonText
  const ctaSecondaryButtonLink = sector.ctaSecondaryButtonLink

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      <PageHero
        variant="secondary"
        badge={categoryName ? `${categoryName} Sector` : undefined}
        title={sector.title}
        description={sector.description}
      />

      {/* Key Stats */}
      {stats.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center relative">
                  <p className="text-4xl font-bold text-[#2C3E50] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  {idx < stats.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>
                  )}
                  {idx === 1 && (
                    <div className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">
                {sector.title ? `Comprehensive Solutions for ${sector.title}` : 'Comprehensive Solutions'}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {longDescription}
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#0057FF]/25 via-[#007A8F]/25 to-[#26AFFF]/25 overflow-hidden">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={sector.title || 'Sector'}
                    fill
                    className="object-cover rounded-3xl"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          {(servicesHeading || servicesDescription) && (
            <div className="text-center mb-12">
              {servicesHeading && (
                <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
                  {servicesHeading}
                </h2>
              )}
              {servicesDescription && (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {servicesDescription}
                </p>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-3">
                  {service.title}
                </h3>
                {service.description && (
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                )}
                {(service.features || []).length > 0 && (
                  <div className="space-y-2">
                    {(service.features || []).map((featureObj, fidx) => (
                      <div key={fidx} className="flex items-center text-sm text-gray-700">
                        <svg className={`w-4 h-4 ${colors.text} mr-2 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {featureObj.feature}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          {(approachHeading || approachDescription) && (
            <div className="text-center mb-12">
              {approachHeading && (
                <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
                  {approachHeading}
                </h2>
              )}
              {approachDescription && (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {approachDescription}
                </p>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
                  <div className={`absolute -top-3 -left-3 w-8 h-8 ${colors.bg} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#2C3E50] mb-3 mt-2">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-sm text-gray-600">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      {displayedBenefits.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #0057FF 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl relative">
            <div className="text-center mb-16">
              {partnerBadge && (
                <div className="inline-block px-4 py-2 bg-[#0057FF]/5 rounded-full mb-4">
                  <span className="text-[#0057FF] font-semibold text-sm uppercase tracking-wider">
                    {partnerBadge}
                  </span>
                </div>
              )}
              {partnerHeading && (
                <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">{partnerHeading}</h2>
              )}
              {partnerDescription && (
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  {partnerDescription}
                </p>
              )}
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {displayedBenefits.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center transition-all duration-300`}
                      >
                        <span className="text-sm font-bold text-white">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-[#2C3E50]">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {(ctaHeading || ctaDescription || ctaPrimaryButtonText || ctaPrimaryButtonLink) && (
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <CTASection
              title={ctaHeading || ''}
              description={ctaDescription || ''}
              primaryButtonText={ctaPrimaryButtonText || ''}
              primaryButtonHref={ctaPrimaryButtonLink || ''}
              secondaryButtonText={ctaSecondaryButtonText}
              secondaryButtonHref={ctaSecondaryButtonLink}
            />
          </div>
        </section>
      )}

      <FooterWrapper />
    </div>
  )
}
