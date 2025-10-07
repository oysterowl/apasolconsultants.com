'use client';

import Header from '@/components/HeaderWrapper';
import ClientFooterWrapper from '@/components/ClientFooterWrapper';
import CTASection from '@/components/CTASection';
import Link from 'next/link';

export default function NetworkDesignPage() {

  const capabilities = [
    {
      title: 'Hydraulic Modeling',
      description: 'Advanced simulation of water flow, pressure, and quality throughout the distribution network',
      features: [
        'Steady-state analysis',
        'Extended period simulation',
        'Fire flow analysis',
        'Water age modeling'
      ]
    },
    {
      title: 'Network Optimization',
      description: 'Strategic design to minimize costs while maximizing system performance and reliability',
      features: [
        'Pipe sizing optimization',
        'Pump scheduling',
        'Pressure zone management',
        'Energy efficiency analysis'
      ]
    },
    {
      title: 'Asset Management',
      description: 'Long-term planning for network maintenance, rehabilitation, and expansion',
      features: [
        'Pipe condition assessment',
        'Rehabilitation planning',
        'Life cycle cost analysis',
        'Capital improvement planning'
      ]
    },
    {
      title: 'Smart Water Solutions',
      description: 'Integration of IoT and data analytics for intelligent network management',
      features: [
        'Real-time monitoring design',
        'SCADA integration',
        'Leak detection systems',
        'Demand forecasting'
      ]
    }
  ];

  const software = [
    {
      name: 'WaterGEMS',
      description: 'Comprehensive water distribution modeling',
      icon: (
        <svg className="w-10 h-10 text-[#0057FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      name: 'EPANET',
      description: 'Open-source hydraulic analysis',
      icon: (
        <svg className="w-10 h-10 text-[#0057FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      name: 'HEC-RAS',
      description: 'River and channel hydraulics',
      icon: (
        <svg className="w-10 h-10 text-[#0057FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      name: 'GIS Integration',
      description: 'Spatial analysis and mapping',
      icon: (
        <svg className="w-10 h-10 text-[#0057FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    }
  ];

  const benefits = [
    {
      title: 'Reduced Water Loss',
      value: '30%',
      description: 'Average NRW reduction through optimized design'
    },
    {
      title: 'Energy Savings',
      value: '25%',
      description: 'Pumping energy reduction through optimization'
    },
    {
      title: 'Service Reliability',
      value: '99.9%',
      description: 'Network uptime with proper design'
    },
    {
      title: 'Cost Reduction',
      value: '20%',
      description: 'Lower operational costs'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <Link 
              href="/services"
              className="inline-flex items-center text-[#0057FF] hover:text-[#26AFFF] font-medium mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Services
            </Link>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-6">
              Network Design
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Advanced hydraulic modeling and optimization of water distribution networks. 
              We design efficient, reliable systems that ensure consistent water supply 
              while minimizing operational costs and water losses.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-[#0057FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Data-Driven Design</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-[#0057FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Energy Optimized</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-[#0057FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Future-Ready Infrastructure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
              Our Capabilities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive network design services powered by advanced technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-8 hover:border-[#26AFFF] hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">{capability.title}</h3>
                <p className="text-gray-600 mb-6">{capability.description}</p>
                <ul className="grid grid-cols-2 gap-3">
                  {capability.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#0057FF] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software Tools Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
              Advanced Software Tools
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Industry-leading software for accurate modeling and analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {software.map((tool, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">{tool.icon}</div>
                <h3 className="text-lg font-bold text-[#2C3E50] mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
              The Impact of Good Network Design
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Properly designed networks deliver measurable benefits
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="text-center"
              >
                <div className="text-5xl font-bold text-[#26AFFF] mb-2">{benefit.value}</div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Design Process
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              A systematic approach to network design excellence
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/30"></div>
              
              {[
                {
                  step: '01',
                  title: 'Data Collection & Analysis',
                  description: 'Gather existing network data, demand patterns, and growth projections'
                },
                {
                  step: '02',
                  title: 'Hydraulic Modeling',
                  description: 'Build and calibrate hydraulic model using field measurements'
                },
                {
                  step: '03',
                  title: 'Scenario Analysis',
                  description: 'Evaluate multiple design alternatives and operational strategies'
                },
                {
                  step: '04',
                  title: 'Optimization',
                  description: 'Fine-tune design for optimal performance and cost-effectiveness'
                },
                {
                  step: '05',
                  title: 'Documentation',
                  description: 'Prepare detailed design reports, drawings, and specifications'
                }
              ].map((item, index) => (
                <div key={index} className="relative flex gap-6 mb-12 last:mb-0">
                  <div className="w-16 h-16 bg-white text-[#0057FF] rounded-full flex items-center justify-center font-bold text-xl z-10">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-100">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <CTASection
            title="Ready to Optimize Your Water Network?"
            description="Let us design a water distribution system that delivers reliability, efficiency, and long-term value for your community."
            primaryButtonText="Start Your Project"
            primaryButtonHref="/contact"
            secondaryButtonText="Explore All Services"
            secondaryButtonHref="/services"
          />
        </div>
      </section>

      <ClientFooterWrapper />
    </div>
  );
}