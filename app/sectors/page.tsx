'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import { useState } from 'react';
import CTASection from '@/components/CTASection';

interface Sector {
  id: string;
  title: string;
  description: string;
  services: string[];
  color: string;
}

export default function SectorsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'municipal' | 'industrial' | 'environmental'>('all');

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
    }
  ];

  // Filter sectors based on category
  const filteredSectors = selectedCategory === 'all'
    ? sectors
    : sectors.filter(sector => sector.color === selectedCategory);

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
          </div>

          {/* Sectors Grid - Clean Card Design */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSectors.map((sector, index) => (
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
                    {sector.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {sector.description}
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

          {/* Results Info */}
          {selectedCategory !== 'all' && (
            <div className="mt-12 text-center">
              <p className="text-gray-600">
                Showing {filteredSectors.length} {selectedCategory} sector{filteredSectors.length !== 1 ? 's' : ''}
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Our Collective Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable results across sectors, transforming communities
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '15M+', label: 'Lives Impacted' },
              { value: '2000', label: 'MLD Capacity' },
              { value: '99%', label: 'Client Satisfaction' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-[#005F73] mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
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