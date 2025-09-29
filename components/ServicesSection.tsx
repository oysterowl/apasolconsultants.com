'use client';

import { useEffect, useRef, useState } from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  href: string;
  gradient: string;
}

function ServiceCard({ icon, title, description, delay, href, gradient }: ServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <a href={href}>
      <div
        ref={ref}
        className={`group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#00C9C9] shadow-sm hover:shadow-xl transition-all duration-300 h-full transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Gradient header with icon */}
        <div className={`relative h-28 ${gradient}`}>
          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
              <div className="text-white scale-125">
                {icon}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            {description}
          </p>
          {/* CTA */}
          <div className="flex items-center text-[#005F73] font-semibold group-hover:text-[#00C9C9] transition-colors duration-300">
            <span>Explore Service</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function ServicesSection() {
  return (
    <section className="py-32" id="services">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">What We Do</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive engineering solutions from concept to commissioning
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            title="Pre-Bid Engineering"
            description="Comprehensive cost estimates, preliminary designs, and technical specifications for competitive bidding."
            delay={0}
            href="/services/pre-bid-engineering"
            gradient="bg-gradient-to-br from-[#00C9C9] to-[#007A8F]"
          />

          <ServiceCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            }
            title="Detailed Engineering"
            description="Complete process, mechanical, electrical, and SCADA design for WTPs, STPs, and pumping stations."
            delay={100}
            href="/services/detailed-engineering"
            gradient="bg-gradient-to-br from-[#007A8F] to-[#005F73]"
          />

          <ServiceCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            }
            title="Network Design"
            description="Hydraulic modeling and optimization of water distribution networks using WaterGEMS and HEC-RAS."
            delay={200}
            href="/services/network-design"
            gradient="bg-gradient-to-br from-[#005F73] to-[#003D4F]"
          />
        </div>
      </div>
    </section>
  );
}