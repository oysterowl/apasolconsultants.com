'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SectorsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-32" id="sectors">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">
            Industries We Serve
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
            Our Sectors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Delivering specialized water and wastewater solutions across diverse sectors with expertise and innovation
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Municipal - Large Card */}
          <Link
            href="/sectors/municipal"
            className="group lg:col-span-2 lg:row-span-2"
            onMouseEnter={() => setHoveredCard('municipal')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative h-full min-h-[400px] bg-gradient-to-br from-[#005F73] to-[#007A8A] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
              
              <div className="relative h-full p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Municipal Water Infrastructure</h3>
                  <p className="text-white/80 text-lg mb-6">End-to-end solutions for urban water supply and sanitation systems. We design resilient infrastructure that serves communities efficiently.</p>
                </div>
                
                <div>
                  <div className="flex gap-8 mb-6">
                    <div className="text-white">
                      <p className="text-3xl font-bold">50+</p>
                      <p className="text-sm text-white/70">Cities Served</p>
                    </div>
                    <div className="text-white">
                      <p className="text-3xl font-bold">10M+</p>
                      <p className="text-sm text-white/70">Population</p>
                    </div>
                  </div>
                  <div className="flex items-center text-white font-semibold">
                    <span className="group-hover:mr-3 transition-all">Explore Municipal Solutions</span>
                    <svg className="w-6 h-6 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Wastewater - Medium Card */}
          <Link
            href="/sectors/wastewater"
            className="group lg:col-span-2"
            onMouseEnter={() => setHoveredCard('wastewater')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative h-full min-h-[190px] bg-gradient-to-br from-[#007A8A] to-[#00A0A0] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }} />
              
              <div className="relative h-full p-6 flex">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Wastewater Management</h3>
                  <p className="text-white/80 text-sm line-clamp-2">Comprehensive wastewater solutions from collection to treatment and disposal, focusing on sustainability and resource recovery.</p>
                </div>
                <div className="ml-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white transform group-hover:translate-x-2 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Industrial - Small Card */}
          <Link
            href="/sectors/industrial"
            className="group"
            onMouseEnter={() => setHoveredCard('industrial')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative h-full min-h-[190px] bg-gradient-to-br from-[#00A0A0] to-[#00C9C9] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '25px 25px',
              }} />
              
              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Industrial Water</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <p className="text-2xl font-bold">200+</p>
                    <p className="text-xs text-white/70">Industries Served</p>
                  </div>
                  <svg className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Rural - Small Card */}
          <Link
            href="/sectors/rural"
            className="group"
            onMouseEnter={() => setHoveredCard('rural')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative h-full min-h-[190px] bg-gradient-to-br from-[#005F73] to-[#007A8A] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '25px 25px',
              }} />
              
              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Rural Water</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <p className="text-2xl font-bold">1M+</p>
                    <p className="text-xs text-white/70">Beneficiaries</p>
                  </div>
                  <svg className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Stormwater - Medium Wide Card */}
          <Link
            href="/sectors/stormwater"
            className="group lg:col-span-2"
            onMouseEnter={() => setHoveredCard('stormwater')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative h-full min-h-[190px] bg-gradient-to-br from-[#007A8A] to-[#00A0A0] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }} />
              
              <div className="relative h-full p-6 flex">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Stormwater Management</h3>
                  <p className="text-white/80 text-sm line-clamp-2">Integrated stormwater solutions that prevent flooding while promoting groundwater recharge.</p>
                </div>
                <div className="ml-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white transform group-hover:translate-x-2 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Smart Water - Large Card */}
          <Link
            href="/sectors/smart-water"
            className="group lg:col-span-2"
            onMouseEnter={() => setHoveredCard('smart-water')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative h-full min-h-[190px] bg-gradient-to-br from-[#00A0A0] to-[#00C9C9] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }} />
              
              <div className="relative h-full p-6 lg:p-8">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" 
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Smart Water Management</h3>
                    <p className="text-white/80">Digital transformation of water infrastructure through IoT, AI, and data analytics.</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-6">
                      <div className="text-white">
                        <p className="text-xl font-bold">30+</p>
                        <p className="text-xs text-white/70">Systems</p>
                      </div>
                      <div className="text-white">
                        <p className="text-xl font-bold">1M+</p>
                        <p className="text-xs text-white/70">Data Points/Day</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white transform group-hover:translate-x-2 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <Link 
            href="/sectors" 
            className="inline-flex items-center text-[#00C9C9] hover:text-[#005F73] font-semibold transition-colors group"
          >
            View All Sectors
            <svg 
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}