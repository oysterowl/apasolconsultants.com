'use client';

import { useEffect, useRef, useState } from 'react';
import Button from './Button';

interface ProjectCardProps {
  name: string;
  location: string;
  capacity: string;
  type: string;
  year: string;
  clientType: string;
  delay: number;
}

function ProjectCard({ name, location, capacity, type, year, clientType, delay }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
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
      className={`group transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#26AFFF] hover:shadow-[0_20px_50px_rgba(38,175,255,0.3)] transition-all duration-300">
        {/* Header Section - Showcase Design */}
        <div className="relative h-64 bg-gradient-to-br from-[#1a5fb4] via-[#26AFFF] to-[#7ec8ff]">
          {/* Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 40px,
                rgba(255,255,255,0.15) 40px,
                rgba(255,255,255,0.15) 80px
              )`
            }}
          />

          {/* Type Badge - Top Left */}
          <div className="absolute top-6 left-6 z-10">
            <span className="bg-[#26AFFF]/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border border-white/30 shadow-lg">
              {type}
            </span>
          </div>

          {/* Year Badge - Top Right */}
          <div className="absolute top-6 right-6 z-10">
            <span className="bg-gradient-to-br from-white to-gray-100 text-[#0057FF] text-sm font-bold px-4 py-2 rounded-xl shadow-xl">
              {year}
            </span>
          </div>

          {/* Centered Capacity - Hero Element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-6xl font-bold text-white mb-2 drop-shadow-2xl">{capacity}</h3>
              <p className="text-white/90 text-sm font-semibold uppercase tracking-widest drop-shadow-lg">Capacity</p>
            </div>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0057FF]/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Client Type Badge and Completed Status */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block px-3 py-1 bg-[#0057FF]/5 text-[#0057FF] text-xs font-semibold rounded-md border border-[#0057FF]/20">
              {clientType}
            </span>

            {/* Completed Status */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-semibold text-green-700">Completed</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#0057FF] transition-colors">
            {name}
          </h3>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#26AFFF]/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#26AFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white" id="projects">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-[#26AFFF] font-semibold mb-3 tracking-wide uppercase text-sm">Portfolio</p>
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
            clientType="Municipal Corporation"
            delay={0}
          />
          <ProjectCard
            name="Jamshedpur WTP"
            location="Jharkhand"
            capacity="60 MLD"
            type="Water Treatment"
            year="2023"
            clientType="Government Project"
            delay={100}
          />
          <ProjectCard
            name="Hassan Multi-Village"
            location="Karnataka"
            capacity="45 MLD"
            type="Water Supply"
            year="2024"
            clientType="State Water Board"
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

    </section>
  );
}