'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface SectorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  delay: number;
}

function SectorCard({ title, description, icon, href, delay }: SectorCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
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

export default function SectorsSection() {
  const sectors = [
    {
      title: 'Municipal',
      description: 'Comprehensive water and wastewater solutions for urban areas and smart cities.',
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
          />
        </svg>
      ),
      href: '/sectors/municipal'
    },
    {
      title: 'Industrial',
      description: 'Specialized treatment systems for manufacturing and processing facilities.',
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
          />
        </svg>
      ),
      href: '/sectors/industrial'
    },
    {
      title: 'Infrastructure',
      description: 'Large-scale water infrastructure for sustainable development projects.',
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" 
          />
        </svg>
      ),
      href: '/sectors/infrastructure'
    },
    {
      title: 'Rural',
      description: 'Sustainable water solutions tailored for rural communities and villages.',
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        </svg>
      ),
      href: '/sectors/rural'
    },
    {
      title: 'Smart Water',
      description: 'IoT-enabled monitoring systems with real-time analytics and control.',
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" 
          />
        </svg>
      ),
      href: '/sectors/smart-water'
    },
    {
      title: 'Environmental',
      description: 'Impact assessments and sustainable water management consulting.',
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      ),
      href: '/sectors/environmental'
    }
  ];

  return (
    <section className="py-32" id="sectors">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">
            Industries We Serve
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
            Our Sectors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Delivering specialized water and wastewater solutions across diverse sectors with expertise and innovation
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="border border-gray-200 border-b-0 border-r-0">
          <div className="grid lg:grid-cols-3">
            {sectors.map((sector, index) => (
              <SectorCard
                key={index}
                title={sector.title}
                description={sector.description}
                icon={sector.icon}
                href={sector.href}
                delay={index * 50}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-6">
            Discover how we can transform your water infrastructure
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center text-[#00C9C9] hover:text-[#005F73] font-semibold transition-colors group"
          >
            Start a conversation
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
      </div>
    </section>
  );
}