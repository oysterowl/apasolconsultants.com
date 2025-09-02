'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
}

function SectorHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #e5e7eb 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
            Industries We Serve
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-6">
            Sectors
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Comprehensive water engineering solutions across multiple industries, 
            delivering sustainable infrastructure for communities and businesses.
          </p>
        </div>
      </div>
    </section>
  );
}

function SectorNav({ sectors, activeSection }: { sectors: Sector[], activeSection: string }) {
  return (
    <nav className="sticky top-20 bg-white border-b border-gray-200 z-40">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex space-x-8 overflow-x-auto py-4 scrollbar-hide">
          {sectors.map((sector) => (
            <a
              key={sector.id}
              href={`#${sector.id}`}
              className={`text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === sector.id
                  ? 'text-[#00C9C9] border-b-2 border-[#00C9C9] pb-4'
                  : 'text-gray-600 hover:text-[#005F73] pb-4'
              }`}
            >
              {sector.shortTitle}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function SectorDetail({ sector, index }: { sector: Sector; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = sectorRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      id={sector.id}
      ref={sectorRef}
      className={`py-24 ${isEven ? 'bg-white' : 'bg-gray-50'} transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl flex items-center justify-center text-white mr-4">
                {sector.icon}
              </div>
              <div>
                <p className="text-[#00C9C9] font-semibold text-sm uppercase tracking-wide">
                  Sector {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="text-3xl font-bold text-[#2C3E50]">{sector.title}</h2>
              </div>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {sector.description}
            </p>

            {/* Stats if available */}
            {sector.stats && (
              <div className="grid grid-cols-2 gap-6 mb-8">
                {sector.stats.map((stat, idx) => (
                  <div key={idx} className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-2xl font-bold text-[#005F73]">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center text-[#00C9C9] hover:text-[#005F73] font-semibold transition-colors group"
            >
              Discuss your project
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Features Grid */}
          <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-6">Key Solutions</h3>
              <div className="grid gap-4">
                {sector.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start group"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.5s ease-out ${idx * 0.1}s`,
                    }}
                  >
                    <div className="w-6 h-6 bg-[#00C9C9]/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 group-hover:bg-[#00C9C9]/20 transition-colors">
                      <svg className="w-4 h-4 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SectorsPage() {
  const [activeSection, setActiveSection] = useState('');

  const sectors: Sector[] = useMemo(() => [
    {
      id: 'municipal',
      title: 'Municipal Water Infrastructure',
      shortTitle: 'Municipal',
      description: 'End-to-end solutions for urban water supply and sanitation systems. We design resilient infrastructure that serves communities efficiently while ensuring water quality and environmental sustainability.',
      features: [
        'Water Treatment Plant Design (WTP)',
        'Distribution Network Optimization',
        'Smart Metering Systems',
        'Non-Revenue Water Management',
        'Pumping Station Automation',
        '24x7 Water Supply Implementation',
        'Asset Management Systems',
        'Water Quality Monitoring Networks'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
          />
        </svg>
      ),
      stats: [
        { label: 'Cities Served', value: '50+' },
        { label: 'Population Covered', value: '10M+' }
      ]
    },
    {
      id: 'wastewater',
      title: 'Wastewater Management',
      shortTitle: 'Wastewater',
      description: 'Comprehensive wastewater solutions from collection to treatment and disposal. Our designs focus on efficiency, sustainability, and compliance with environmental regulations.',
      features: [
        'Sewage Treatment Plant Design (STP)',
        'Collection Network Hydraulics',
        'Biological Treatment Systems',
        'Advanced Nutrient Removal',
        'Sludge Management & Disposal',
        'Odor Control Technologies',
        'Effluent Quality Monitoring',
        'Energy Recovery Systems'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
          />
        </svg>
      ),
      stats: [
        { label: 'Treatment Capacity', value: '500 MLD' },
        { label: 'Plants Designed', value: '100+' }
      ]
    },
    {
      id: 'industrial',
      title: 'Industrial Water Solutions',
      shortTitle: 'Industrial',
      description: 'Specialized water and wastewater treatment systems for industries. We provide customized solutions that meet specific process requirements while ensuring regulatory compliance.',
      features: [
        'Effluent Treatment Plants (ETP)',
        'Zero Liquid Discharge Systems',
        'Process Water Treatment',
        'Cooling Tower Management',
        'Boiler Feed Water Systems',
        'Chemical Dosing Systems',
        'Industrial RO Plants',
        'Water Audit & Optimization'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
          />
        </svg>
      )
    },
    {
      id: 'rural',
      title: 'Rural Water Supply',
      shortTitle: 'Rural',
      description: 'Sustainable water supply solutions for rural communities. We focus on appropriate technology, community participation, and long-term sustainability.',
      features: [
        'Village Water Supply Schemes',
        'Hand Pump Installation',
        'Mini Water Treatment Plants',
        'Rainwater Harvesting Systems',
        'Community Sanitation Programs',
        'Spring Protection Works',
        'Gravity-Fed Systems',
        'Solar Pumping Solutions'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        </svg>
      ),
      stats: [
        { label: 'Villages Covered', value: '200+' },
        { label: 'Beneficiaries', value: '1M+' }
      ]
    },
    {
      id: 'stormwater',
      title: 'Stormwater Management',
      shortTitle: 'Stormwater',
      description: 'Integrated stormwater solutions that prevent flooding while promoting groundwater recharge. Our designs incorporate green infrastructure and sustainable drainage systems.',
      features: [
        'Drainage Master Planning',
        'Flood Modeling & Mapping',
        'Sustainable Drainage (SuDS)',
        'Retention & Detention Basins',
        'Green Infrastructure Design',
        'Stormwater Harvesting',
        'Channel Improvement Works',
        'Real-time Monitoring Systems'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" 
          />
        </svg>
      )
    },
    {
      id: 'smart-water',
      title: 'Smart Water Management',
      shortTitle: 'Smart Water',
      description: 'Digital transformation of water infrastructure through IoT, AI, and data analytics. We create intelligent systems that optimize operations and improve service delivery.',
      features: [
        'SCADA Implementation',
        'IoT Sensor Networks',
        'AI-based Leak Detection',
        'Predictive Maintenance',
        'Digital Twin Development',
        'Mobile App Integration',
        'Cloud-based Monitoring',
        'Data Analytics Dashboards'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" 
          />
        </svg>
      ),
      stats: [
        { label: 'Systems Deployed', value: '30+' },
        { label: 'Data Points/Day', value: '1M+' }
      ]
    }
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectors.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectors[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectors]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SectorHero />
      <SectorNav sectors={sectors} activeSection={activeSection} />
      
      {sectors.map((sector, index) => (
        <SectorDetail key={sector.id} sector={sector} index={index} />
      ))}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your water infrastructure?</h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Let&apos;s discuss how our expertise can help solve your water challenges
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-[#005F73] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Get in Touch
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}