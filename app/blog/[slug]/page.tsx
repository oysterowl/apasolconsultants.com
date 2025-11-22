'use server'

import React from 'react'
import type { JSX } from 'react'
import HeaderWrapper from '@/components/HeaderWrapper'
import FooterWrapper from '@/components/FooterWrapper'
import CTASection from '@/components/CTASection'
import Link from 'next/link'
import Image from 'next/image'
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
  featuredImage?: { url?: string }
  content?: {
    root?: {
      children?: LexicalNode[]
    }
  }
}

type LexicalNode =
  | {
      type?: 'text'
      text?: string
    }
  | {
      type?: 'linebreak'
    }
  | {
      type?: 'paragraph'
      children?: LexicalNode[]
    }
  | {
      type?: 'heading'
      tag?: 'h1' | 'h2' | 'h3' | 'h4'
      children?: LexicalNode[]
    }
  | {
      type?: 'list'
      listType?: 'number' | 'bullet'
      children?: LexicalNode[]
    }
  | {
      type?: 'listitem'
      children?: LexicalNode[]
    }
  | {
      type?: 'quote'
      children?: LexicalNode[]
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

function renderTextNode(node: Extract<LexicalNode, { type?: 'text' }>, key: React.Key) {
  const text = node?.text || ''
  return <React.Fragment key={key}>{text}</React.Fragment>
}

function renderNodes(nodes: LexicalNode[], keyPrefix = 'node') {
  return nodes
    .filter(Boolean)
    .map((node, index) => {
      const key = `${keyPrefix}-${index}`

      switch (node.type) {
        case 'text':
          return renderTextNode(node, key)
        case 'linebreak':
          return <br key={key} />
        case 'paragraph':
          return (
            <p key={key} className="mb-6 last:mb-0">
              {Array.isArray(node.children) ? renderNodes(node.children, `${key}-child`) : null}
            </p>
          )
        case 'heading': {
          const Tag = (node.tag as keyof JSX.IntrinsicElements) || 'h2'
          const base = 'font-bold leading-tight mb-4'
          const size =
            node.tag === 'h1'
              ? 'text-4xl lg:text-5xl'
              : node.tag === 'h2'
                ? 'text-3xl lg:text-4xl'
                : node.tag === 'h3'
                  ? 'text-2xl lg:text-3xl'
                  : 'text-xl lg:text-2xl'
          const color =
            node.tag === 'h1'
              ? 'text-[#0057FF]'
              : node.tag === 'h2'
                ? 'text-[#2C3E50]'
                : node.tag === 'h3'
                  ? 'text-[#0057FF]'
                  : 'text-[#26AFFF]'
          return (
            <Tag key={key} className={`${base} ${size} ${color}`}>
              {Array.isArray(node.children) ? renderNodes(node.children, `${key}-child`) : null}
            </Tag>
          )
        }
        case 'list': {
          const Tag = node.listType === 'number' ? 'ol' : 'ul'
          return (
            <Tag key={key} className="mb-6 pl-6 space-y-2 list-outside list-disc">
              {Array.isArray(node.children) ? renderNodes(node.children, `${key}-item`) : null}
            </Tag>
          )
        }
        case 'listitem':
          return (
            <li key={key}>
              {Array.isArray(node.children) ? renderNodes(node.children, `${key}-child`) : null}
            </li>
          )
        case 'quote':
          return (
            <blockquote
              key={key}
              className="my-8 pl-4 border-l-4 border-[#26AFFF] text-lg text-gray-700 italic"
            >
              {Array.isArray(node.children) ? renderNodes(node.children, `${key}-child`) : null}
            </blockquote>
          )
        default:
          return null
      }
    })
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
  const shareUrl = `${SITE_URL}/blog/${post.slug}`
  const readTimeLabel =
    typeof post.readTime === 'number'
      ? `${post.readTime} min read`
      : post.readTime || ''

  const featuredImageUrl = post.featuredImage?.url
    ? post.featuredImage.url.startsWith('http')
      ? post.featuredImage.url
      : CMS_URL
        ? `${CMS_URL}${post.featuredImage.url}`
        : post.featuredImage.url
    : undefined

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
          <div className="flex justify-center mb-8">
            <div className="inline-grid grid-cols-[auto_auto_auto] gap-2.5 items-center text-base text-gray-600">
              {categoryLabel && (
                <>
                  <span className="text-[#0057FF] font-medium">{categoryLabel}</span>
                  <span className="text-gray-400">·</span>
                </>
              )}
              {readTimeLabel && <span className="text-gray-600">{readTimeLabel}</span>}
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-6 text-center">
            {post.title}
          </h1>

          {post.excerpt && (
            <h2 className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8 text-center">
              {post.excerpt}
            </h2>
          )}

          <div className="text-sm text-gray-600 mb-8 text-center">
            {post.author && (
              <>
                By <span className="font-medium text-gray-900">{post.author}</span>
                <span className="mx-2">·</span>
              </>
            )}
            {post.publishedDate && (
              <span>
                {new Date(post.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 pb-8">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 group transition-all"
              aria-label="Share on Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="fill-gray-400 group-hover:fill-[#3b5998] transition-colors" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073C24 5.40365 18.6274 0 12 0C5.37258 0 0 5.40365 0 12.073C0 18.0988 4.38823 23.0935 10.125 24V15.563H7.07812V12.073H10.125V9.41343C10.125 6.38755 11.9165 4.71615 14.6576 4.71615C15.9705 4.71615 17.3438 4.95195 17.3438 4.95195V7.92313H15.8306C14.3399 7.92313 13.875 8.85379 13.875 9.80857V12.073H17.2031L16.6711 15.563H13.875V24C19.6118 23.0935 24 18.0988 24 12.073Z" />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 group transition-all"
              aria-label="Share on LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" className="fill-gray-400 group-hover:fill-[#0976b4] transition-colors" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M20 20H15.5797V12.1046C15.5797 10.3869 14.8883 9.21444 13.3679 9.21444C12.2048 9.21444 11.5581 10.0057 11.2571 10.7683C11.1441 11.042 11.1618 11.4233 11.1618 11.8046V20H6.78267C6.78267 20 6.83913 7.04259 6.78267 5.98596H11.1618V7.97612C11.4205 7.10593 12.8199 5.86404 14.9863 5.86404C17.8234 5.86404 20 7.68807 20 11.6157V20ZM2.35418 4.39982H2.32597C0.915203 4.39982 0 3.43045 0 2.20169C0 0.949047 0.941907 0 2.38123 0C3.81937 0 4.70367 0.946666 4.73188 2.19813C4.73188 3.42688 3.81937 4.39982 2.35418 4.39982ZM0.504455 5.98596H4.40263V20H0.504455V5.98596Z" />
              </svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 group transition-all"
              aria-label="Share on X"
            >
              <svg width="18" height="18" viewBox="0 0 14 14" className="fill-gray-400 group-hover:fill-black transition-colors" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.9456 0.25H13.0456L8.41561 5.51L13.7956 13.25H9.52561L6.19561 8.73L2.40561 13.25H0.30561L5.23561 7.64L0.0556102 0.25H4.43561L7.46561 4.43L10.9456 0.25ZM10.0656 11.95H11.1456L3.84561 1.48H2.68561L10.0656 11.95Z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-[#0057FF] via-[#0057FF] to-[#26AFFF]">
            {featuredImageUrl ? (
              <>
                <Image
                  src={featuredImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
              </>
            ) : (
              <div className="absolute inset-0 bg-black/10" />
            )}
          </div>

          <main className="mt-12">
            <article className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
              {Array.isArray(post.content?.root?.children) && post.content.root.children.length > 0 ? (
                renderNodes(post.content.root.children)
              ) : (
                <p className="text-gray-600">Content coming soon.</p>
              )}
            </article>
          </main>
        </div>
      </section>

      {/* Divider */}
      <div className="py-6 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="w-full h-px bg-gray-300"></div>
        </div>
      </div>

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




