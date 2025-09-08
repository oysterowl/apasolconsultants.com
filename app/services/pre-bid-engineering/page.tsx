'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PreBidEngineeringPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: 'Preliminary Design',
      description: 'Conceptual layouts and basic engineering drawings for accurate project visualization',
      icon: (
        <svg className="w-8 h-8 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: 'Cost Estimation',
      description: 'Detailed BOQ preparation with current market rates and contingency analysis',
      icon: (
        <svg className="w-8 h-8 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Technical Specifications',
      description: 'Comprehensive specifications for equipment, materials, and construction methods',
      icon: (
        <svg className="w-8 h-8 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: 'Risk Assessment',
      description: 'Identification and mitigation strategies for potential project risks',
      icon: (
        <svg className="w-8 h-8 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Project Analysis',
      description: 'Review tender documents and understand project requirements'
    },
    {
      step: '02',
      title: 'Site Assessment',
      description: 'Evaluate site conditions and identify potential challenges'
    },
    {
      step: '03',
      title: 'Design Development',
      description: 'Create preliminary designs and technical solutions'
    },
    {
      step: '04',
      title: 'Cost Calculation',
      description: 'Develop detailed cost estimates with market analysis'
    },
    {
      step: '05',
      title: 'Documentation',
      description: 'Prepare comprehensive bid documents and submissions'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#00C9C9]/5 to-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className={`max-w-4xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Link 
              href="/services"
              className="inline-flex items-center text-[#00C9C9] hover:text-[#005F73] font-medium mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Services
            </Link>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-6">
              Pre-Bid Engineering
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Comprehensive support for contractors and developers preparing competitive bids. 
              We deliver accurate cost estimates, preliminary designs, and technical specifications 
              that give you a competitive edge in the bidding process.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Quick Turnaround</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Accuracy Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Competitive Advantage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
              What We Deliver
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our pre-bid engineering services provide everything you need for a winning bid
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A systematic approach to ensure comprehensive bid preparation
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div 
                key={index}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#00C9C9] text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1 pb-8 border-b border-gray-200 last:border-0">
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-8">
                Why Choose Our Pre-Bid Engineering Services?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#00C9C9]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2C3E50] mb-2">Higher Success Rate</h3>
                    <p className="text-gray-600">Our detailed proposals significantly improve your chances of winning tenders</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#00C9C9]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2C3E50] mb-2">Cost Optimization</h3>
                    <p className="text-gray-600">Value engineering approach ensures competitive pricing without compromising quality</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#00C9C9]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2C3E50] mb-2">Expert Support</h3>
                    <p className="text-gray-600">Backed by experienced engineers with deep industry knowledge</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Quick Stats</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold mb-1">200+</div>
                  <p className="opacity-90">Successful Bids Supported</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1">85%</div>
                  <p className="opacity-90">Client Success Rate</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1">₹500 Cr+</div>
                  <p className="opacity-90">Total Project Value</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
            Ready to Win Your Next Bid?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Let our expert team help you prepare a winning proposal with accurate estimates and compelling technical solutions
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-[#00C9C9] hover:bg-[#005F73] text-white px-8 py-4 rounded-full font-semibold transition-colors"
            >
              Get Started
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center bg-white hover:bg-gray-100 text-[#005F73] px-8 py-4 rounded-full font-semibold border border-gray-200 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}