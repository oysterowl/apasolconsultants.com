'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DetailedEngineeringPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      title: 'Process Design',
      items: [
        'Process Flow Diagrams (PFD)',
        'P&ID Development',
        'Mass & Energy Balance',
        'Equipment Sizing',
        'Process Optimization'
      ]
    },
    {
      title: 'Mechanical Engineering',
      items: [
        'Equipment Layout',
        'Piping Design & Routing',
        'Equipment Specifications',
        'Material Selection',
        'Stress Analysis'
      ]
    },
    {
      title: 'Electrical & Instrumentation',
      items: [
        'Power Distribution Design',
        'Control System Architecture',
        'Instrumentation Selection',
        'Cable Routing',
        'Lightning Protection'
      ]
    },
    {
      title: 'SCADA & Automation',
      items: [
        'HMI Development',
        'PLC Programming Logic',
        'Network Architecture',
        'Cybersecurity Design',
        'Remote Monitoring Setup'
      ]
    }
  ];

  const deliverables = [
    {
      category: 'Drawings',
      items: [
        'General Arrangement Drawings',
        'P&IDs and PFDs',
        'Electrical Single Line Diagrams',
        'Control Panel Layouts',
        'Isometric Drawings'
      ],
      icon: (
        <svg className="w-12 h-12 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      category: 'Calculations',
      items: [
        'Hydraulic Calculations',
        'Structural Load Analysis',
        'Electrical Load Studies',
        'Equipment Sizing Sheets',
        'Bill of Materials'
      ],
      icon: (
        <svg className="w-12 h-12 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      category: 'Specifications',
      items: [
        'Technical Specifications',
        'Equipment Data Sheets',
        'Construction Standards',
        'Testing Procedures',
        'O&M Manuals'
      ],
      icon: (
        <svg className="w-12 h-12 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      category: '3D Models',
      items: [
        '3D Plant Models',
        'Clash Detection Reports',
        'Virtual Walk-throughs',
        'Equipment Animations',
        'Construction Sequences'
      ],
      icon: (
        <svg className="w-12 h-12 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#3498DB]/5 to-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className={`max-w-4xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Link 
              href="/services"
              className="inline-flex items-center text-[#3498DB] hover:text-[#005F73] font-medium mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Services
            </Link>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-6">
              Detailed Engineering
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Complete engineering solutions from concept to construction. Our detailed engineering 
              services encompass process, mechanical, electrical, and instrumentation design for 
              water and wastewater treatment facilities.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Comprehensive Documentation</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Quality Assured</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Construction Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
              Engineering Disciplines
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Multi-disciplinary expertise for complete project execution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-[#3498DB] transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#3498DB] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
              Project Deliverables
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive documentation for seamless project execution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deliverables.map((deliverable, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">{deliverable.icon}</div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">{deliverable.category}</h3>
                <ul className="text-left space-y-2">
                  {deliverable.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-8">
                Advanced Design Tools & Technology
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                We leverage cutting-edge software and technologies to deliver accurate, 
                efficient, and optimized engineering designs.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: 'AutoCAD', type: '2D/3D Design' },
                  { name: 'Revit', type: 'BIM Modeling' },
                  { name: 'STAAD Pro', type: 'Structural Analysis' },
                  { name: 'ETAP', type: 'Electrical Design' },
                  { name: 'WaterGEMS', type: 'Hydraulic Modeling' },
                  { name: 'Navisworks', type: 'Clash Detection' }
                ].map((tool, index) => (
                  <div key={index} className="text-left">
                    <h4 className="font-bold text-[#2C3E50]">{tool.name}</h4>
                    <p className="text-sm text-gray-600">{tool.type}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#3498DB] to-[#2C3E50] rounded-2xl p-8 text-white">
                <div className="text-5xl font-bold mb-2">100+</div>
                <p className="opacity-90">Plants Designed</p>
              </div>
              <div className="bg-gradient-to-br from-[#00C9C9] to-[#005F73] rounded-2xl p-8 text-white">
                <div className="text-5xl font-bold mb-2">500+</div>
                <p className="opacity-90">MLD Capacity</p>
              </div>
              <div className="bg-gradient-to-br from-[#005F73] to-[#2C3E50] rounded-2xl p-8 text-white">
                <div className="text-5xl font-bold mb-2">15+</div>
                <p className="opacity-90">Years Experience</p>
              </div>
              <div className="bg-gradient-to-br from-[#2C3E50] to-[#005F73] rounded-2xl p-8 text-white">
                <div className="text-5xl font-bold mb-2">98%</div>
                <p className="opacity-90">On-Time Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#3498DB] to-[#005F73] text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Bring Your Project to Life?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-lg opacity-90">
            Our detailed engineering services ensure your project is designed for optimal performance, 
            efficiency, and long-term reliability.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-[#005F73] hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-colors"
            >
              Start Your Project
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold border-2 border-white transition-colors"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}