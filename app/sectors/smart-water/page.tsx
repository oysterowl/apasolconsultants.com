'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function SmartWaterSectorPage() {
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
              Smart Water Solutions
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Digital transformation of water infrastructure through IoT, AI, and data analytics 
              for efficient, reliable, and sustainable water management.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">30+</p>
              <p className="text-gray-600 mt-2">Systems Deployed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">1M+</p>
              <p className="text-gray-600 mt-2">Data Points/Day</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">25%</p>
              <p className="text-gray-600 mt-2">Water Loss Reduction</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">24/7</p>
              <p className="text-gray-600 mt-2">Real-time Monitoring</p>
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
                Digital Innovation
              </p>
              <h2 className="text-4xl font-bold text-[#2C3E50] mb-6">
                The Future of Water Management is Digital
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Our smart water solutions leverage cutting-edge technologies to transform 
                  traditional water infrastructure into intelligent, responsive systems that 
                  optimize operations and improve service delivery.
                </p>
                <p className="leading-relaxed">
                  From real-time monitoring to predictive analytics, we help water utilities 
                  make data-driven decisions that reduce costs, prevent failures, and ensure 
                  reliable water supply.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center bg-[#00C9C9] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00B5B5] transition-colors"
                >
                  Transform Your Infrastructure
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-3xl flex items-center justify-center">
                <svg className="w-48 h-48 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00C9C9]/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              Technologies
            </p>
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Cutting-Edge Smart Water Technologies
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Technology 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#00C9C9]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">IoT Sensors</h3>
              <p className="text-gray-600 mb-4">
                Network of intelligent sensors for comprehensive monitoring.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Flow & pressure sensors
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Water quality monitors
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Smart meters
                </li>
              </ul>
            </div>

            {/* Technology 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#005F73]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Data Analytics</h3>
              <p className="text-gray-600 mb-4">
                Advanced analytics for insights and decision-making.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time dashboards
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Performance metrics
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Trend analysis
                </li>
              </ul>
            </div>

            {/* Technology 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#00C9C9]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">AI & Machine Learning</h3>
              <p className="text-gray-600 mb-4">
                Intelligent algorithms for predictive insights.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Leak detection
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Demand forecasting
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Anomaly detection
                </li>
              </ul>
            </div>

            {/* Technology 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#005F73]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">SCADA Systems</h3>
              <p className="text-gray-600 mb-4">
                Centralized control and automation platforms.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Remote control
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Process automation
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Alarm management
                </li>
              </ul>
            </div>

            {/* Technology 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#00C9C9]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Cloud Platform</h3>
              <p className="text-gray-600 mb-4">
                Scalable cloud infrastructure for data management.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure data storage
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  API integration
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mobile access
                </li>
              </ul>
            </div>

            {/* Technology 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#005F73]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Mobile Solutions</h3>
              <p className="text-gray-600 mb-4">
                Mobile apps for field operations and customer service.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Field workforce app
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Customer portal
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Usage tracking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              Benefits
            </p>
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Transform Your Water Operations
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">Operational Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#00C9C9]/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50] mb-1">Reduced Water Loss</h4>
                    <p className="text-gray-600 text-sm">Early leak detection saves up to 25% water</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#00C9C9]/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50] mb-1">Improved Efficiency</h4>
                    <p className="text-gray-600 text-sm">Optimize operations and reduce energy use</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#00C9C9]/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50] mb-1">Cost Savings</h4>
                    <p className="text-gray-600 text-sm">Reduce operational costs by up to 30%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">Customer Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#005F73]/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50] mb-1">Better Service</h4>
                    <p className="text-gray-600 text-sm">Proactive issue resolution and faster response</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#005F73]/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50] mb-1">Usage Insights</h4>
                    <p className="text-gray-600 text-sm">Real-time consumption data and analytics</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#005F73]/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <svg className="w-5 h-5 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50] mb-1">Mobile Access</h4>
                    <p className="text-gray-600 text-sm">Manage accounts and report issues on-the-go</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Go Digital?</h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Transform your water infrastructure with our smart water solutions
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-[#005F73] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Today
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