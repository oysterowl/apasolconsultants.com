'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import CTASection from '@/components/CTASection';

interface Sector {
  id: string;
  title: string;
  description: string;
  services: string[];
  color: string;
}

const INITIAL_DISPLAY = 12;
const SEARCH_THRESHOLD = 15;

export default function SectorsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'municipal' | 'industrial' | 'environmental'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY);

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
      if (mergedMatches.length === 0 || match.start > mergedMatches[mergedMatches.length - 1].end) {
        mergedMatches.push(match);
      } else {
        mergedMatches[mergedMatches.length - 1].end = Math.max(mergedMatches[mergedMatches.length - 1].end, match.end);
      }
    });

    // Build the highlighted text
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

  const sectors: Sector[] = [
    {
      id: 'municipal-water',
      title: 'Municipal Water Infrastructure',
      description: 'End-to-end water supply and sanitation solutions for urban communities',
      services: ['Water Treatment Plants', 'Distribution Networks', 'Smart Metering', 'NRW Management', 'Pipeline Rehabilitation', 'Pressure Management'],
      color: 'municipal'
    },
    {
      id: 'wastewater-treatment',
      title: 'Wastewater Management',
      description: 'Comprehensive wastewater treatment and resource recovery solutions',
      services: ['Sewage Treatment', 'Industrial ETPs', 'Sludge Management', 'Water Reuse', 'Biogas Recovery', 'Nutrient Removal', 'Membrane Bioreactors'],
      color: 'environmental'
    },
    {
      id: 'industrial-water',
      title: 'Industrial Water Solutions',
      description: 'Customized water treatment systems for industrial applications',
      services: ['Process Water', 'Zero Discharge', 'Cooling Systems', 'Water Audits'],
      color: 'industrial'
    },
    {
      id: 'rural-water',
      title: 'Rural Water Supply',
      description: 'Sustainable water solutions for rural and remote communities',
      services: ['Village Schemes', 'Hand Pumps', 'Rainwater Harvesting', 'Solar Pumping'],
      color: 'municipal'
    },
    {
      id: 'stormwater',
      title: 'Stormwater Management',
      description: 'Integrated drainage and flood prevention solutions',
      services: ['Drainage Planning', 'Flood Modeling', 'Green Infrastructure', 'Retention Systems'],
      color: 'environmental'
    },
    {
      id: 'smart-water',
      title: 'Smart Water Systems',
      description: 'Digital transformation through IoT and AI-powered solutions',
      services: ['SCADA Systems', 'IoT Sensors', 'Data Analytics', 'Predictive Maintenance', 'Real-time Monitoring'],
      color: 'industrial'
    },
    {
      id: 'irrigation',
      title: 'Irrigation Systems',
      description: 'Efficient water management for agricultural productivity',
      services: ['Drip Irrigation', 'Canal Systems', 'Pump Stations', 'Water Storage'],
      color: 'environmental'
    },
    {
      id: 'water-treatment',
      title: 'Water Treatment Plants',
      description: 'State-of-the-art treatment facilities for safe drinking water',
      services: ['Conventional Treatment', 'Membrane Systems', 'Disinfection', 'Quality Monitoring'],
      color: 'municipal'
    },
    {
      id: 'desalination',
      title: 'Desalination Plants',
      description: 'Advanced seawater and brackish water treatment solutions',
      services: ['Reverse Osmosis', 'Thermal Desalination', 'Brine Management', 'Energy Recovery'],
      color: 'industrial'
    },
    // Test sectors to demonstrate Load More functionality - remove in production
    {
      id: 'groundwater',
      title: 'Groundwater Management',
      description: 'Sustainable extraction and recharge of groundwater resources',
      services: ['Aquifer Mapping', 'Well Design', 'Recharge Structures', 'Quality Monitoring'],
      color: 'environmental'
    },
    {
      id: 'water-recycling',
      title: 'Water Recycling Systems',
      description: 'Complete water recycling solutions for various applications',
      services: ['Grey Water Treatment', 'Black Water Recovery', 'Process Water Recycling'],
      color: 'environmental'
    },
    {
      id: 'flood-control',
      title: 'Flood Control Infrastructure',
      description: 'Comprehensive flood prevention and management systems',
      services: ['Levee Design', 'Flood Gates', 'Pumping Stations', 'Early Warning Systems'],
      color: 'municipal'
    },
    {
      id: 'pipeline-infra',
      title: 'Pipeline Infrastructure',
      description: 'Design and construction of water transmission pipelines',
      services: ['Pipeline Design', 'Trenchless Technology', 'Valve Chambers', 'SCADA Integration'],
      color: 'municipal'
    },
    {
      id: 'reservoir-mgmt',
      title: 'Reservoir Management',
      description: 'Dam safety and reservoir operation optimization',
      services: ['Dam Safety Assessment', 'Spillway Design', 'Sediment Management', 'Water Balance'],
      color: 'environmental'
    },
    {
      id: 'coastal-protection',
      title: 'Coastal Protection Systems',
      description: 'Marine infrastructure for coastal water management',
      services: ['Seawalls', 'Breakwaters', 'Coastal Drainage', 'Erosion Control'],
      color: 'municipal'
    },
    {
      id: 'water-quality',
      title: 'Water Quality Monitoring',
      description: 'Comprehensive water quality assessment and monitoring',
      services: ['Laboratory Services', 'Online Monitoring', 'Compliance Testing', 'Data Management'],
      color: 'environmental'
    },
    {
      id: 'mining-water',
      title: 'Mining Water Management',
      description: 'Specialized water solutions for mining operations',
      services: ['Dewatering', 'Tailings Management', 'Acid Mine Drainage', 'Water Recovery'],
      color: 'industrial'
    },
    {
      id: 'food-beverage',
      title: 'Food & Beverage Water',
      description: 'Ultra-pure water systems for F&B industry',
      services: ['Process Water', 'CIP Systems', 'Wastewater Treatment', 'Steam Generation'],
      color: 'industrial'
    },
    {
      id: 'pharma-water',
      title: 'Pharmaceutical Water',
      description: 'High-purity water for pharmaceutical manufacturing',
      services: ['WFI Systems', 'Pure Water', 'Validation Services', 'cGMP Compliance'],
      color: 'industrial'
    },
    {
      id: 'data-center',
      title: 'Data Center Cooling',
      description: 'Cooling water systems for data centers',
      services: ['Cooling Towers', 'Chilled Water', 'Water Treatment', 'Heat Recovery'],
      color: 'industrial'
    },
    {
      id: 'power-plant',
      title: 'Power Plant Water',
      description: 'Water systems for thermal power generation',
      services: ['Boiler Feed Water', 'Cooling Water', 'FGD Systems', 'Ash Handling'],
      color: 'industrial'
    },
    {
      id: 'wetlands',
      title: 'Wetland Restoration',
      description: 'Natural treatment systems and wetland conservation',
      services: ['Constructed Wetlands', 'Habitat Restoration', 'Natural Treatment', 'Biodiversity'],
      color: 'environmental'
    },
    {
      id: 'lake-mgmt',
      title: 'Lake & Pond Management',
      description: 'Restoration and management of water bodies',
      services: ['Eutrophication Control', 'Dredging', 'Aeration Systems', 'Algae Management'],
      color: 'environmental'
    },
    {
      id: 'emergency-water',
      title: 'Emergency Water Supply',
      description: 'Rapid deployment water systems for emergencies',
      services: ['Mobile Treatment', 'Temporary Infrastructure', 'Disaster Response', 'Tankering'],
      color: 'municipal'
    },
    {
      id: 'sports-facilities',
      title: 'Sports & Recreation Water',
      description: 'Water systems for sports and recreational facilities',
      services: ['Swimming Pools', 'Golf Course Irrigation', 'Stadium Systems', 'Fountains'],
      color: 'municipal'
    }
  ];

  // Filter sectors based on category and search
  const filteredByCategory = selectedCategory === 'all'
    ? sectors
    : sectors.filter(sector => sector.color === selectedCategory);

  const filteredSectors = searchQuery.trim()
    ? filteredByCategory.filter(sector =>
        sector.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sector.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sector.services.some(service =>
          service.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : filteredByCategory;

  // Get visible sectors based on count
  const visibleSectors = filteredSectors.slice(0, visibleCount);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_DISPLAY);
  }, [selectedCategory, searchQuery]);

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Sectors', count: sectors.length },
    { id: 'municipal', label: 'Municipal', count: sectors.filter(s => s.color === 'municipal').length },
    { id: 'industrial', label: 'Industrial', count: sectors.filter(s => s.color === 'industrial').length },
    { id: 'environmental', label: 'Environmental', count: sectors.filter(s => s.color === 'environmental').length }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        variant="secondary"
        badge="Our Expertise"
        title="Water Solutions Across Every Sector"
        description="From municipalities to industries, we deliver comprehensive water engineering solutions tailored to unique sector requirements"
      />

      {/* Main Sectors Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">

          {/* Section Header with Filters */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Explore Our Sectors
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Specialized expertise across diverse water infrastructure domains
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as 'all' | 'municipal' | 'industrial' | 'environmental')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                    selectedCategory === category.id
                      ? 'bg-[#005F73] text-white border-[#005F73] shadow-lg'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#005F73] hover:text-[#005F73]'
                  }`}
                >
                  {category.label}
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-sm">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Bar - Only show when there are many sectors */}
            {sectors.length >= SEARCH_THRESHOLD && (
              <div className="mt-8 max-w-lg mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search sectors..."
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

          {/* Sectors Grid - Clean Card Design */}
          {filteredSectors.length === 0 ? (
            /* No Results State */
            <div className="py-16 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  No sectors found
                </h3>

                <p className="text-gray-600 mb-6">
                  {searchQuery ? (
                    <>No sectors match &ldquo;<span className="font-medium text-[#005F73]">{searchQuery}</span>&rdquo;</>
                  ) : (
                    <>No sectors available in the {selectedCategory} category</>
                  )}
                </p>

                {/* Action Buttons */}
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
                      className="px-6 py-2 bg-[#005F73] text-white rounded-full hover:bg-[#004A5C] transition-colors"
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
                href={`/sectors/${sector.id}`}
                className="group relative bg-white rounded-xl border border-gray-200 hover:border-[#00C9C9] transition-all duration-300 hover:shadow-xl cursor-pointer block"
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
                  sector.color === 'municipal' ? 'bg-[#005F73]' :
                  sector.color === 'industrial' ? 'bg-[#00C9C9]' :
                  'bg-[#007A8A]'
                }`}></div>

                <div className="p-8 h-full flex flex-col">
                  {/* Water Drop Accent */}
                  <div className="mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      sector.color === 'municipal' ? 'bg-[#005F73]/10' :
                      sector.color === 'industrial' ? 'bg-[#00C9C9]/10' :
                      'bg-[#007A8A]/10'
                    }`}>
                      <svg className={`w-6 h-6 ${
                        sector.color === 'municipal' ? 'text-[#005F73]' :
                        sector.color === 'industrial' ? 'text-[#00C9C9]' :
                        'text-[#007A8A]'
                      }`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#005F73] transition-colors">
                    {highlightSearchTerms(sector.title, searchQuery)}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {highlightSearchTerms(sector.description, searchQuery)}
                  </p>

                  {/* Services List */}
                  <div className="space-y-2 mb-6 flex-grow">
                    {sector.services.slice(0, 4).map((service, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 text-[#00C9C9] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {service}
                      </div>
                    ))}
                    {sector.services.length > 4 && (
                      <div className="flex items-center text-sm text-gray-500 ml-6">
                        <span className="text-[#00C9C9] font-medium">
                          +{sector.services.length - 4} more service{sector.services.length - 4 > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Learn More - positioned at bottom right */}
                  <div className="flex justify-end items-center text-[#005F73] font-semibold group-hover:text-[#00C9C9] transition-colors">
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
                className="inline-flex items-center px-8 py-3 bg-white border-2 border-[#005F73] text-[#005F73] rounded-full font-semibold hover:bg-[#005F73] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                Load More Sectors
                <span className="ml-2 px-2 py-0.5 bg-[#005F73]/10 rounded-full text-sm">
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
        </div>
      </section>

      {/* Our Approach Section - Visual Process */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Our Integrated Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that delivers results across all sectors
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#005F73] via-[#00C9C9] to-[#005F73] opacity-20"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  phase: 'Assess',
                  title: 'Comprehensive Analysis',
                  items: ['Site Survey', 'Needs Assessment', 'Feasibility Study']
                },
                {
                  phase: 'Design',
                  title: 'Engineering Excellence',
                  items: ['Detailed Design', 'Technical Specs', '3D Modeling']
                },
                {
                  phase: 'Build',
                  title: 'Quality Implementation',
                  items: ['Construction', 'Quality Control', 'Testing']
                },
                {
                  phase: 'Sustain',
                  title: 'Long-term Support',
                  items: ['O&M Services', 'Performance Monitoring', 'Optimization']
                }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                    {/* Step Number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#00C9C9] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </div>

                    {/* Phase */}
                    <div className="text-[#005F73] font-bold text-sm uppercase tracking-wider mb-3">
                      {step.phase}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#2C3E50] mb-4">
                      {step.title}
                    </h3>

                    {/* Items */}
                    <ul className="space-y-2">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics - Clean Design */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
              Our Collective Impact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Measurable results across sectors, transforming communities
            </p>
          </div>

          {/* Stats with Dividers */}
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">500+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Projects Delivered</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">15M+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Lives Impacted</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">2000</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">MLD Capacity</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">99%</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <CTASection
            title="Ready to Transform Your Water Infrastructure?"
            description="Let's discuss how our sector expertise can address your specific challenges"
            primaryButtonText="Get Started"
            primaryButtonHref="/contact"
            secondaryButtonText="Download Capabilities"
            secondaryButtonHref="/resources"
          />
        </div>
      </section>

      <Footer />

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
    </div>
  );
}