'use client';

import Link from 'next/link';
import { useState } from 'react';
import * as React from 'react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedDate: string;
  readTime: string;
  featured?: boolean;
  image?: string;
}

interface BlogPageContentProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogPageContent({ posts, categories }: BlogPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const isFirstRender = React.useRef(true);

  const highlightSearchTerms = (text: string, query: string) => {
    if (!query.trim()) return <>{text}</>;

    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let lastIndex = 0;
    const parts: React.ReactNode[] = [];
    const lowerText = text.toLowerCase();

    const matches: { start: number; end: number; }[] = [];

    terms.forEach(term => {
      let index = lowerText.indexOf(term);
      while (index !== -1) {
        matches.push({ start: index, end: index + term.length });
        index = lowerText.indexOf(term, index + 1);
      }
    });

    matches.sort((a, b) => a.start - b.start);

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

    mergedMatches.forEach((match, index) => {
      if (match.start > lastIndex) {
        parts.push(text.slice(lastIndex, match.start));
      }
      parts.push(
        <span key={index} className="bg-[#26AFFF]/20 text-[#0057FF] font-semibold">
          {text.slice(match.start, match.end)}
        </span>
      );
      lastIndex = match.end;
    });

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return <>{parts.length > 0 ? parts : text}</>;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter(post => post.featured);
  const nonFeaturedFilteredPosts = filteredPosts.filter(post => !post.featured);

  const totalPages = Math.ceil(nonFeaturedFilteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = nonFeaturedFilteredPosts.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const articlesSection = document.getElementById('articles-section');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
        {/* Featured Hero Article */}
        {featuredPosts.length > 0 && (
          <div className="mb-24">
            <Link href={`/blog/${featuredPosts[0].slug}`} className="group block">
              <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative h-[300px] lg:h-[400px] bg-gradient-to-br from-[#0057FF] to-[#26AFFF] rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  {featuredPosts[0].image ? (
                    <>
                      <img
                        src={featuredPosts[0].image}
                        alt={featuredPosts[0].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex justify-center">
                    <span className="text-sm font-semibold text-[#26AFFF] uppercase tracking-wide">
                      {featuredPosts[0].category}
                    </span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] group-hover:text-[#0057FF] transition-colors duration-300 leading-tight text-center">
                    {featuredPosts[0].title}
                  </h2>

                  <p className="text-lg lg:text-xl text-gray-600 leading-relaxed text-center">
                    {featuredPosts[0].excerpt}
                  </p>

                  <div className="flex justify-center pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0057FF] to-[#26AFFF] rounded-full"></div>
                      <div>
                        <p className="font-semibold text-[#2C3E50]">{featuredPosts[0].author}</p>
                        <p className="text-gray-500 text-sm">{formatDate(featuredPosts[0].publishedDate)}</p>
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
                    ? 'bg-white text-[#0057FF] shadow-md'
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
                    ? 'bg-white text-[#0057FF] shadow-md'
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
                      ? 'bg-[#0057FF] text-white border-[#0057FF] shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#0057FF] hover:text-[#0057FF] hover:shadow-md'
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
                className="w-full px-5 py-3 pl-12 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#26AFFF] focus:bg-white transition-all duration-200"
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
                <>No articles found for &ldquo;<span className="font-semibold text-[#0057FF]">{searchQuery}</span>&rdquo;</>
              ) : (
                <>Showing <span className="font-semibold text-[#0057FF]">{nonFeaturedFilteredPosts.length}</span> article{nonFeaturedFilteredPosts.length !== 1 ? 's' : ''} for &ldquo;<span className="font-semibold text-[#0057FF]">{searchQuery}</span>&rdquo;</>
              )}
            </p>
          </div>
        )}

        {/* No Results State */}
        {nonFeaturedFilteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-28 h-28 bg-gradient-to-br from-[#26AFFF]/10 to-[#0057FF]/10 rounded-3xl mx-auto mb-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#26AFFF]/5 to-transparent"></div>
              <svg className="w-16 h-16 text-[#26AFFF] relative z-10" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-3">No Articles Found</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery
                ? `We couldn't find any articles matching "${searchQuery}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}.`
                : `There are no articles available${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''} at the moment.`}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-8 py-3.5 bg-[#0057FF] text-white font-semibold rounded-xl hover:bg-[#0046CC] transition-all duration-300 shadow-lg shadow-[#0057FF]/20 hover:shadow-xl hover:shadow-[#0057FF]/30 hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Blog Posts - Grid View */}
        {viewMode === 'grid' && nonFeaturedFilteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="space-y-6">
                  <div className="relative h-64 bg-gradient-to-br from-[#0057FF] to-[#26AFFF] rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                    {post.image ? (
                      <>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300"></div>
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-center mb-2">
                        <span className="text-xs font-semibold text-[#26AFFF] uppercase tracking-wide">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#2C3E50] group-hover:text-[#0057FF] transition-colors duration-300 leading-tight text-center">
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
                href={`/blog/${post.slug}`}
                className="group block border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <article className="py-6 px-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-[#2C3E50] group-hover:text-[#0057FF] transition-colors duration-200 mb-2">
                        {searchQuery ? highlightSearchTerms(post.title, searchQuery) : post.title}
                      </h3>

                      <div className="text-sm text-gray-500 lg:hidden mb-2">
                        {formatDate(post.publishedDate)}
                      </div>

                      <p className="text-gray-600 line-clamp-2 hidden lg:block">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex lg:hidden items-center">
                      <span className="inline-block px-3 py-1 bg-[#26AFFF]/10 text-[#0057FF] text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <div className="hidden lg:flex lg:w-48 justify-center">
                      <span className="inline-block px-4 py-2 bg-[#26AFFF]/10 text-[#0057FF] text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <div className="hidden lg:block lg:w-32 text-right">
                      <div className="text-gray-500 text-sm">
                        {formatDate(post.publishedDate)}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : null}

        {/* Pagination */}
        {nonFeaturedFilteredPosts.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 transition-colors ${
                  currentPage === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:text-[#0057FF]'
                }`}
                aria-label="Previous page"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
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
                          ? 'bg-[#0057FF] text-white shadow-md'
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

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 transition-colors ${
                  currentPage === totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:text-[#0057FF]'
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
  );
}
