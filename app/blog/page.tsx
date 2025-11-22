import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import BlogPageContent from './BlogPageContent';
import { getBlogPageData } from '@/lib/api';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

async function getBlogPosts() {
  try {
    const response = await fetch(`${CMS_URL}/api/blog-posts?limit=100&sort=-publishedDate&where[status][equals]=published`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    'blog-page',
    'Our Blog - APASOL Consultants | Water Engineering Insights',
    'Expert insights on water engineering, sustainability, and industry trends from our team of professionals.'
  );
}

export default async function BlogPage() {
  const [pageData, posts] = await Promise.all([
    getBlogPageData(),
    getBlogPosts()
  ]);

  const hero = (pageData as { hero?: { badge?: string; heading?: string; description?: string } })?.hero;
  const cta = (pageData as { cta?: { heading?: string; description?: string; primaryButton?: { text?: string; link?: string }; secondaryButton?: { text?: string; link?: string } } })?.cta;
  const featuredPost = (pageData as { featuredPost?: { id?: string; slug?: string } } | null)?.featuredPost;
  const featuredHeading = (pageData as { featuredHeading?: string } | null)?.featuredHeading;
  const featuredId = featuredPost?.id || featuredPost?.slug;

  // Extract unique categories from posts
  const uniqueCategories = Array.from(
    new Set(posts.map((post: { category: string | { name: string } }) =>
      typeof post.category === 'string' ? post.category : post.category?.name
    ).filter(Boolean))
  ) as string[];
  const categories: string[] = ['All', ...uniqueCategories];

  // Transform posts to match expected format
  const transformedPosts = posts.map((post: { id: string; slug: string; title: string; excerpt: string; category: string | { name: string }; author: string; publishedDate: string; readTime: string; featured?: boolean }) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: typeof post.category === 'string' ? post.category : post.category?.name || '',
    author: post.author,
    publishedDate: post.publishedDate,
    readTime: post.readTime,
    featured: featuredId ? post.id === featuredId || post.slug === featuredId : post.featured || false
  }));

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      <PageHero
        variant="secondary"
        badge={hero?.badge}
        title={hero?.heading}
        description={hero?.description}
      />

      <BlogPageContent
        posts={transformedPosts}
        categories={categories}
        featuredHeading={featuredHeading}
      />

      {/* CTA Section */}
      {cta && (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
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
