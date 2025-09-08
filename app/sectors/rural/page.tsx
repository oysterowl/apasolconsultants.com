'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function RuralSectorPage() {
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
              Rural Water Supply
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Sustainable water solutions for rural communities, ensuring equitable access 
              to safe drinking water and improved sanitation.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">200+</p>
              <p className="text-gray-600 mt-2">Villages Covered</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">1M+</p>
              <p className="text-gray-600 mt-2">Lives Impacted</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">5000+</p>
              <p className="text-gray-600 mt-2">Water Points</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">24/7</p>
              <p className="text-gray-600 mt-2">Water Availability</p>
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
                Community Focused
              </p>
              <h2 className="text-4xl font-bold text-[#2C3E50] mb-6">
                Empowering Rural Communities with Clean Water
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  We design sustainable water supply systems that respect local conditions, 
                  use appropriate technology, and ensure long-term operation through 
                  community participation.
                </p>
                <p className="leading-relaxed">
                  Our rural water solutions focus on reliability, ease of maintenance, 
                  and cost-effectiveness, bringing safe water closer to homes and 
                  transforming lives.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center bg-[#00C9C9] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00B5B5] transition-colors"
                >
                  Start a Project
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-3xl flex items-center justify-center">
                <svg className="w-48 h-48 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
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
              Appropriate Technology for Rural Areas
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Solution 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#00C9C9]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Village Water Schemes</h3>
              <p className="text-gray-600 mb-4">
                Complete water supply systems designed for village-level implementation.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Source development
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Treatment systems
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Distribution network
                </li>
              </ul>
            </div>

            {/* Solution 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#005F73]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Rainwater Harvesting</h3>
              <p className="text-gray-600 mb-4">
                Capture and storage systems for sustainable water security.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Rooftop collection
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Storage tanks
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#005F73] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Recharge structures
                </li>
              </ul>
            </div>

            {/* Solution 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#00C9C9]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Solar Water Systems</h3>
              <p className="text-gray-600 mb-4">
                Solar-powered pumping and treatment for off-grid locations.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Solar pumping
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Battery backup
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Remote monitoring
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community Engagement */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#00C9C9] font-semibold mb-4 tracking-wide uppercase text-sm">
              Our Approach
            </p>
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Community-Centered Implementation
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Participatory Planning</h3>
                <p className="text-gray-600">
                  We involve communities from the planning stage, ensuring solutions 
                  meet local needs and gain community ownership.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Capacity Building</h3>
                <p className="text-gray-600">
                  Training local operators and water committees for sustainable 
                  operation and maintenance of water systems.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Appropriate Technology</h3>
                <p className="text-gray-600">
                  Selecting technologies that are suitable for local conditions, 
                  easy to maintain, and cost-effective.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Sustainability Focus</h3>
                <p className="text-gray-600">
                  Establishing water user committees and fee collection systems 
                  for long-term financial sustainability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Partner with Us for Rural Water Development</h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Let&apos;s work together to bring safe, sustainable water to rural communities
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-[#005F73] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started
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