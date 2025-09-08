'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function StormwaterSectorPage() {
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
              Stormwater Management
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Integrated stormwater solutions that prevent flooding, improve water quality, 
              and enhance urban resilience through sustainable drainage systems.
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
              <p className="text-gray-600 mt-2">Drainage Projects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">1000+</p>
              <p className="text-gray-600 mt-2">Km Networks</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">85%</p>
              <p className="text-gray-600 mt-2">Flood Reduction</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">30%</p>
              <p className="text-gray-600 mt-2">Runoff Harvested</p>
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
                Sustainable Drainage
              </p>
              <h2 className="text-4xl font-bold text-[#2C3E50] mb-6">
                Managing Stormwater as a Resource
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Our stormwater management solutions go beyond conventional drainage. 
                  We design systems that reduce flood risk, improve water quality, 
                  and create opportunities for water harvesting and groundwater recharge.
                </p>
                <p className="leading-relaxed">
                  By integrating green infrastructure with engineered solutions, 
                  we help cities adapt to climate change while enhancing urban livability.
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
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-3xl flex items-center justify-center">
                <svg className="w-48 h-48 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.343 4.938A7.975 7.975 0 0 0 4 10.5C4 14.09 6.91 17 10.5 17c.524 0 1.032-.067 1.518-.186.59 1.808 2.285 3.109 4.282 3.109 2.49 0 4.5-2.021 4.5-4.522 0-.522-.085-1.023-.244-1.492A4.481 4.481 0 0 0 22 10.5c0-2.49-2.01-4.5-4.5-4.5-.524 0-1.023.085-1.492.244A4.491 4.491 0 0 0 12.5 4a4.481 4.481 0 0 0-3.409 1.562A7.965 7.965 0 0 0 10.5 5.5c0-.189-.015-.376-.03-.562A7.975 7.975 0 0 0 6.343 4.938z"/>
                </svg>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00C9C9]/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              Our Solutions
            </p>
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Comprehensive Stormwater Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Solution 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#00C9C9]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Master Planning</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive drainage master plans for sustainable urban development.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Hydrological modeling
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Flood risk mapping
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Infrastructure planning
                </li>
              </ul>
            </div>

            {/* Solution 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#005F73]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Green Infrastructure</h3>
              <p className="text-gray-600 mb-4">
                Nature-based solutions for sustainable stormwater management.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Rain gardens
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Bioswales
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Permeable pavements
                </li>
              </ul>
            </div>

            {/* Solution 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#00C9C9]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Detention Systems</h3>
              <p className="text-gray-600 mb-4">
                Storage solutions to manage peak flows and prevent flooding.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Detention basins
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Underground storage
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Retention ponds
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
              Multiple Benefits of Modern Stormwater Management
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Flood Protection</h3>
              <p className="text-gray-600">Reduce flood risk and protect communities</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00C9C9] to-[#005F73] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Water Quality</h3>
              <p className="text-gray-600">Improve runoff quality before discharge</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Groundwater Recharge</h3>
              <p className="text-gray-600">Replenish aquifers naturally</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00C9C9] to-[#005F73] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Urban Amenity</h3>
              <p className="text-gray-600">Create attractive green spaces</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Build Climate-Resilient Cities</h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Partner with us to create sustainable stormwater solutions for your community
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-[#005F73] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Your Project
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