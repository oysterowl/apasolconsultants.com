'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-5xl">
          <p className={`text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            Engineering Excellence Since 2020
          </p>
          <h1 className={`text-5xl lg:text-7xl font-bold text-[#2C3E50] mb-6 leading-tight transition-opacity duration-700 delay-100 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            Water Solutions<br/>
            <span className="text-[#005F73]">Engineered Right</span>
          </h1>
          <p className={`text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed transition-opacity duration-700 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            Specialized consultancy in water & wastewater management, 
            delivering optimized engineering solutions for sustainable infrastructure.
          </p>
          <div className={`flex flex-wrap gap-4 transition-opacity duration-700 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <Link href="/contact" className="bg-[#005F73] text-white px-8 py-4 rounded-full hover:bg-[#004A5C] transition-colors hover:shadow-lg text-sm font-semibold inline-flex items-center">
              Start Your Project
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="#services" className="bg-white text-[#005F73] px-8 py-4 rounded-full border-2 border-[#005F73] hover:bg-gray-50 transition-colors text-sm font-semibold">
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}