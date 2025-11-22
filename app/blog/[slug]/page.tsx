'use server'

import HeaderWrapper from '@/components/HeaderWrapper'
import FooterWrapper from '@/components/FooterWrapper'
import CTASection from '@/components/CTASection'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apasolconsultants.com'

interface BlogCategory {
  id?: string
  slug?: string
  name?: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt?: string
  category?: string | BlogCategory
  author?: string
  authorRole?: string
  publishedDate?: string
  readTime?: string
  content?: any
}

function getCategoryLabel(category?: string | BlogCategory) {
  if (!category) return ''
  if (typeof category === 'string') return category
  return category.name || category.slug || ''
}

function getCategoryValue(category?: string | BlogCategory) {
  if (!category) return ''
  if (typeof category === 'string') return category
  return category.slug || category.id || ''
}

function extractParagraphs(content: any): string[] {
  const paragraphs: string[] = []
  if (!content) return paragraphs

  const traverse = (node: any) => {
    if (!node) return
    if (node.type === 'paragraph' && Array.isArray(node.children)) {
      const text = node.children.map((c: any) => c.text || '').join('')
      if (text.trim()) paragraphs.push(text.trim())
    }
    if (Array.isArray(node.children)) {
      node.children.forEach(traverse)
    }
    if (Array.isArray(node.root?.children)) {
      node.root.children.forEach(traverse)
    }
  }

  traverse(content)
  return paragraphs
}

async function fetchPost(slug: string): Promise<BlogPost | null> {
  if (!CMS_URL) return null
  const res = await fetch(
    `${CMS_URL}/api/blog-posts?limit=1&depth=2&where[slug][equals]=${encodeURIComponent(
      slug
    )}&where[status][equals]=published`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data?.docs?.[0] || null
}

async function fetchRelated(category: string, currentSlug: string): Promise<BlogPost[]> {
  if (!CMS_URL || !category) return []
  const res = await fetch(
    `${CMS_URL}/api/blog-posts?limit=3&depth=1&where[category.slug][equals]=${encodeURIComponent(
      category
    )}&where[slug][not_equals]=${encodeURIComponent(
      currentSlug
    )}&where[status][equals]=published`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) return []
  const data = await res.json()
  return data?.docs || []
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await fetchPost(slug)

  if (!post) {
    notFound()
  }

  const categoryLabel = getCategoryLabel(post.category)
  const categoryValue = getCategoryValue(post.category)
  const relatedPosts = await fetchRelated(categoryValue, post.slug)
  const paragraphs = extractParagraphs(post.content)
  const shareUrl = `${SITE_URL}/blog/${post.slug}`

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      {/* Progress bar spacer */}
      <div className="fixed top-24 left-0 right-0 h-1 bg-gray-200/30 z-40" />

      {/* Breadcrumb */}
      <nav className="pt-32 pb-6 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <ul className="flex items-center gap-1 text-sm">
            <li>
              <Link href="/" className="relative text-gray-600 hover:text-gray-900 transition-colors py-1 px-2 group">
                Home
                <span className="absolute bottom-0 left-2 right-2 h-px bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/blog" className="relative text-gray-600 hover:text-gray-900 transition-colors py-1 px-2 group">
                Blog
                <span className="absolute bottom-0 left-2 right-2 h-px bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>
            {categoryLabel && (
              <>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium py-1 px-2">{categoryLabel}</li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section className="pb-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 justify-center text-sm text-gray-500">
              {categoryLabel && (
                <>
                  <span className="text-[#0057FF] font-semibold uppercase tracking-wide">{categoryLabel}</span>
                  <span className="text-gray-400">·</span>
                </>
              )}
              {post.readTime && <span>{post.readTime}</span>}
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] mb-4 text-center leading-tight">
            {post.title}
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 text-center leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-[#0057FF] to-[#26AFFF] rounded-full"></div>
            <div>
              {post.author && <p className="font-semibold text-[#111827]">{post.author}</p>}
              {post.authorRole && <p className="text-gray-500 text-sm">{post.authorRole}</p>}
              {post.publishedDate && (
                <p className="text-gray-500 text-sm">
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-[#0057FF] via-[#0057FF] to-[#26AFFF]">
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <main className="mt-12">
            <article className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
              {paragraphs.length > 0 ? (
                paragraphs.map((text, idx) => <p key={idx}>{text}</p>)
              ) : (
                <p className="text-gray-600">Content coming soon.</p>
              )}
            </article>
          </main>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-500">Enjoyed this article?</p>
                <p className="text-lg font-semibold text-gray-900">Share it with your network</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors font-semibold"
                >
                  Share on Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors font-semibold"
                >
                  Share on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-10 bg-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#2C3E50]">Related Articles</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: BlogPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group block">
                  <article className="space-y-6">
                    <div className="relative h-64 bg-gradient-to-br from-[#0057FF] to-[#26AFFF] rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-[#26AFFF] uppercase tracking-wide mb-2">
                          {getCategoryLabel(relatedPost.category)}
                        </p>
                        <h3 className="text-xl font-bold text-[#2C3E50] group-hover:text-[#0057FF] transition-colors duration-300 leading-tight">
                          {relatedPost.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <CTASection
            title="Ready to Implement These Solutions?"
            description="Let's discuss how our expertise can help you achieve similar results in your water infrastructure projects."
            primaryButtonText="Start a Conversation"
            primaryButtonHref="/contact"
          />
        </div>
      </section>

      <FooterWrapper />
    </div>
  )
}
