import { notFound } from 'next/navigation'
import HeaderWrapper from '@/components/HeaderWrapper'
import FooterWrapper from '@/components/FooterWrapper'
import PageHero from '@/components/PageHero'
import CTASection from '@/components/CTASection'
import Image from 'next/image'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL

type TextNode = { text?: string }
type ParagraphNode = { children?: TextNode[] }
type RootNode = { root?: { children?: ParagraphNode[] } }
type RichText = ParagraphNode[] | RootNode | null | undefined | Record<string, unknown>

interface SectorResponse {
  docs?: Sector[]
}

interface Sector {
  id: string
  title?: string
  slug: string
  description?: string
  content?: RichText
  featuredImage?: { url?: string }
  category?: { name?: string; slug?: string } | string
  stats?: Array<{ value?: string; label?: string }>
  services?: Array<{
    title?: string
    description?: string
    features?: Array<{ feature?: string }>
  }>
  approach?: Array<{ title?: string; description?: string }>
  benefits?: Array<{ benefit?: string }>
}

const defaultPartnerReasons = [
  { title: 'Proven Expertise', description: 'Decades of sector experience delivering successful outcomes' },
  { title: 'Innovation-Driven', description: 'Latest technologies and best practices for optimal solutions' },
  { title: 'End-to-End Support', description: 'From planning to operations, we stay with you at every step' },
  { title: 'Sustainability Focus', description: 'Responsible solutions that balance performance and impact' },
]

function isParagraphNode(value: unknown): value is ParagraphNode {
  return typeof value === 'object' && value !== null && Array.isArray((value as ParagraphNode).children)
}

function extractTextFromParagraph(node: ParagraphNode): string {
  return (node.children ?? []).map(child => child.text ?? '').join('').trim()
}

function extractParagraphs(content: unknown): string[] {
  if (!content) return []

  if (Array.isArray(content) && content.every(isParagraphNode)) {
    return content.map(extractTextFromParagraph).filter(Boolean)
  }

  if (typeof content === 'object' && content !== null) {
    const rootChildren = (content as RootNode).root?.children
    if (Array.isArray(rootChildren)) {
      return rootChildren.map(extractTextFromParagraph).filter(Boolean)
    }
  }

  return []
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

export default async function SectorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sector = await getSector(slug)
  if (!sector) return notFound()

  const categorySlug = typeof sector.category === 'string' ? sector.category : sector.category?.slug || sector.category?.name
  const categoryName = typeof sector.category === 'string' ? sector.category : sector.category?.name
  const colors = getColorClasses(categorySlug)
  const paragraphs = extractParagraphs(sector.content)
  const longDescription = paragraphs[0] || sector.description || ''
  const imageUrl = resolveUrl(sector.featuredImage?.url)
  const stats = sector.stats || []
  const services = sector.services || []
  const approach = sector.approach || []
  const benefits = sector.benefits?.map(b => b.benefit || '') || []
  const keyBenefits = benefits.length > 0 ? benefits : defaultPartnerReasons.map(reason => reason.title)

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
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {longDescription}
              </p>

              <div className="space-y-3">
                {(benefits.length ? benefits : paragraphs.slice(1)).slice(0, 3).map((benefit, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg className={`w-5 h-5 ${colors.text} mr-3 mt-0.5 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#0057FF]/25 via-[#007A8F]/25 to-[#26AFFF]/25 overflow-hidden">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={sector.title || 'Sector'}
                    fill
                    className="object-cover"
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
              Our Services & Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Specialized expertise tailored to your sector needs
            </p>
          </div>

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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
              Our Proven Approach
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A systematic methodology that delivers results
            </p>
          </div>

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
      {keyBenefits.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">
                  Why Partner With Apasol
                </h2>
                <div className="space-y-4">
                  {(benefits.length > 0 ? benefits.slice(0, 4).map(text => ({ title: text, description: undefined })) : defaultPartnerReasons).map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <svg className={`w-6 h-6 ${colors.text} mr-4 mt-1 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-[#2C3E50] mb-1">{item.title}</h3>
                        {item.description && <p className="text-gray-600 text-sm">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-6">Key Benefits</h3>
                <div className="space-y-3">
                  {keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className={`w-2 h-2 ${colors.bg} rounded-full mr-3`}></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <CTASection
            title={sector.title ? `Ready to Transform Your ${sector.title}?` : 'Ready to Transform Your Project?'}
            description="Let’s discuss how our expertise can address your specific challenges"
            primaryButtonText="Get Started"
            primaryButtonHref="/contact"
            secondaryButtonText="View Projects"
            secondaryButtonHref="/projects"
          />
        </div>
      </section>

      <FooterWrapper />
    </div>
  )
}
