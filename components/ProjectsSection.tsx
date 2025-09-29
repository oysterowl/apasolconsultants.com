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
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#00C9C9] hover:shadow-xl transition-all duration-300">
        {/* Header Section */}
        <div className="relative h-48 bg-gradient-to-br from-[#005F73] to-[#00C9C9]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />

          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/20">
              {type}
            </span>
            <span className="bg-white text-[#005F73] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
              {year}
            </span>
          </div>

          {/* Capacity */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-1">{capacity}</div>
              <div className="text-white/80 text-xs font-semibold uppercase tracking-wide">Capacity</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#005F73] transition-colors">
            {name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00C9C9]/10 rounded-lg flex items-center justify-center">
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

            <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs font-semibold text-green-700">Completed</span>
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

    </section>
  );
}