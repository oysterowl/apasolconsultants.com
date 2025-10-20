'use client';

import CustomDropdown from '@/components/CustomDropdown';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  name: string;
  location: string;
  capacity: string;
  type: string;
  year: string;
  value: string;
  status: 'completed' | 'ongoing';
  description: string;
}

interface ProjectsPageContentProps {
  projects: Project[];
}

const SEARCH_THRESHOLD = 15;

export default function ProjectsPageContent({ projects }: ProjectsPageContentProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Highlight search terms in text
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

    // Sort and merge overlapping matches
    matches.sort((a, b) => a.start - b.start);
    const mergedMatches: typeof matches = [];
    matches.forEach(match => {
      if (mergedMatches.length === 0 || match.start > mergedMatches[mergedMatches.length - 1].end) {
        mergedMatches.push(match);
      } else {
        mergedMatches[mergedMatches.length - 1].end = Math.max(mergedMatches[mergedMatches.length - 1].end, match.end);
      }
    });

    // Build highlighted text
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

  // Get unique project types
  const projectTypes = ['all', ...Array.from(new Set(projects.map(p => p.type)))];

  // Filter projects
  const filteredByStatus = statusFilter === 'all'
    ? projects
    : projects.filter(p => p.status === statusFilter);

  const filteredByType = typeFilter === 'all'
    ? filteredByStatus
    : filteredByStatus.filter(p => p.type === typeFilter);

  const filteredProjects = searchQuery.trim()
    ? filteredByType.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredByType;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, typeFilter, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">

        {/* Section Header with Filters */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Our Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of successfully delivered water infrastructure projects
            </p>
          </div>

          {/* Type Filter Pills */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center max-w-5xl mx-auto">
              {projectTypes.map(type => {
                const count = type === 'all'
                  ? filteredByStatus.length
                  : filteredByStatus.filter(p => p.type === type).length;

                return (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                      typeFilter === type
                        ? 'bg-[#0057FF] text-white border-[#0057FF] shadow-lg'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#0057FF] hover:text-[#0057FF]'
                    }`}
                  >
                    {type === 'all' ? 'All Types' : type}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      typeFilter === type
                        ? 'bg-white/20'
                        : 'bg-gray-100'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar with Status Dropdown */}
          {projects.length >= SEARCH_THRESHOLD && (
            <div className="relative w-full">
              {/* Search Bar - Centered */}
              <div className="max-w-lg mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
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

              {/* Status Dropdown - Desktop (positioned on the right) */}
              <div className="absolute right-0 top-0 hidden lg:block">
                <CustomDropdown
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value as 'all' | 'completed' | 'ongoing')}
                  options={[
                    { value: 'all', label: 'All Status', count: projects.length },
                    { value: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length },
                    { value: 'ongoing', label: 'Ongoing', count: projects.filter(p => p.status === 'ongoing').length }
                  ]}
                />
              </div>

              {/* Status Dropdown - Mobile (below search bar) */}
              <div className="mt-4 flex justify-center lg:hidden">
                <CustomDropdown
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value as 'all' | 'completed' | 'ongoing')}
                  options={[
                    { value: 'all', label: 'All Status', count: projects.length },
                    { value: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length },
                    { value: 'ongoing', label: 'Ongoing', count: projects.filter(p => p.status === 'ongoing').length }
                  ]}
                />
              </div>
            </div>
          )}
        </div>

        {/* Projects Grid with Virtual Scrolling */}
        {filteredProjects.length === 0 ? (
          /* No Results State */
          <div className="py-16 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery ? (
                  <>No projects match &ldquo;<span className="font-medium text-[#0057FF]">{searchQuery}</span>&rdquo;</>
                ) : (
                  <>No projects available with the selected filters</>
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-6 py-2.5 rounded-full font-medium bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  >
                    Clear Search
                  </button>
                )}
                {(statusFilter !== 'all' || typeFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setStatusFilter('all');
                      setTypeFilter('all');
                    }}
                    className="px-6 py-2.5 rounded-full font-medium bg-[#0057FF] text-white hover:bg-[#0046cc] transition-all duration-200 shadow-lg shadow-[#0057FF]/25"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <p className="text-gray-600 text-sm">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                {searchQuery && <span className="font-medium"> matching &ldquo;{searchQuery}&rdquo;</span>}
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#26AFFF] hover:shadow-xl transition-all duration-300"
                >
                  {/* Header with Status */}
                  <div className="relative h-32 bg-gradient-to-br from-[#1a5fb4] via-[#26AFFF] to-[#7ec8ff] p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                        {project.type}
                      </span>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        project.status === 'completed'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}>
                        {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-6">
                      <p className="text-white/90 text-xs font-medium mb-1">Capacity</p>
                      <p className="text-2xl font-bold text-white">{project.capacity}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2 group-hover:text-[#0057FF] transition-colors">
                      {highlightSearchTerms(project.name, searchQuery)}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <svg className="w-4 h-4 text-[#26AFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{highlightSearchTerms(project.location, searchQuery)}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {highlightSearchTerms(project.description, searchQuery)}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Project Value</p>
                        <p className="text-sm font-semibold text-[#0057FF]">{project.value}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Year</p>
                        <p className="text-sm font-semibold text-gray-900">{project.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  aria-label="Previous page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-[#0057FF] text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  aria-label="Next page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
