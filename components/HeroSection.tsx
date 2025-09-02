'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0" style={{ transform: 'scale(1.05)' }}>
        <Image 
          alt="Water infrastructure facility" 
          src="https://t4.ftcdn.net/jpg/13/12/54/07/360_F_1312540766_xhl0oOG8dSvPZlu8SYAwvetEwGuGXcuT.jpg"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 h-full flex items-center justify-center transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="container mx-auto px-6 text-center text-white">
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight mb-6">
              <span>Water Solutions</span>
              <br />
              <span className="italic font-light">Engineered Right</span>
            </h1>
          </div>

          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Specialized consultancy in water & wastewater management, delivering optimized 
              engineering solutions for sustainable infrastructure.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 flex justify-center transition-all duration-1000 delay-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="rounded-2xl block w-fit mx-6 mb-6 px-8 py-4 bg-black/24 backdrop-blur-md border border-white/20">
          <div className="flex items-center justify-center gap-8 text-white/90">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">15+</span>
                <span className="text-xs text-white/70">Years Experience</span>
              </div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">50+</span>
                <span className="text-xs text-white/70">Projects Completed</span>
              </div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">500+</span>
                <span className="text-xs text-white/70">MLD Capacity</span>
              </div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">₹2000+</span>
                <span className="text-xs text-white/70">Crores Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}