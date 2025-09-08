'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function MunicipalSectorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#005F73] via-[#007A8A] to-[#00C9C9]">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <Link 
              href="/sectors" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 group"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Sectors
            </Link>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Municipal Water Infrastructure
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Comprehensive water solutions for urban communities, ensuring safe, reliable, 
              and sustainable water supply and sanitation services for millions of citizens.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">50+</p>
              <p className="text-gray-600 mt-2">Cities Served</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">10M+</p>
              <p className="text-gray-600 mt-2">Population Benefited</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">500+</p>
              <p className="text-gray-600 mt-2">MLD Capacity</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">95%</p>
              <p className="text-gray-600 mt-2">Service Coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
                Urban Water Solutions
              </p>
              <h2 className="text-4xl font-bold text-[#2C3E50] mb-6">
                Building Resilient Water Infrastructure for Cities
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Our municipal water infrastructure solutions address the complex challenges 
                  of urban water management, from source to tap and beyond. We design systems 
                  that not only meet today&apos;s demands but are ready for tomorrow&apos;s growth.
                </p>
                <p className="leading-relaxed">
                  With expertise spanning water treatment, distribution networks, and smart 
                  water management, we help cities achieve water security while optimizing 
                  operational efficiency and reducing environmental impact.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center bg-[#00C9C9] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00B5B5] transition-colors"
                >
                  Start Your Project
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/projects" 
                  className="inline-flex items-center text-[#005F73] border-2 border-[#005F73] px-6 py-3 rounded-full font-semibold hover:bg-[#005F73] hover:text-white transition-colors"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-3xl flex items-center justify-center">
                <svg className="w-48 h-48 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V2h-2v1H8V2H6v1H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z"/>
                </svg>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00C9C9]/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              What We Offer
            </p>
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Comprehensive Municipal Water Services
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              From planning to implementation, we provide end-to-end solutions for urban water infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#00C9C9]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Water Treatment Plants</h3>
              <p className="text-gray-600 mb-4">
                State-of-the-art WTP design with advanced treatment processes ensuring 
                safe drinking water that meets all quality standards.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Conventional & advanced treatment
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Automation & SCADA systems
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Energy-efficient design
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#005F73]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Distribution Networks</h3>
              <p className="text-gray-600 mb-4">
                Optimized water distribution systems designed for efficiency, reliability, 
                and minimal water loss throughout the network.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Hydraulic modeling & design
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  DMA implementation
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  24x7 water supply design
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#00C9C9]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Smart Water Systems</h3>
              <p className="text-gray-600 mb-4">
                Digital transformation solutions including smart meters, IoT sensors, 
                and data analytics for efficient water management.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AMR/AMI implementation
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time monitoring
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Predictive analytics
                </li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#005F73]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">NRW Management</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive Non-Revenue Water reduction programs to minimize water 
                losses and improve financial sustainability.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Leak detection & repair
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pressure management
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Water audit & balancing
                </li>
              </ul>
            </div>

            {/* Service 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#00C9C9]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Pumping Stations</h3>
              <p className="text-gray-600 mb-4">
                Energy-efficient pumping station design with automation, ensuring 
                reliable water supply across varying terrain and demands.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  VFD & soft starter systems
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Surge protection design
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Remote monitoring
                </li>
              </ul>
            </div>

            {/* Service 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#005F73]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Water Quality Assurance</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive water quality monitoring and management systems ensuring 
                safe water from source to consumer.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Online monitoring systems
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Laboratory design
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Compliance management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Project Lifecycle */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              Our Approach
            </p>
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              End-to-End Project Delivery
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We manage every aspect of your municipal water project from initial planning to commissioning
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#005F73] via-[#00C9C9] to-[#005F73]"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                <div className="relative flex items-start">
                  <div className="absolute left-8 w-4 h-4 bg-white border-4 border-[#005F73] rounded-full -translate-x-1/2"></div>
                  <div className="ml-20">
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Feasibility Study & Planning</h3>
                    <p className="text-gray-600">
                      Comprehensive assessment of water sources, demand projections, and technical-economic 
                      feasibility to develop optimal solutions.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="absolute left-8 w-4 h-4 bg-white border-4 border-[#00C9C9] rounded-full -translate-x-1/2"></div>
                  <div className="ml-20">
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Detailed Design & Engineering</h3>
                    <p className="text-gray-600">
                      Complete engineering design including hydraulic modeling, structural design, and 
                      preparation of tender documents.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="absolute left-8 w-4 h-4 bg-white border-4 border-[#005F73] rounded-full -translate-x-1/2"></div>
                  <div className="ml-20">
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Procurement Support</h3>
                    <p className="text-gray-600">
                      Assistance in vendor evaluation, bid analysis, and procurement of equipment 
                      and materials meeting project specifications.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="absolute left-8 w-4 h-4 bg-white border-4 border-[#00C9C9] rounded-full -translate-x-1/2"></div>
                  <div className="ml-20">
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Construction Management</h3>
                    <p className="text-gray-600">
                      Quality supervision during construction, ensuring adherence to design specifications 
                      and project timelines.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="absolute left-8 w-4 h-4 bg-white border-4 border-[#005F73] rounded-full -translate-x-1/2"></div>
                  <div className="ml-20">
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Commissioning & O&M</h3>
                    <p className="text-gray-600">
                      System commissioning, performance testing, operator training, and ongoing 
                      operations & maintenance support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              Innovation
            </p>
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Advanced Technologies We Deploy
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-2">IoT Sensors</h3>
              <p className="text-sm text-gray-100">
                Real-time monitoring of water quality, flow, and pressure throughout the network
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#00C9C9] to-[#005F73] text-white p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-2">SCADA Systems</h3>
              <p className="text-sm text-gray-100">
                Centralized control and automation for efficient plant and network operations
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-2">GIS Mapping</h3>
              <p className="text-sm text-gray-100">
                Digital asset management and spatial analysis for informed decision-making
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#00C9C9] to-[#005F73] text-white p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-2">AI Analytics</h3>
              <p className="text-sm text-gray-100">
                Predictive maintenance and demand forecasting using machine learning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your City&apos;s Water Infrastructure?</h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Partner with us to create sustainable water solutions that serve your community for generations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-[#005F73] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Your Project
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/sectors"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#005F73] transition-all"
            >
              Explore Other Sectors
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}