'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Link from 'next/link';
import { useState } from 'react';
import * as React from 'react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Highlight search terms in text - returns React elements
  const highlightSearchTerms = (text: string, query: string) => {
    if (!query.trim()) return <>{text}</>;

    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let lastIndex = 0;
    const parts: React.ReactNode[] = [];
    const lowerText = text.toLowerCase();

    // Find all matches
    const matches: { start: number; end: number; }[] = [];

    terms.forEach(term => {
      let index = lowerText.indexOf(term);
      while (index !== -1) {
        matches.push({ start: index, end: index + term.length });
        index = lowerText.indexOf(term, index + 1);
      }
    });

    // Sort matches by start position
    matches.sort((a, b) => a.start - b.start);

    // Merge overlapping matches
    const mergedMatches: typeof matches = [];
    matches.forEach(match => {
      if (mergedMatches.length === 0) {
        mergedMatches.push(match);
      } else {
        const lastMatch = mergedMatches[mergedMatches.length - 1];
        if (match.start <= lastMatch.end) {
          lastMatch.end = Math.max(lastMatch.end, match.end);
        } else {
          mergedMatches.push(match);
        }
      }
    });

    // Build the highlighted text
    mergedMatches.forEach((match, index) => {
      // Add text before match
      if (match.start > lastIndex) {
        parts.push(text.slice(lastIndex, match.start));
      }
      // Add highlighted match
      parts.push(
        <span key={index} className="bg-[#00C9C9]/20 text-[#005F73] font-semibold">
          {text.slice(match.start, match.end)}
        </span>
      );
      lastIndex = match.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return <>{parts.length > 0 ? parts : text}</>;
  };

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
    },
    {
      id: 'community-participation-water-projects',
      title: 'Community Participation in Water Projects: Best Practices',
      excerpt: 'Engaging local communities for successful implementation and long-term sustainability of water infrastructure projects.',
      category: 'Case Studies',
      author: 'Dr. Neha Kapoor',
      date: 'January 25, 2024',
      readTime: '7 min read',
      image: '/blog/community-water.jpg'
    },
    {
      id: 'emerging-contaminants-water-treatment',
      title: 'Addressing Emerging Contaminants in Water Treatment',
      excerpt: 'New challenges and solutions for removing pharmaceuticals, microplastics, and PFAS from water supplies.',
      category: 'Technical',
      author: 'Dr. Arvind Joshi',
      date: 'January 20, 2024',
      readTime: '10 min read',
      image: '/blog/contaminants.jpg'
    },
    {
      id: 'water-energy-nexus-sustainable-development',
      title: 'The Water-Energy Nexus in Sustainable Development',
      excerpt: 'Optimizing the interdependence between water and energy systems for resource efficiency and sustainability.',
      category: 'Sustainability',
      author: 'Kavita Mehta',
      date: 'January 15, 2024',
      readTime: '9 min read',
      image: '/blog/water-energy.jpg'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const nonFeaturedFilteredPosts = filteredPosts.filter(post => !post.featured);

  // Pagination calculations
  const totalPages = Math.ceil(nonFeaturedFilteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = nonFeaturedFilteredPosts.slice(startIndex, endIndex);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Scroll to articles section when page changes
  React.useEffect(() => {
    const articlesSection = document.getElementById('articles-section');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

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
          <div id="articles-section" className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-4xl font-bold text-[#2C3E50] mb-2">
                  Latest Articles
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

            {/* Category Filter and Search */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
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

              {/* Search Bar */}
              <div className="relative lg:w-96">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-3 pl-12 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#00C9C9] focus:bg-white transition-all duration-200"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="mb-8 px-4 py-3 bg-gray-50 rounded-lg inline-block">
              <p className="text-sm text-gray-600">
                {nonFeaturedFilteredPosts.length === 0 ? (
                  <>No articles found for &ldquo;<span className="font-semibold text-[#005F73]">{searchQuery}</span>&rdquo;</>
                ) : (
                  <>Showing <span className="font-semibold text-[#005F73]">{nonFeaturedFilteredPosts.length}</span> article{nonFeaturedFilteredPosts.length !== 1 ? 's' : ''} for &ldquo;<span className="font-semibold text-[#005F73]">{searchQuery}</span>&rdquo;</>
                )}
              </p>
            </div>
          )}

          {/* No Results State */}
          {nonFeaturedFilteredPosts.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm">
                <svg className="w-14 h-14 text-gray-400" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? `No articles match "${searchQuery}" in ${selectedCategory === 'All' ? 'all categories' : selectedCategory}`
                  : `No articles found in ${selectedCategory}`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-3 bg-[#005F73] text-white rounded-lg hover:bg-[#004A5A] transition-colors duration-300"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Blog Posts - Grid View */}
          {viewMode === 'grid' && nonFeaturedFilteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
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
                          {searchQuery ? highlightSearchTerms(post.title, searchQuery) : post.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 leading-relaxed line-clamp-3 text-base">
                        {searchQuery ? highlightSearchTerms(post.excerpt, searchQuery) : post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : viewMode === 'list' && nonFeaturedFilteredPosts.length > 0 ? (
            /* Blog Posts - List View */
            <div className="space-y-0 border-t border-gray-200">
              {paginatedPosts.map((post) => (
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
                          {searchQuery ? highlightSearchTerms(post.title, searchQuery) : post.title}
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
          ) : null}

          {/* Unified Pagination - Works for both Grid and List views */}
          {nonFeaturedFilteredPosts.length > 0 && totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 transition-colors ${
                    currentPage === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:text-[#005F73]'
                  }`}
                  aria-label="Previous page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Show logic: first page, last page, current page, and pages adjacent to current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  const showEllipsis =
                    (page === 2 && currentPage > 3) ||
                    (page === totalPages - 1 && currentPage < totalPages - 2);

                  if (showPage) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                          page === currentPage
                            ? 'bg-[#005F73] text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }

                  if (showEllipsis) {
                    return <span key={`ellipsis-${page}`} className="px-2 text-gray-400">...</span>;
                  }

                  return null;
                })}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 transition-colors ${
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:text-[#005F73]'
                  }`}
                  aria-label="Next page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
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