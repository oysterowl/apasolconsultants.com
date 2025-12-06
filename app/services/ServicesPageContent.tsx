'use client';

import React, { useEffect, useRef, useState } from 'react';
import ServiceCard from './ServiceCard';

interface Service {
  id: string;
  slug: string;
  title: string;
  description?: string;
  heroDescription?: string;
}

interface ServicesPageContentProps {
  services: Service[];
  heading?: string;
  description?: string;
}

export default function ServicesPageContent({ services, heading, description }: ServicesPageContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 9;
  const isFirstRender = useRef(true);

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

  const filteredServices = services.filter(service => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      service.title.toLowerCase().includes(query) ||
      (service.description || service.heroDescription || '').toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage) || 1;
  const startIndex = (currentPage - 1) * servicesPerPage;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + servicesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const section = document.getElementById('services-grid');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        {(heading || description) && (
          <div className="text-center mb-12 space-y-3">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50]">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end gap-4 mb-10">
          <div className="relative lg:w-96 w-full">
            <input
              type="text"
              placeholder="Search services..."
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
          </div>
        </div>

        {searchQuery.trim() && (
          <div className="mb-8 px-4 py-3 bg-gray-50 rounded-lg inline-block">
            <p className="text-sm text-gray-600">
              Showing{' '}
              <span className="font-semibold text-[#0057FF]">{filteredServices.length}</span>{' '}
              service{filteredServices.length === 1 ? '' : 's'} for “
              <span className="font-semibold text-[#0057FF]">{searchQuery}</span>”
            </p>
          </div>
        )}

        <div id="services-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedServices.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              highlightedTitle={highlightSearchTerms(service.title, searchQuery)}
              highlightedDescription={highlightSearchTerms(service.description || service.heroDescription || '', searchQuery)}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center text-gray-600 mt-12">
            No services match your search.
          </div>
        )}

        {filteredServices.length > 0 && totalPages > 1 && (
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
