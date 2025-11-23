'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Sector {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'municipal' | 'industrial' | 'environmental';
  services?: Array<{ id?: string; service: string }>;
}

interface SectorsGridProps {
  sectors: Sector[];
  heading?: string;
  description?: string;
}

const INITIAL_DISPLAY = 12;
const SEARCH_THRESHOLD = 15;

export default function SectorsGrid({ sectors, heading, description }: SectorsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'municipal' | 'industrial' | 'environmental'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY);

  // Highlight search terms in text
  const highlightSearchTerms = (text: string, query: string) => {
    if (!query.trim()) return <>{text}</>;

    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let lastIndex = 0;
    const parts: React.ReactNode[] = [];
    const lowerText = text.toLowerCase();

    const matches: { start: number; end: number }[] = [];

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
      if (mergedMatches.length === 0 || match.start > mergedMatches[mergedMatches.length - 1].end) {
        mergedMatches.push(match);
      } else {
        mergedMatches[mergedMatches.length - 1].end = Math.max(mergedMatches[mergedMatches.length - 1].end, match.end);
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

    return <>{parts}</>;
  };

  // Filter sectors
  const filteredByCategory = selectedCategory === 'all'
    ? sectors
    : sectors.filter(sector => sector.category === selectedCategory);

  const filteredSectors = searchQuery.trim()
    ? filteredByCategory.filter(sector => {
        const searchLower = searchQuery.toLowerCase();
        const matchesTitle = sector.title.toLowerCase().includes(searchLower);
        const matchesDescription = sector.description.toLowerCase().includes(searchLower);
        const matchesServices = sector.services?.some(s =>
          s.service.toLowerCase().includes(searchLower)
        ) || false;
        return matchesTitle || matchesDescription || matchesServices;
      })
    : filteredByCategory;

  const visibleSectors = filteredSectors.slice(0, visibleCount);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_DISPLAY);
  }, [selectedCategory, searchQuery]);

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Sectors', count: sectors.length },
    { id: 'municipal', label: 'Municipal', count: sectors.filter(s => s.category === 'municipal').length },
    { id: 'industrial', label: 'Industrial', count: sectors.filter(s => s.category === 'industrial').length },
    { id: 'environmental', label: 'Environmental', count: sectors.filter(s => s.category === 'environmental').length }
  ];

  return (
    <>
      {/* Section Header with Filters */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
          {heading || 'Explore Our Sectors'}
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {description || 'Specialized expertise across diverse water infrastructure domains'}
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as 'all' | 'municipal' | 'industrial' | 'environmental')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                selectedCategory === category.id
                  ? 'bg-[#0057FF] text-white border-[#0057FF] shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#0057FF] hover:text-[#0057FF]'
              }`}
            >
              {category.label}
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-sm">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        {sectors.length >= SEARCH_THRESHOLD && (
          <div className="mt-8 max-w-lg mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search sectors..."
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
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
        )}
      </div>

      {/* Sectors Grid */}
      {filteredSectors.length === 0 ? (
        <div className="py-16 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No sectors found
            </h3>

            <p className="text-gray-600 mb-6">
              {searchQuery ? (
                <>No sectors match &ldquo;<span className="font-medium text-[#0057FF]">{searchQuery}</span>&rdquo;</>
              ) : (
                <>No sectors available in the {selectedCategory} category</>
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Clear Search
                </button>
              )}
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="px-6 py-2 bg-[#0057FF] text-white rounded-full hover:bg-[#0046CC] transition-colors"
                >
                  View All Sectors
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleSectors.map((sector, index) => (
            <Link
              key={sector.id}
              href={`/sectors/${sector.slug}`}
              className="group relative bg-white rounded-xl border border-gray-200 hover:border-[#26AFFF] transition-all duration-300 hover:shadow-xl cursor-pointer block"
              style={{
                animationName: 'fadeInUp',
                animationDuration: '0.5s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                animationDelay: `${index * 50}ms`,
                opacity: 0
              }}
            >
              {/* Category Indicator */}
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-[80px] rounded-tr-xl opacity-5 ${
                sector.category === 'municipal' ? 'bg-[#0057FF]' :
                sector.category === 'industrial' ? 'bg-[#26AFFF]' :
                'bg-[#0088cc]'
              }`}></div>

              <div className="p-8 h-full flex flex-col">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#0057FF] transition-colors">
                  {highlightSearchTerms(sector.title, searchQuery)}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {highlightSearchTerms(sector.description, searchQuery)}
                </p>

                {/* Services List */}
                {sector.services && sector.services.length > 0 && (
                  <div className="space-y-2 mb-6 flex-grow">
                    {sector.services.slice(0, 4).map((item, idx) => (
                      <div key={item.id || idx} className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 text-[#26AFFF] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item.service}
                      </div>
                    ))}
                    {sector.services.length > 4 && (
                      <div className="flex items-center text-sm text-gray-500 ml-6">
                        <span className="text-[#26AFFF] font-medium">
                          +{sector.services.length - 4} more service{sector.services.length - 4 > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Learn More */}
                <div className="flex justify-end items-center text-[#0057FF] font-semibold group-hover:text-[#26AFFF] transition-colors">
                  <span className="text-sm">Learn More</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < filteredSectors.length && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisibleCount(prev => Math.min(prev + INITIAL_DISPLAY, filteredSectors.length))}
            className="inline-flex items-center px-8 py-3 bg-white border-2 border-[#0057FF] text-[#0057FF] rounded-full font-semibold hover:bg-[#0057FF] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            Load More Sectors
            <span className="ml-2 px-2 py-0.5 bg-[#0057FF]/10 rounded-full text-sm">
              {filteredSectors.length - visibleCount}
            </span>
            <svg className="w-5 h-5 ml-3 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Results Info */}
      {(selectedCategory !== 'all' || searchQuery) && (
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            {filteredSectors.length === 0 ? (
              'No sectors found'
            ) : (
              <>
                Showing {visibleSectors.length} of {filteredSectors.length} sector{filteredSectors.length !== 1 ? 's' : ''}
                {searchQuery && <span className="font-medium"> matching &ldquo;{searchQuery}&rdquo;</span>}
              </>
            )}
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
