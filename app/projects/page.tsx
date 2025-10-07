'use client';

import Header from '@/components/Header';
import ClientFooterWrapper from '@/components/ClientFooterWrapper';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import CustomDropdown from '@/components/CustomDropdown';
import VirtualProjectGrid from '@/components/VirtualProjectGrid';
import { useState } from 'react';

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

const SEARCH_THRESHOLD = 15;

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    },
    // Additional projects for virtual scrolling demonstration
    {
      id: 17,
      name: "Hyderabad Smart Water Grid",
      location: "Telangana",
      capacity: "250 MLD",
      type: "Water Supply Scheme",
      year: "2024",
      value: "₹420 Crores",
      status: "ongoing",
      description: "IoT-based water distribution network with leak detection"
    },
    {
      id: 18,
      name: "Kochi Backwater Treatment",
      location: "Kerala",
      capacity: "40 MLD",
      type: "Water Treatment Plant",
      year: "2023",
      value: "₹135 Crores",
      status: "completed",
      description: "Specialized treatment for saline water sources"
    },
    {
      id: 19,
      name: "Indore Zero Liquid Discharge",
      location: "Madhya Pradesh",
      capacity: "55 MLD",
      type: "Industrial Water Solutions",
      year: "2024",
      value: "₹175 Crores",
      status: "ongoing",
      description: "Complete water recycling system for industrial zone"
    },
    {
      id: 20,
      name: "Shimla Hill Station Water",
      location: "Himachal Pradesh",
      capacity: "25 MLD",
      type: "Water Supply Scheme",
      year: "2023",
      value: "₹95 Crores",
      status: "completed",
      description: "Gravity-based water supply for hill station"
    },
    {
      id: 21,
      name: "Rajkot Storm Management",
      location: "Gujarat",
      capacity: "N/A",
      type: "Storm Water System",
      year: "2024",
      value: "₹145 Crores",
      status: "ongoing",
      description: "Urban flood mitigation with rainwater harvesting"
    },
    {
      id: 22,
      name: "Patna Ganga Water Treatment",
      location: "Bihar",
      capacity: "120 MLD",
      type: "Water Treatment Plant",
      year: "2023",
      value: "₹285 Crores",
      status: "completed",
      description: "River water treatment with advanced filtration"
    },
    {
      id: 23,
      name: "Coimbatore Industrial ETP",
      location: "Tamil Nadu",
      capacity: "80 MLD",
      type: "Sewage Treatment Plant",
      year: "2024",
      value: "₹195 Crores",
      status: "ongoing",
      description: "Common effluent treatment for textile industry"
    },
    {
      id: 24,
      name: "Dehradun Valley Project",
      location: "Uttarakhand",
      capacity: "35 MLD",
      type: "Water Supply Scheme",
      year: "2023",
      value: "₹125 Crores",
      status: "completed",
      description: "Spring water collection and distribution system"
    },
    {
      id: 25,
      name: "Raipur Smart Sewerage",
      location: "Chhattisgarh",
      capacity: "90 MLD",
      type: "Sewerage System",
      year: "2024",
      value: "₹215 Crores",
      status: "ongoing",
      description: "SCADA-enabled sewerage network with real-time monitoring"
    },
    {
      id: 26,
      name: "Mangalore Coastal Desalination",
      location: "Karnataka",
      capacity: "60 MLD",
      type: "Desalination",
      year: "2023",
      value: "₹380 Crores",
      status: "completed",
      description: "Seawater RO plant for coastal city water security"
    },
    {
      id: 27,
      name: "Amritsar Heritage Water",
      location: "Punjab",
      capacity: "45 MLD",
      type: "Water Treatment Plant",
      year: "2024",
      value: "₹155 Crores",
      status: "ongoing",
      description: "Water treatment preserving heritage site requirements"
    },
    {
      id: 28,
      name: "Vizag Industrial Water Reuse",
      location: "Andhra Pradesh",
      capacity: "70 MLD",
      type: "Water Reclamation",
      year: "2023",
      value: "₹185 Crores",
      status: "completed",
      description: "Industrial wastewater recycling for port operations"
    },
    {
      id: 29,
      name: "Jodhpur Desert Water Supply",
      location: "Rajasthan",
      capacity: "55 MLD",
      type: "Water Supply Scheme",
      year: "2024",
      value: "₹245 Crores",
      status: "ongoing",
      description: "Long-distance water transmission for arid regions"
    },
    {
      id: 30,
      name: "Gwalior Municipal STP",
      location: "Madhya Pradesh",
      capacity: "65 MLD",
      type: "Sewage Treatment Plant",
      year: "2023",
      value: "₹165 Crores",
      status: "completed",
      description: "SBR technology implementation for municipal sewage"
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        variant="primary"
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
              <div className="mb-4 text-center">
                <p className="text-gray-600 text-sm">
                  Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                  {searchQuery && <span className="font-medium"> matching &ldquo;{searchQuery}&rdquo;</span>}
                </p>
              </div>
              <VirtualProjectGrid
                projects={filteredProjects}
                searchQuery={searchQuery}
                highlightSearchTerms={highlightSearchTerms}
              />
            </>
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
                <h4 className="font-semibold text-[#0057FF] mb-4">Design Software</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    WaterGEMS / SewerGEMS
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    EPANET / SWMM
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    HEC-RAS / HEC-HMS
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    AutoCAD / Civil 3D
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0057FF] mb-4">Treatment Technologies</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Conventional Treatment
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    MBR / MBBR Systems
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    SBR Technology
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Advanced Oxidation
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0057FF] mb-4">Project Types</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    EPC Contracts
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    HAM Projects
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    PMC Services
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <ClientFooterWrapper />
    </div>
  );
}