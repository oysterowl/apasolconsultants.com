'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Link from 'next/link';
import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Industry News', 'Case Studies', 'Technical', 'Sustainability', 'Innovation'];

  const blogPosts: BlogPost[] = [
    {
      id: 'advancing-water-security-through-smart-infrastructure',
      title: 'Advancing Water Security Through Smart Infrastructure',
      excerpt: 'Exploring how IoT and AI technologies are revolutionizing water management systems across urban and rural communities.',
      category: 'Innovation',
      author: 'Dr. Rajesh Kumar',
      date: 'March 15, 2024',
      readTime: '5 min read',
      image: '/blog/smart-water.jpg',
      featured: true
    },
    {
      id: 'sustainable-wastewater-treatment-case-study-maharashtra',
      title: 'Sustainable Wastewater Treatment: A Case Study from Maharashtra',
      excerpt: 'How we designed and implemented a zero-discharge wastewater treatment plant serving 50,000 residents.',
      category: 'Case Studies',
      author: 'Priya Sharma',
      date: 'March 10, 2024',
      readTime: '8 min read',
      image: '/blog/wastewater-case.jpg',
      featured: true
    },
    {
      id: 'future-of-rural-water-supply-india',
      title: 'The Future of Rural Water Supply in India',
      excerpt: 'Examining challenges and opportunities in providing sustainable water solutions to rural communities.',
      category: 'Industry News',
      author: 'Arun Patel',
      date: 'March 5, 2024',
      readTime: '6 min read',
      image: '/blog/rural-water.jpg'
    },
    {
      id: 'understanding-nrw-reducing-water-loss-distribution-networks',
      title: 'Understanding NRW: Reducing Water Loss in Distribution Networks',
      excerpt: 'Technical guide to identifying and addressing Non-Revenue Water in municipal water systems.',
      category: 'Technical',
      author: 'Eng. Vikram Singh',
      date: 'February 28, 2024',
      readTime: '10 min read',
      image: '/blog/nrw-technical.jpg'
    },
    {
      id: 'green-infrastructure-stormwater-management',
      title: 'Green Infrastructure for Stormwater Management',
      excerpt: 'Nature-based solutions that combine flood protection with urban beautification and ecosystem services.',
      category: 'Sustainability',
      author: 'Dr. Meera Nair',
      date: 'February 20, 2024',
      readTime: '7 min read',
      image: '/blog/green-infra.jpg'
    },
    {
      id: 'membrane-technology-water-treatment-latest-advances',
      title: 'Membrane Technology in Water Treatment: Latest Advances',
      excerpt: 'Review of cutting-edge membrane technologies and their applications in water and wastewater treatment.',
      category: 'Technical',
      author: 'Dr. Suresh Reddy',
      date: 'February 15, 2024',
      readTime: '12 min read',
      image: '/blog/membrane-tech.jpg'
    },
    {
      id: 'public-private-partnerships-water-sector',
      title: 'Public-Private Partnerships in the Water Sector',
      excerpt: 'Analysis of successful PPP models in water infrastructure development across Indian states.',
      category: 'Industry News',
      author: 'Amit Verma',
      date: 'February 10, 2024',
      readTime: '9 min read',
      image: '/blog/ppp-water.jpg'
    },
    {
      id: 'climate-resilient-water-infrastructure-design',
      title: 'Climate-Resilient Water Infrastructure Design',
      excerpt: 'Engineering approaches to building water systems that can withstand climate change impacts.',
      category: 'Sustainability',
      author: 'Dr. Anita Shah',
      date: 'February 5, 2024',
      readTime: '11 min read',
      image: '/blog/climate-water.jpg'
    },
    {
      id: 'digital-twin-technology-water-management',
      title: 'Digital Twin Technology in Water Management',
      excerpt: 'How virtual replicas of physical water systems are improving operational efficiency and predictive maintenance.',
      category: 'Innovation',
      author: 'Rohit Gupta',
      date: 'January 30, 2024',
      readTime: '8 min read',
      image: '/blog/digital-twin.jpg'
    }
  ];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        variant="primary"
        badge="Insights & Updates"
        title="Our Blog"
        description="Expert insights on water engineering, sustainability, and industry trends from our team of professionals."
      />

      {/* Editorial Layout */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">

          {/* Featured Hero Article */}
          {featuredPosts.length > 0 && (
            <div className="mb-24">
              <Link href={`/blog/${featuredPosts[0].id}`} className="group block">
                <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Image Side */}
                  <div className="relative h-[300px] lg:h-[400px] bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                  </div>

                  {/* Content Side */}
                  <div className="space-y-6">
                    {/* Metadata */}
                    <div className="flex justify-center">
                      <div className="inline-grid grid-cols-[auto_auto_auto] gap-2.5 items-center">
                        <span className="text-sm font-semibold text-[#00C9C9] uppercase tracking-wide">
                          {featuredPosts[0].category}
                        </span>
                        <span className="text-gray-400">·</span>
                        <span className="text-sm text-gray-500">
                          {featuredPosts[0].readTime}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] group-hover:text-[#005F73] transition-colors duration-300 leading-tight text-center">
                      {featuredPosts[0].title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed text-center">
                      {featuredPosts[0].excerpt}
                    </p>

                    {/* Author Section */}
                    <div className="flex justify-center pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-full"></div>
                        <div>
                          <p className="font-semibold text-[#2C3E50]">{featuredPosts[0].author}</p>
                          <p className="text-gray-500 text-sm">{featuredPosts[0].date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* All Articles Section Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-4xl font-bold text-[#2C3E50] mb-2">
                  {viewMode === 'grid' ? 'Latest Articles' : 'All Articles'}
                </h2>
                <p className="text-lg text-gray-600">Explore our latest insights and industry updates</p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#005F73] shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  aria-label="Grid view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-white text-[#005F73] shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  aria-label="List view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                    selectedCategory === category
                      ? 'bg-[#005F73] text-white border-[#005F73] shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#005F73] hover:text-[#005F73] hover:shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts - Grid View */}
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.filter(post => !post.featured).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group block"
                >
                  <article className="space-y-6">
                    {/* Image */}
                    <div className="relative h-64 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-center mb-2">
                          <div className="inline-grid grid-cols-[auto_auto] gap-2.5 items-center">
                            <span className="text-xs font-semibold text-[#00C9C9] uppercase tracking-wide">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-[#2C3E50] group-hover:text-[#005F73] transition-colors duration-300 leading-tight text-center">
                          {post.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 leading-relaxed line-clamp-3 text-base">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            /* Blog Posts - List View */
            <div className="space-y-0 border-t border-gray-200">
              {filteredPosts.filter(post => !post.featured).map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group block border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <article className="py-6 px-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                      {/* Main Content */}
                      <div className="flex-1">
                        <h3 className="text-xl lg:text-2xl font-bold text-[#2C3E50] group-hover:text-[#005F73] transition-colors duration-200 mb-2">
                          {post.title}
                        </h3>

                        {/* Mobile: Show date below title */}
                        <div className="text-sm text-gray-500 lg:hidden mb-2">
                          {post.date}
                        </div>

                        {/* Desktop: Show excerpt */}
                        <p className="text-gray-600 line-clamp-2 hidden lg:block">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Category Badge */}
                      <div className="flex lg:hidden items-center">
                        <span className="inline-block px-3 py-1 bg-[#00C9C9]/10 text-[#005F73] text-sm font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>

                      {/* Desktop: Category */}
                      <div className="hidden lg:flex lg:w-48 justify-center">
                        <span className="inline-block px-4 py-2 bg-[#00C9C9]/10 text-[#005F73] text-sm font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>

                      {/* Desktop: Date */}
                      <div className="hidden lg:block lg:w-32 text-right">
                        <div className="text-gray-500 text-sm">
                          {post.date}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredPosts.length > 6 && viewMode === 'grid' && (
            <div className="mt-12 text-center">
              <button className="px-8 py-4 bg-[#005F73] text-white rounded-lg hover:bg-[#004A5A] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Load More Articles
              </button>
            </div>
          )}

          {/* Pagination for List View */}
          {viewMode === 'list' && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-gray-500 hover:text-[#005F73] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="px-4 py-2 bg-[#005F73] text-white rounded-lg">1</button>
                <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">2</button>
                <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">3</button>
                <button className="px-4 py-2 text-gray-500 hover:text-[#005F73] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Stay Updated with Industry Insights
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get the latest articles on water engineering, sustainability, and innovation delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button className="px-8 py-3 bg-white text-[#005F73] rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
            <p className="mt-4 text-sm text-white/70">
              No spam, unsubscribe anytime. Read our Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
          <CTASection
            title="Have a Question About Our Projects?"
            description="Connect with our experts to discuss your water infrastructure needs."
            primaryButtonText="Contact Our Team"
            primaryButtonHref="/contact"
            secondaryButtonText="View Case Studies"
            secondaryButtonHref="/projects"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}