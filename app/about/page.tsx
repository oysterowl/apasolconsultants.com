'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="pt-32 pb-12 px-6 lg:px-12 bg-gradient-to-br from-[#005F73] to-[#00C9C9]">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              About Apasol
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Engineering water solutions with expertise, innovation, and commitment to 
              sustainable infrastructure development across India.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                Engineering Excellence Since 2020
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Apasol Consultants & Engineers Pvt Ltd, established in 2020, has rapidly emerged as a 
                trusted name in water and wastewater engineering consultancy. The name 'Apasol' is 
                derived from 'Apas' meaning 'Waters' in Sanskrit, reflecting our deep commitment to 
                water resource management and sustainable solutions.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Founded by Anil Kumar Maddipatla, who brings over 15 years of extensive experience 
                in the water sector, our company has successfully delivered engineering solutions 
                for projects worth over ₹2000 crores across multiple states in India.
              </p>
            </div>
            <div className={`bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl h-96 flex items-center justify-center transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <div className="text-white text-center p-8">
                <h3 className="text-5xl font-bold mb-4">APASOL</h3>
                <p className="text-lg opacity-90">Waters • Engineering • Solutions</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-14 h-14 bg-[#00C9C9]/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver integrated, viable, and sustainable engineering solutions for water and 
                wastewater infrastructure, contributing to the development of resilient communities 
                and industries across India.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-14 h-14 bg-[#005F73]/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading engineering consultancy in water and wastewater sector, recognized 
                for technical excellence, innovative solutions, and commitment to environmental 
                sustainability.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00C9C9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#2C3E50] mb-2">Excellence</h4>
                <p className="text-gray-600 text-sm">Delivering highest quality engineering solutions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#3498DB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#2C3E50] mb-2">Innovation</h4>
                <p className="text-gray-600 text-sm">Embracing cutting-edge technologies</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#27AE60] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#2C3E50] mb-2">Sustainability</h4>
                <p className="text-gray-600 text-sm">Environmental responsibility in every project</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#005F73] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#2C3E50] mb-2">Integrity</h4>
                <p className="text-gray-600 text-sm">Transparent and ethical business practices</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">Leadership</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto">
              <div className="p-8">
                <div className="flex items-start">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-xl flex items-center justify-center text-white text-4xl font-bold mr-8">
                    AKM
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">Anil Kumar Maddipatla</h3>
                    <p className="text-[#00C9C9] font-semibold mb-4">Founder & Director</p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      With over 15 years of specialized experience in water and wastewater engineering, 
                      Anil Kumar has been instrumental in designing and executing major infrastructure 
                      projects across India. His expertise spans hydraulic modeling, treatment plant 
                      design, and project management.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        M.Tech Environmental Engineering
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        15+ Years Experience
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        50+ Projects Led
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}