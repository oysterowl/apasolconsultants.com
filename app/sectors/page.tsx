'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import { useEffect, useState, useRef, useMemo } from 'react';

interface Sector {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  stats?: { label: string; value: string }[];
  gradient: string;
}

interface SectorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  delay: number;
}

function SectorCard({ title, description, icon, href, delay }: SectorCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = cardRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay]);

  return (
    <Link
      href={href}
      ref={cardRef}
      className={`p-8 group/sector block border-t border-l first:border-l-0 hover:bg-gray-50/50 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Arrow Icon */}
      <div className="flex justify-end items-center mb-8">
        <div className="opacity-0 relative text-[#005F73] group-hover/sector:opacity-100 p-1 -translate-x-3 group-hover/sector:translate-x-0 transition-all duration-300">
          <svg height="16" width="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="m9.735 3.522-.656.666a.325.325 0 0 0 0 .451l2.042 2.077c.544.552.159 1.496-.61 1.496H2.815a.316.316 0 0 0-.314.318v.94c0 .178.14.32.314.32h7.813c.768 0 1.153.943.61 1.496l-2.043 2.076a.326.326 0 0 0 0 .452l.656.666c.12.123.32.123.444 0l5.115-5.192a.326.326 0 0 0 0-.451l-5.233-5.315a.314.314 0 0 0-.444 0h.003ZM13.378 9l.05.05-.05.05v-.103V9Z" 
            fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Icon */}
      <div className="mb-8">
        <div className="relative inline-flex">
          <div className="pointer-events-none w-14 h-14 bg-[#00C9C9] z-10 opacity-0 group-hover/sector:opacity-20 mix-blend-overlay absolute top-0 left-0 blur-xl rounded-full group-hover/sector:translate-y-6 transition-all duration-300 ease-in-out" />
          <div className="w-14 h-14 text-[#005F73] group-hover/sector:text-[#00C9C9] transition-colors duration-300">
            {icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="grid gap-4">
        <header>
          <h3 className="text-[#2C3E50] font-semibold uppercase -tracking-[0.01em] text-xl leading-none">
            {title}
          </h3>
        </header>
        <p className="text-gray-600 tracking-[0.01em] text-base leading-[1.555]">
          {description}
        </p>
      </section>
    </Link>
  );
}

export default function SectorsPage() {
  const sectors: Sector[] = useMemo(() => [
    {
      id: 'municipal',
      title: 'Municipal Water Infrastructure',
      shortTitle: 'Municipal',
      description: 'End-to-end solutions for urban water supply and sanitation systems. We design resilient infrastructure that serves communities efficiently.',
      features: [
        'Water Treatment Plants',
        'Distribution Networks',
        'Smart Water Systems',
        'NRW Management'
      ],
      icon: (
        <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
          />
        </svg>
      ),
      stats: [
        { label: 'Cities Served', value: '50+' },
        { label: 'Population', value: '10M+' }
      ],
      gradient: 'from-[#005F73] to-[#007A8A]'
    },
    {
      id: 'wastewater',
      title: 'Wastewater Management',
      shortTitle: 'Wastewater',
      description: 'Comprehensive wastewater solutions from collection to treatment and disposal, focusing on sustainability and resource recovery.',
      features: [
        'Sewage Treatment Plants',
        'Industrial ETPs',
        'Sludge Management',
        'Water Reuse Systems'
      ],
      icon: (
        <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
          />
        </svg>
      ),
      stats: [
        { label: 'Treatment Capacity', value: '500 MLD' },
        { label: 'Plants Designed', value: '100+' }
      ],
      gradient: 'from-[#007A8A] to-[#00A0A0]'
    },
    {
      id: 'industrial',
      title: 'Industrial Water Solutions',
      shortTitle: 'Industrial',
      description: 'Customized water and effluent treatment systems for industries, ensuring compliance and operational efficiency.',
      features: [
        'Process Water Treatment',
        'Zero Liquid Discharge',
        'Cooling Tower Systems',
        'Water Audits'
      ],
      icon: (
        <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
          />
        </svg>
      ),
      stats: [
        { label: 'Industries Served', value: '200+' },
        { label: 'Water Recycled', value: '40%' }
      ],
      gradient: 'from-[#00A0A0] to-[#00C9C9]'
    },
    {
      id: 'rural',
      title: 'Rural Water Supply',
      shortTitle: 'Rural',
      description: 'Sustainable water solutions for rural communities, ensuring equitable access to safe drinking water.',
      features: [
        'Village Water Schemes',
        'Hand Pumps & Wells',
        'Rainwater Harvesting',
        'Solar Pumping'
      ],
      icon: (
        <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        </svg>
      ),
      stats: [
        { label: 'Villages', value: '200+' },
        { label: 'Beneficiaries', value: '1M+' }
      ],
      gradient: 'from-[#005F73] to-[#007A8A]'
    },
    {
      id: 'stormwater',
      title: 'Stormwater Management',
      shortTitle: 'Stormwater',
      description: 'Integrated stormwater solutions that prevent flooding while promoting groundwater recharge.',
      features: [
        'Drainage Master Plans',
        'Flood Modeling',
        'Green Infrastructure',
        'Detention Systems'
      ],
      icon: (
        <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" 
          />
        </svg>
      ),
      stats: [
        { label: 'Drainage Projects', value: '50+' },
        { label: 'Flood Reduction', value: '85%' }
      ],
      gradient: 'from-[#007A8A] to-[#00A0A0]'
    },
    {
      id: 'smart-water',
      title: 'Smart Water Management',
      shortTitle: 'Smart Water',
      description: 'Digital transformation of water infrastructure through IoT, AI, and data analytics.',
      features: [
        'SCADA Systems',
        'IoT Sensors',
        'AI Analytics',
        'Mobile Solutions'
      ],
      icon: (
        <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" 
          />
        </svg>
      ),
      stats: [
        { label: 'Systems', value: '30+' },
        { label: 'Data Points/Day', value: '1M+' }
      ],
      gradient: 'from-[#00A0A0] to-[#00C9C9]'
    }
  ], []);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSectors = sectors.filter(sector => {
    const query = searchQuery.toLowerCase();
    return sector.title.toLowerCase().includes(query) ||
           sector.shortTitle.toLowerCase().includes(query) ||
           sector.description.toLowerCase().includes(query) ||
           sector.features.some(feature => feature.toLowerCase().includes(query));
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        variant="secondary"
        badge="Expertise Across Industries"
        title="Transforming Water Infrastructure Across Sectors"
        description="From urban municipalities to rural communities, we deliver comprehensive water engineering solutions that create lasting impact and sustainable growth."
      />

      {/* Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sectors by name, description, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 bg-white rounded-full shadow-lg border border-gray-200 focus:outline-none focus:border-[#00C9C9] focus:ring-2 focus:ring-[#00C9C9]/20 transition-all text-gray-700 placeholder-gray-400"
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Search results count */}
              {searchQuery && (
                <p className="mt-4 text-center text-gray-600 text-sm">
                  {filteredSectors.length === 0 
                    ? 'No sectors found matching your search' 
                    : `Showing ${filteredSectors.length} sector${filteredSectors.length !== 1 ? 's' : ''}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Grid - Clean Minimal Design */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="border border-gray-200 border-b-0 border-r-0">
            <div className="grid lg:grid-cols-3">
              {filteredSectors.map((sector, index) => (
                <SectorCard
                  key={index}
                  title={sector.shortTitle}
                  description={sector.description}
                  icon={sector.icon}
                  href={`/sectors/${sector.id}`}
                  delay={index * 50}
                />
              ))}
            </div>
          </div>

          {/* Additional sectors info */}
          {!searchQuery && (
            <div className="mt-20 text-center">
              <div className="inline-flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">
                  We continuously expand our expertise to serve emerging sectors. 
                  <Link href="/contact" className="text-[#00C9C9] hover:text-[#005F73] font-medium ml-1">
                    Contact us for custom solutions
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Visual Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Our Integrated Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering comprehensive solutions through a systematic process across all sectors
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Assess', description: 'Comprehensive analysis of water infrastructure needs' },
              { step: '02', title: 'Design', description: 'Engineering solutions tailored to local requirements' },
              { step: '03', title: 'Implement', description: 'Project execution with quality assurance' },
              { step: '04', title: 'Sustain', description: 'Long-term operation and maintenance support' }
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {idx < 3 && (
                  <svg className="hidden lg:block absolute top-10 -right-4 w-8 h-8 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Combined Impact Across All Sectors
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Our integrated approach delivers measurable results for communities and industries
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="text-6xl font-bold">500</div>
                <div className="absolute -top-2 -right-8 text-2xl">+</div>
              </div>
              <p className="text-gray-100">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="text-6xl font-bold">15M</div>
                <div className="absolute -top-2 -right-8 text-2xl">+</div>
              </div>
              <p className="text-gray-100">Lives Impacted</p>
            </div>
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="text-6xl font-bold">2000</div>
                <div className="absolute -top-2 -right-8 text-2xl">+</div>
              </div>
              <p className="text-gray-100">MLD Capacity</p>
            </div>
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="text-6xl font-bold">99</div>
                <div className="absolute -top-2 -right-4 text-2xl">%</div>
              </div>
              <p className="text-gray-100">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#005F73]/5 to-[#00C9C9]/5"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-[#2C3E50] mb-6">
                Ready to Transform Your Water Infrastructure?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how our expertise across sectors can help solve your specific water challenges
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-gradient-to-r from-[#005F73] to-[#00C9C9] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Start a Conversation
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center border-2 border-[#005F73] text-[#005F73] px-8 py-4 rounded-full font-semibold hover:bg-[#005F73] hover:text-white transition-all"
                >
                  View Our Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}