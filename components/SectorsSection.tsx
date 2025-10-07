'use client';

import Link from 'next/link';

export default function SectorsSection() {
  return (
    <section className="py-32 bg-gray-50" id="sectors">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#26AFFF] font-semibold mb-3 tracking-wide uppercase text-sm">
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Municipal - Large Card */}
          <Link
            href="/sectors/municipal"
            className="group lg:col-span-2 lg:row-span-2"
          >
            <div className="relative h-full min-h-[400px] bg-gradient-to-br from-[#1a5fb4] via-[#26AFFF] to-[#7ec8ff] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#26AFFF]/20 transition-all duration-300">
              {/* Dot pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div className="relative h-full p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Municipal Infrastructure</h3>
                  <p className="text-white/90 text-lg mb-6 leading-relaxed">
                    End-to-end solutions for urban water supply and sanitation. Serving communities with resilient, efficient infrastructure.
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex gap-8">
                    <div className="text-white">
                      <p className="text-3xl font-bold">50+</p>
                      <p className="text-sm text-white/80">Cities</p>
                    </div>
                    <div className="text-white">
                      <p className="text-3xl font-bold">10M+</p>
                      <p className="text-sm text-white/80">Population</p>
                    </div>
                  </div>

                  <svg className="w-8 h-8 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Industrial - Medium Card */}
          <Link
            href="/sectors/industrial"
            className="group lg:col-span-2"
          >
            <div className="relative h-full min-h-[190px] bg-gradient-to-br from-[#1a5fb4] to-[#26AFFF] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#26AFFF]/15 transition-all duration-300">
              {/* Dot pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/20">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Industrial Water</h3>
                  <p className="text-white/80 text-sm">Process water, effluent treatment, and recycling systems for industries.</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <span className="text-2xl font-bold">200+</span>
                    <span className="text-xs text-white/70 ml-2">Industries</span>
                  </div>
                  <svg className="w-6 h-6 text-white/40 group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Rural - Small Card */}
          <Link
            href="/sectors/rural"
            className="group"
          >
            <div className="relative h-full min-h-[190px] bg-gradient-to-br from-[#26AFFF] to-[#0088cc] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#26AFFF]/15 transition-all duration-300">
              {/* Dot pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                  backgroundSize: '14px 14px'
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/20">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Rural Water</h3>
                  <p className="text-xs text-white/80">Village schemes</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <span className="text-xl font-bold">1M+</span>
                    <p className="text-xs text-white/70">Beneficiaries</p>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Wastewater - Small Card */}
          <Link
            href="/sectors/wastewater"
            className="group"
          >
            <div className="relative h-full min-h-[190px] bg-gradient-to-tl from-[#1a5fb4] to-[#26AFFF] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#26AFFF]/15 transition-all duration-300">
              {/* Dot pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                  backgroundSize: '14px 14px'
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/20">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Wastewater</h3>
                  <p className="text-xs text-white/80">Treatment & reuse</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <span className="text-xl font-bold">85%</span>
                    <p className="text-xs text-white/70">Recovery</p>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Stormwater - Wide Card */}
          <Link
            href="/sectors/stormwater"
            className="group lg:col-span-2"
          >
            <div className="relative h-full min-h-[190px] bg-gradient-to-r from-[#1a5fb4] to-[#26AFFF] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#26AFFF]/15 transition-all duration-300">
              {/* Dot pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/20">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Stormwater Management</h3>
                  <p className="text-white/80 text-sm">Flood prevention and groundwater recharge systems.</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <span className="text-2xl font-bold">30+</span>
                    <span className="text-xs text-white/70 ml-2">Cities Protected</span>
                  </div>
                  <svg className="w-6 h-6 text-white/40 group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Smart Water - Wide Card */}
          <Link
            href="/sectors/smart-water"
            className="group lg:col-span-2"
          >
            <div className="relative h-full min-h-[190px] bg-gradient-to-bl from-[#26AFFF] via-[#0088cc] to-[#0057FF] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#26AFFF]/15 transition-all duration-300">
              {/* Dot pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              <div className="relative h-full p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Smart Water Solutions</h3>
                  <p className="text-white/90">IoT, AI, and data analytics for intelligent water management.</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-6">
                    <div className="text-white">
                      <span className="text-xl font-bold">24/7</span>
                      <span className="text-xs text-white/70 ml-1">Monitoring</span>
                    </div>
                    <div className="text-white">
                      <span className="text-xl font-bold">40%</span>
                      <span className="text-xs text-white/70 ml-1">Less Waste</span>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-white/40 group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <Link
            href="/sectors"
            className="inline-flex items-center px-8 py-4 bg-[#0057FF] hover:bg-[#0046cc] text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-[#0057FF]/25 hover:shadow-xl hover:shadow-[#0057FF]/30"
          >
            Explore All Sectors
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