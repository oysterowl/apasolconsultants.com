'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CTASection from '@/components/CTASection';
import { ChevronRight } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content?: React.ReactNode;
}

interface PostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function PostContent({ post, relatedPosts }: PostContentProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareTitle = post.title;

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  return (
    <>
      {/* Progress Bar - Fixed below navbar */}
      <div className="fixed top-24 left-0 right-0 h-1 bg-gray-200/30 z-40">
        <div
          className="h-full bg-gradient-to-r from-[#0057FF] to-[#26AFFF] transition-all duration-100"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Breadcrumb Navigation */}
      <nav className="pt-32 pb-6 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <ul className="flex items-center gap-1 text-sm">
            <li>
              <Link href="/" className="relative text-gray-600 hover:text-gray-900 transition-colors py-1 px-2 group">
                Home
                <span className="absolute bottom-0 left-2 right-2 h-px bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link href="/blog" className="relative text-gray-600 hover:text-gray-900 transition-colors py-1 px-2 group">
                Blog
                <span className="absolute bottom-0 left-2 right-2 h-px bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link
                href={`/blog?category=${post.category.toLowerCase().replace(' ', '-')}`}
                className="relative text-gray-900 font-medium py-1 px-2 group"
              >
                {post.category}
                <span className="absolute bottom-0 left-2 right-2 h-px bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pb-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Top Meta Info - Centered Grid Layout */}
          <div className="flex justify-center mb-8">
            <div className="inline-grid grid-cols-[auto_auto_auto] gap-2.5 items-center">
              <span className="text-[#0057FF] font-medium">
                {post.category}
              </span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] mb-6 text-center leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg lg:text-xl text-gray-600 text-center leading-relaxed mb-10">
            {post.excerpt}
          </p>

          {/* Author and Date */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-[#0057FF] to-[#26AFFF] rounded-full"></div>
            <div>
              <p className="font-semibold text-[#111827]">{post.author}</p>
              {post.authorRole && (
                <p className="text-gray-500 text-sm">{post.authorRole}</p>
              )}
              <p className="text-gray-500 text-sm">{post.date}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {/* Featured Image Placeholder */}
          <div className="relative h-[320px] lg:h-[420px] bg-gradient-to-br from-[#0057FF] to-[#26AFFF] rounded-3xl overflow-hidden mb-12">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
            {post.content}
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-500">Enjoyed this article?</p>
                <p className="text-lg font-semibold text-gray-900">Share it with your network</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={shareToTwitter}
                  className="px-4 py-2 rounded-lg bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors font-semibold"
                >
                  Share on Twitter
                </button>
                <button
                  onClick={shareToLinkedIn}
                  className="px-4 py-2 rounded-lg bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors font-semibold"
                >
                  Share on LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-[#26AFFF] uppercase tracking-wide">Related Articles</p>
                <h3 className="text-3xl font-bold text-[#2C3E50]">You may also like</h3>
              </div>
              <Link href="/blog" className="text-[#0057FF] font-semibold hover:text-[#0046CC]">
                View all articles
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.id}`} className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-[#0057FF] to-[#26AFFF] relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="px-3 py-1 bg-[#26AFFF]/10 text-[#0057FF] rounded-full font-medium">
                        {related.category}
                      </span>
                      <span>{related.readTime}</span>
                    </div>
                    <h4 className="text-xl font-bold text-[#2C3E50] group-hover:text-[#0057FF] transition-colors duration-200">
                      {related.title}
                    </h4>
                    <p className="text-gray-600 line-clamp-2">{related.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
          <CTASection
            title="Ready to discuss your water infrastructure project?"
            description="Connect with our expert team to explore how we can support your next project with innovative, sustainable solutions."
            primaryButtonText="Contact Our Team"
            primaryButtonHref="/contact"
            secondaryButtonText="View Our Projects"
            secondaryButtonHref="/projects"
          />
        </div>
      </section>
    </>
  );
}
