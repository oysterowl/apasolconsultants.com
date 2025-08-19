'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
  name: string;
  location: string;
  capacity: string;
  type: string;
  year: string;
  delay: number;
}

function ProjectCard({ name, location, capacity, type, year, delay }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={ref}
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        {/* Premium Gradient Background */}
        <div className="relative h-64 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br from-[#005F73] via-[#007A8F] to-[#00C9C9] transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}>
            {/* Animated Pattern Overlay */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.15) 35px, rgba(255,255,255,.15) 70px)`,
                animation: 'slide 20s linear infinite'
              }}></div>
            </div>
            
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-t from-[#00C9C9]/30 to-transparent transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}></div>
          </div>
          
          {/* Top Badge */}
          <div className="absolute top-6 left-6 right-6">
            <div className="flex items-center justify-between">
              <div className={`bg-white/10 backdrop-blur-md rounded-2xl px-5 py-2.5 border border-white/20 transition-all duration-300 ${
                isHovered ? 'bg-white/20 scale-105' : ''
              }`}>
                <p className="text-white text-xs font-semibold uppercase tracking-wider">{type}</p>
              </div>
              <div className={`bg-white backdrop-blur-sm rounded-2xl px-4 py-2 shadow-xl transition-all duration-300 ${
                isHovered ? 'scale-105 shadow-2xl' : ''
              }`}>
                <p className="text-[#005F73] text-sm font-bold">{year}</p>
              </div>
            </div>
          </div>
          
          {/* Capacity Display - Centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`text-center transition-all duration-500 ${
              isHovered ? 'transform scale-110' : ''
            }`}>
              <h3 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">{capacity}</h3>
              <p className="text-white/90 text-sm font-medium uppercase tracking-wider">Capacity</p>
            </div>
          </div>

          {/* Bottom Gradient for better text visibility */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        
        {/* Content - Improved Layout */}
        <div className="p-6">
          <h3 className={`text-xl font-bold text-[#2C3E50] mb-3 transition-colors duration-300 ${
            isHovered ? 'text-[#005F73]' : ''
          }`}>
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-xl bg-[#00C9C9]/10 flex items-center justify-center mr-3 transition-all duration-300 ${
                isHovered ? 'bg-[#00C9C9]/20 scale-110' : ''
              }`}>
                <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">{location}</p>
                <p className="text-xs text-gray-500">Location</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className={`flex items-center px-3 py-1.5 rounded-full transition-all duration-300 ${
                isHovered ? 'bg-green-50 scale-105' : 'bg-gray-50'
              }`}>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs text-gray-600 font-semibold">Completed</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hover Border Glow */}
        <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-500 ${
          isHovered ? 'shadow-[inset_0_0_20px_rgba(0,201,201,0.3)]' : ''
        }`}></div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" id="projects">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">Portfolio</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">Recent Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Delivering excellence across India&apos;s water infrastructure with cutting-edge engineering solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ProjectCard
            name="Rishikesh STP"
            location="Uttarakhand"
            capacity="26 MLD"
            type="Sewage Treatment"
            year="2023"
            delay={0}
          />
          <ProjectCard
            name="Jamshedpur WTP"
            location="Jharkhand"
            capacity="60 MLD"
            type="Water Treatment"
            year="2023"
            delay={100}
          />
          <ProjectCard
            name="Hassan Multi-Village"
            location="Karnataka"
            capacity="45 MLD"
            type="Water Supply"
            year="2024"
            delay={200}
          />
        </div>

        {/* View All Projects CTA */}
        <div className="text-center">
          <Link href="/projects" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#005F73] to-[#007A8F] text-white rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            View All Projects
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(70px);
          }
        }
      `}</style>
    </section>
  );
}