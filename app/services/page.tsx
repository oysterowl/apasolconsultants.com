'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  benefits: string[];
}

const services: Service[] = [
  {
    id: 'pre-bid-engineering',
    title: 'Pre-Bid Engineering',
    shortDescription: 'Comprehensive cost estimates, preliminary designs, and technical specifications for competitive bidding.',
    description: 'Our Pre-Bid Engineering services provide comprehensive support for contractors and developers preparing competitive bids. We deliver accurate cost estimates, preliminary designs, and technical specifications that give you a competitive edge.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: '#00C9C9',
    features: [
      'Preliminary design drawings',
      'Bill of Quantities (BOQ) preparation',
      'Cost estimation and analysis',
      'Technical specification development',
      'Risk assessment and mitigation strategies',
      'Bid documentation preparation',
      'Value engineering proposals',
      'Project timeline estimation'
    ],
    benefits: [
      'Competitive bidding advantage',
      'Accurate cost projections',
      'Reduced bid preparation time',
      'Higher success rate in tenders'
    ]
  },
  {
    id: 'detailed-engineering',
    title: 'Detailed Engineering',
    shortDescription: 'Complete process, mechanical, electrical, and SCADA design for WTPs, STPs, and pumping stations.',
    description: 'Our Detailed Engineering services encompass complete design and documentation for water and wastewater treatment facilities. From process design to SCADA implementation, we deliver comprehensive engineering solutions.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: '#3498DB',
    features: [
      'Process design and P&ID development',
      'Hydraulic and process calculations',
      'Mechanical equipment selection',
      'Electrical system design',
      'SCADA and automation design',
      'Structural design coordination',
      '3D modeling and clash detection',
      'Construction drawings and documents'
    ],
    benefits: [
      'Optimized plant performance',
      'Reduced construction errors',
      'Streamlined project execution',
      'Future expansion compatibility'
    ]
  },
  {
    id: 'network-design',
    title: 'Network Design',
    shortDescription: 'Hydraulic modeling and optimization of water distribution networks using WaterGEMS and HEC-RAS.',
    description: 'Our Network Design services utilize advanced hydraulic modeling software to design and optimize water distribution systems. We ensure reliable water supply with optimal pressure and flow throughout the network.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    color: '#005F73',
    features: [
      'Hydraulic network modeling',
      'Pipe sizing and material selection',
      'Pump station design and optimization',
      'Pressure management strategies',
      'Water quality modeling',
      'System reliability analysis',
      'Non-revenue water reduction',
      'GIS integration and mapping'
    ],
    benefits: [
      'Optimized network performance',
      'Reduced water losses',
      'Energy efficiency improvements',
      'Extended asset lifespan'
    ]
  }
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [index]);

  return (
    <Link href={`/services/${service.id}`}>
      <div 
        ref={ref}
        className={`group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ 
          borderColor: '#f3f4f6',
          transitionDelay: `${index * 100}ms`
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = service.color}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f3f4f6'}
      >
        <div 
          className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}
          style={{ backgroundColor: `${service.color}20`, color: service.color }}
        >
          {service.icon}
        </div>
        <h3 className="text-2xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#005F73] transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          {service.shortDescription}
        </p>
        <div className="flex items-center text-[#00C9C9] font-semibold group-hover:gap-3 transition-all">
          Learn more
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #e5e7eb 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              What We Do
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive engineering solutions from concept to commissioning. 
              We deliver excellence across the entire water infrastructure lifecycle.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-[#2C3E50] mb-12 text-center">
            Additional Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Project Management Consultancy',
              'Third-Party Inspection',
              'Asset Management',
              'Training & Capacity Building',
              'Environmental Impact Assessment',
              'Energy Audit & Optimization',
              'O&M Support Services',
              'Feasibility Studies'
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#00C9C9] hover:shadow-md transition-all duration-300"
              >
                <p className="font-semibold text-[#2C3E50]">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to start your project?</h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Let&apos;s discuss how our engineering expertise can bring your vision to life
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
    </div>
  );
}