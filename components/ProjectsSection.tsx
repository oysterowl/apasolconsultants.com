'use client';

import { useEffect, useRef, useState } from 'react';
import Button from './Button';

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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const element = cardRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={`relative transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card Container */}
      <div 
        className="relative h-full bg-white shadow-lg"
        style={{
          borderRadius: '20px',
          transform: isHovered ? 'translateY(-12px)' : 'translateY(0px)',
          boxShadow: isHovered 
            ? '0 30px 60px -15px rgba(0, 95, 115, 0.3)' 
            : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          overflow: 'hidden'
        }}
      >
        {/* Gradient Header Section */}
        <div className="relative h-64 overflow-hidden">
          {/* Animated Background */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#005F73] via-[#007A8F] to-[#00C9C9]"
            style={{
              transform: isHovered ? 'rotate(1deg)' : 'rotate(0deg)',
              transition: 'transform 0.7s ease-out'
            }}
          >
            {/* Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 80px)',
                transform: isHovered ? 'translateX(10px)' : 'translateX(0px)',
                transition: 'transform 20s linear'
              }}
            />
            
            {/* Shine Effect */}
            <div 
              className="absolute inset-0 opacity-0"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
                transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                opacity: isHovered ? 1 : 0,
                transition: 'transform 0.6s ease-out, opacity 0.3s ease-out'
              }}
            />
          </div>

          {/* Floating Badges */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
            <div 
              className="bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20"
              style={{
                borderRadius: '12px',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0px)',
                transition: 'transform 0.3s ease-out'
              }}
            >
              <p className="text-white text-xs font-bold uppercase tracking-wider">{type}</p>
            </div>
            <div 
              className="bg-white shadow-lg px-4 py-2"
              style={{
                borderRadius: '12px',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0px)',
                transition: 'transform 0.3s ease-out'
              }}
            >
              <p className="text-[#005F73] text-sm font-bold">{year}</p>
            </div>
          </div>

          {/* Capacity Hero */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="text-center"
              style={{
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0px)',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <h3 className="text-6xl font-bold text-white mb-2 drop-shadow-2xl">{capacity}</h3>
              <p className="text-white/80 text-sm font-semibold uppercase tracking-widest">Capacity</p>
            </div>
          </div>

          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-6 relative z-10">
          <h3 
            className="text-xl font-bold text-[#2C3E50] mb-4"
            style={{
              transform: isHovered ? 'translateX(4px)' : 'translateX(0px)',
              transition: 'transform 0.3s ease-out'
            }}
          >
            {name}
          </h3>
          
          <div className="flex items-center justify-between">
            {/* Location */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 bg-[#00C9C9]/10 flex items-center justify-center"
                style={{
                  borderRadius: '10px',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0px)',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{location}</p>
                <p className="text-xs text-gray-500">Location</p>
              </div>
            </div>

            {/* Status Badge */}
            <div 
              className="flex items-center px-3 py-1.5 bg-green-50"
              style={{
                borderRadius: '20px',
                opacity: isHovered ? '1' : '0.9',
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              <span className="text-xs font-semibold text-green-700">Completed</span>
            </div>
          </div>
        </div>

        {/* Inner Glow Effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: '20px',
            boxShadow: isHovered ? 'inset 0 0 30px rgba(0, 201, 201, 0.2)' : 'inset 0 0 0px rgba(0, 201, 201, 0)',
            transition: 'all 0.4s ease-out'
          }}
        />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white" id="projects">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-[#00C9C9] font-semibold mb-3 tracking-wide uppercase text-sm">Portfolio</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">Recent Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Delivering excellence across India&apos;s water infrastructure with cutting-edge engineering solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
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
          <Button 
            href="/projects" 
            variant="primary"
            size="lg"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            }
          >
            View All Projects
          </Button>
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