'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Button from '@/components/Button';
import { useState, useEffect } from 'react';

interface Project {
  id: number;
  name: string;
  location: string;
  capacity: string;
  type: string;
  year: string;
  value: string;
  status: 'completed' | 'ongoing';
  description: string;
}

const INITIAL_DISPLAY = 9;
const SEARCH_THRESHOLD = 15;

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY);

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
        <span key={index} className="bg-[#00C9C9]/20 text-[#005F73] font-semibold">
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

  const projects: Project[] = [
    {
      id: 1,
      name: "Rishikesh STP",
      location: "Uttarakhand",
      capacity: "26 MLD",
      type: "Sewage Treatment Plant",
      year: "2023",
      value: "₹120 Crores",
      status: "completed",
      description: "Complete design and engineering for sewage treatment plant serving Rishikesh city"
    },
    {
      id: 2,
      name: "Jamshedpur WTP",
      location: "Jharkhand",
      capacity: "60 MLD",
      type: "Water Treatment Plant",
      year: "2023",
      value: "₹180 Crores",
      status: "completed",
      description: "Comprehensive water treatment facility with advanced filtration and SCADA systems"
    },
    {
      id: 3,
      name: "Hassan Multi-Village Water Supply",
      location: "Karnataka",
      capacity: "45 MLD",
      type: "Water Supply Scheme",
      year: "2024",
      value: "₹250 Crores",
      status: "ongoing",
      description: "Integrated water supply scheme covering 125 villages with distribution network"
    },
    {
      id: 4,
      name: "Varanasi Sewerage Network",
      location: "Uttar Pradesh",
      capacity: "140 MLD",
      type: "Sewerage System",
      year: "2023",
      value: "₹450 Crores",
      status: "completed",
      description: "Complete sewerage network design including trunk mains and pumping stations"
    },
    {
      id: 5,
      name: "Nagpur Storm Water Drainage",
      location: "Maharashtra",
      capacity: "N/A",
      type: "Storm Water System",
      year: "2024",
      value: "₹85 Crores",
      status: "ongoing",
      description: "Comprehensive storm water drainage system for flood mitigation"
    },
    {
      id: 6,
      name: "Bhopal Water Reuse Project",
      location: "Madhya Pradesh",
      capacity: "30 MLD",
      type: "Water Reclamation",
      year: "2023",
      value: "₹95 Crores",
      status: "completed",
      description: "Tertiary treatment and water reuse system for industrial applications"
    },
    // Additional test projects for demonstration - remove in production
    {
      id: 7,
      name: "Chennai Desalination Plant",
      location: "Tamil Nadu",
      capacity: "100 MLD",
      type: "Desalination",
      year: "2024",
      value: "₹550 Crores",
      status: "ongoing",
      description: "Seawater reverse osmosis plant for augmenting city water supply"
    },
    {
      id: 8,
      name: "Pune Smart Water Network",
      location: "Maharashtra",
      capacity: "200 MLD",
      type: "Water Supply Scheme",
      year: "2023",
      value: "₹320 Crores",
      status: "completed",
      description: "IoT-enabled water distribution network with real-time monitoring"
    },
    {
      id: 9,
      name: "Kolkata Wetland Restoration",
      location: "West Bengal",
      capacity: "50 MLD",
      type: "Water Reclamation",
      year: "2024",
      value: "₹75 Crores",
      status: "ongoing",
      description: "Natural treatment system using constructed wetlands"
    },
    {
      id: 10,
      name: "Ahmedabad STP Upgrade",
      location: "Gujarat",
      capacity: "150 MLD",
      type: "Sewage Treatment Plant",
      year: "2023",
      value: "₹280 Crores",
      status: "completed",
      description: "Modernization of existing STP with energy recovery systems"
    },
    {
      id: 11,
      name: "Mysore Water Supply Augmentation",
      location: "Karnataka",
      capacity: "80 MLD",
      type: "Water Treatment Plant",
      year: "2024",
      value: "₹195 Crores",
      status: "ongoing",
      description: "New WTP and transmission mains for growing city needs"
    },
    {
      id: 12,
      name: "Lucknow Riverfront Development",
      location: "Uttar Pradesh",
      capacity: "N/A",
      type: "Storm Water System",
      year: "2023",
      value: "₹450 Crores",
      status: "completed",
      description: "Integrated flood management and riverfront beautification"
    },
    {
      id: 13,
      name: "Surat Industrial Water Treatment",
      location: "Gujarat",
      capacity: "75 MLD",
      type: "Industrial Water Solutions",
      year: "2024",
      value: "₹165 Crores",
      status: "ongoing",
      description: "Specialized treatment for textile and diamond industry requirements"
    },
    {
      id: 14,
      name: "Guwahati Flood Management",
      location: "Assam",
      capacity: "N/A",
      type: "Storm Water System",
      year: "2023",
      value: "₹220 Crores",
      status: "completed",
      description: "Comprehensive urban drainage and flood mitigation infrastructure"
    },
    {
      id: 15,
      name: "Visakhapatnam Port Water System",
      location: "Andhra Pradesh",
      capacity: "40 MLD",
      type: "Industrial Water Solutions",
      year: "2024",
      value: "₹130 Crores",
      status: "ongoing",
      description: "Port area water supply and treatment infrastructure"
    },
    {
      id: 16,
      name: "Agra Heritage Zone STP",
      location: "Uttar Pradesh",
      capacity: "35 MLD",
      type: "Sewage Treatment Plant",
      year: "2023",
      value: "₹110 Crores",
      status: "completed",
      description: "Advanced STP to protect Taj Mahal environs from pollution"
    }
  ];

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

  // Get visible projects
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_DISPLAY);
  }, [statusFilter, typeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        variant="secondary"
        badge="Our Work"
        title="Engineering Excellence in Water Infrastructure"
        description="Delivering transformative water solutions across India with over ₹2000 crores worth of projects"
      />

      {/* Main Projects Section */}
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

            {/* Type Filter Pills - Constrained width for better wrapping */}
            <div className="w-full max-w-4xl mx-auto mb-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {projectTypes.map(type => (
                  <Button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    variant={typeFilter === type ? 'filter-active' : 'filter'}
                    size="sm"
                  >
                    {type === 'all' ? 'All Types' : type}
                    {type === 'all' && (
                      <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-sm">
                        {filteredByStatus.filter(p => type === 'all' || p.type === type).length}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Search Bar with Status Dropdown */}
            {projects.length >= SEARCH_THRESHOLD && (
              <div className="relative w-full">
                {/* Search Bar - Truly centered */}
                <div className="max-w-lg mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search projects..."
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

                {/* Status Dropdown - Positioned absolutely on the right */}
                <div className="absolute right-0 top-0 hidden lg:block">
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as 'all' | 'completed' | 'ongoing')}
                      className="appearance-none px-6 py-3 pr-12 bg-white border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-[#005F73] focus:ring-2 focus:ring-[#005F73]/20 transition-all cursor-pointer min-w-[200px]"
                    >
                      <option value="all">All Status ({projects.length})</option>
                      <option value="completed">Completed ({projects.filter(p => p.status === 'completed').length})</option>
                      <option value="ongoing">Ongoing ({projects.filter(p => p.status === 'ongoing').length})</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Status Dropdown - Mobile version below search */}
                <div className="mt-4 flex justify-center lg:hidden">
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as 'all' | 'completed' | 'ongoing')}
                      className="appearance-none px-6 py-3 pr-12 bg-white border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-[#005F73] focus:ring-2 focus:ring-[#005F73]/20 transition-all cursor-pointer min-w-[200px]"
                    >
                      <option value="all">All Status ({projects.length})</option>
                      <option value="completed">Completed ({projects.filter(p => p.status === 'completed').length})</option>
                      <option value="ongoing">Ongoing ({projects.filter(p => p.status === 'ongoing').length})</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            /* No Results State */
            <div className="py-16 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery ? (
                    <>No projects match &ldquo;<span className="font-medium text-[#005F73]">{searchQuery}</span>&rdquo;</>
                  ) : (
                    <>No projects available with the selected filters</>
                  )}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {searchQuery && (
                    <Button
                      onClick={() => setSearchQuery('')}
                      variant="secondary"
                      size="sm"
                    >
                      Clear Search
                    </Button>
                  )}
                  {(statusFilter !== 'all' || typeFilter !== 'all') && (
                    <Button
                      onClick={() => {
                        setStatusFilter('all');
                        setTypeFilter('all');
                      }}
                      variant="primary"
                      size="sm"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-[#00C9C9] transition-all duration-300 hover:shadow-xl overflow-hidden"
                >
                  {/* Status Badge */}
                  <div className="px-6 pt-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                      </span>
                      <span className="text-sm text-gray-500">{project.year}</span>
                    </div>

                    {/* Project Name */}
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2 group-hover:text-[#005F73] transition-colors">
                      {highlightSearchTerms(project.name, searchQuery)}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {highlightSearchTerms(project.description, searchQuery)}
                    </p>

                    {/* Project Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Type</span>
                        <span className="text-sm font-medium text-gray-700">
                          {highlightSearchTerms(project.type, searchQuery)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Location</span>
                        <span className="text-sm font-medium text-gray-700">
                          {highlightSearchTerms(project.location, searchQuery)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Capacity</span>
                        <span className="text-sm font-medium text-[#005F73]">{project.capacity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Value Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Project Value</span>
                      <span className="text-lg font-bold text-[#005F73]">{project.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredProjects.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount(prev => Math.min(prev + INITIAL_DISPLAY, filteredProjects.length))}
                className="inline-flex items-center px-8 py-3 bg-white border-2 border-[#005F73] text-[#005F73] rounded-full font-semibold hover:bg-[#005F73] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                Load More Projects
                <span className="ml-2 px-2 py-0.5 bg-[#005F73]/10 rounded-full text-sm">
                  {filteredProjects.length - visibleCount}
                </span>
                <svg className="w-5 h-5 ml-3 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Results Info */}
          {(statusFilter !== 'all' || typeFilter !== 'all' || searchQuery) && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Showing {visibleProjects.length} of {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                {searchQuery && <span className="font-medium"> matching &ldquo;{searchQuery}&rdquo;</span>}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Our Capacity Section - Simplified */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">Our Capacity</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Engineering expertise backed by proven track record in large-scale water infrastructure
            </p>
          </div>

          {/* Stats Grid - Clean Design */}
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 mb-16">
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">500+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">MLD Capacity</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">1200+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">KM Pipeline</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">₹2000+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Crores Value</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">8+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">States</p>
            </div>
          </div>

          {/* Technical Capabilities */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-8 text-center">Technical Capabilities</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-[#005F73] mb-4">Design Software</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    WaterGEMS / SewerGEMS
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    EPANET / SWMM
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    HEC-RAS / HEC-HMS
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    AutoCAD / Civil 3D
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#005F73] mb-4">Treatment Technologies</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Conventional Treatment
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    MBR / MBBR Systems
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    SBR Technology
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Advanced Oxidation
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#005F73] mb-4">Project Types</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    EPC Contracts
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    HAM Projects
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    PMC Services
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    DPR Preparation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <CTASection
            title="Ready to Start Your Project?"
            description="Let's discuss how our expertise can transform your water infrastructure vision into reality"
            primaryButtonText="Get Free Consultation"
            primaryButtonHref="/contact"
            secondaryButtonText="Download Portfolio"
            secondaryButtonHref="/resources"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}