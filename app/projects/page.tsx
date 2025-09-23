'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { useState } from 'react';
import Button from '@/components/Button';

interface Project {
  id: number;
  name: string;
  location: string;
  capacity: string;
  type: string;
  year: string;
  value: string;
  status: 'completed' | 'ongoing';
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Rishikesh STP",
    location: "Uttarakhand",
    capacity: "26 MLD",
    type: "Sewage Treatment Plant",
    year: "2023",
    value: "₹120 Crores",
    status: "completed",
    description: "Complete design and engineering for sewage treatment plant serving Rishikesh city"
  },
  {
    id: 2,
    name: "Jamshedpur WTP",
    location: "Jharkhand",
    capacity: "60 MLD",
    type: "Water Treatment Plant",
    year: "2023",
    value: "₹180 Crores",
    status: "completed",
    description: "Comprehensive water treatment facility with advanced filtration and SCADA systems"
  },
  {
    id: 3,
    name: "Hassan Multi-Village Water Supply",
    location: "Karnataka",
    capacity: "45 MLD",
    type: "Water Supply Scheme",
    year: "2024",
    value: "₹250 Crores",
    status: "ongoing",
    description: "Integrated water supply scheme covering 125 villages with distribution network"
  },
  {
    id: 4,
    name: "Varanasi Sewerage Network",
    location: "Uttar Pradesh",
    capacity: "140 MLD",
    type: "Sewerage System",
    year: "2023",
    value: "₹450 Crores",
    status: "completed",
    description: "Complete sewerage network design including trunk mains and pumping stations"
  },
  {
    id: 5,
    name: "Nagpur Storm Water Drainage",
    location: "Maharashtra",
    capacity: "N/A",
    type: "Storm Water System",
    year: "2024",
    value: "₹85 Crores",
    status: "ongoing",
    description: "Comprehensive storm water drainage system for flood mitigation"
  },
  {
    id: 6,
    name: "Bhopal Water Reuse Project",
    location: "Madhya Pradesh",
    capacity: "30 MLD",
    type: "Water Reclamation",
    year: "2023",
    value: "₹95 Crores",
    status: "completed",
    description: "Tertiary treatment and water reuse system for industrial applications"
  }
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <PageHero
        variant="primary"
        badge="Our Work"
        title="Our Projects"
        description="Delivering excellence in water infrastructure projects across India with over ₹2000 crores worth of engineering solutions."
      />

      <section className="py-16 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'filter-active' : 'filter'}
              size="sm"
            >
              All Projects ({projects.length})
            </Button>
            <Button
              onClick={() => setFilter('completed')}
              variant={filter === 'completed' ? 'filter-active' : 'filter'}
              size="sm"
            >
              Completed ({projects.filter(p => p.status === 'completed').length})
            </Button>
            <Button
              onClick={() => setFilter('ongoing')}
              variant={filter === 'ongoing' ? 'filter-active' : 'filter'}
              size="sm"
            >
              Ongoing ({projects.filter(p => p.status === 'ongoing').length})
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const isHovered = hoveredCard === project.id;
              
              return (
                <div 
                  key={project.id} 
                  className="group relative transition-all duration-700"
                  onMouseEnter={() => setHoveredCard(project.id)}
                  onMouseLeave={() => setHoveredCard(null)}
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
                      
                      {/* Top Badges */}
                      <div className="absolute top-6 left-6 right-6">
                        <div className="flex items-center justify-between">
                          <div className={`bg-white/10 backdrop-blur-md rounded-2xl px-5 py-2.5 border border-white/20 transition-all duration-300 ${
                            isHovered ? 'bg-white/20 scale-105' : ''
                          }`}>
                            <p className="text-white text-xs font-semibold uppercase tracking-wider truncate max-w-[150px]">{project.type}</p>
                          </div>
                          <div className={`backdrop-blur-sm rounded-2xl px-4 py-2 shadow-xl transition-all duration-300 ${
                            isHovered ? 'scale-105 shadow-2xl' : ''
                          } ${
                            project.status === 'completed' 
                              ? 'bg-green-500/90 text-white' 
                              : 'bg-orange-500/90 text-white'
                          }`}>
                            <p className="text-sm font-bold">
                              {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Capacity Display - Centered */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`text-center transition-all duration-500 ${
                          isHovered ? 'transform scale-110' : ''
                        }`}>
                          <h3 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">{project.capacity}</h3>
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
                        {project.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
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
                            <p className="text-sm font-semibold text-gray-700">{project.location}</p>
                            <p className="text-xs text-gray-500">{project.year}</p>
                          </div>
                        </div>
                        <div className={`text-right transition-all duration-300 ${
                          isHovered ? 'scale-105' : ''
                        }`}>
                          <p className="text-xs text-gray-500 mb-1">Project Value</p>
                          <p className="font-bold text-[#005F73]">{project.value}</p>
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
            })}
          </div>
        </div>
      </section>

      <section id="capacity" className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">Our Capacity</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Engineering expertise backed by proven track record in large-scale water infrastructure projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl p-8 text-white">
              <h3 className="text-5xl font-bold mb-3">500+</h3>
              <p className="text-lg font-semibold mb-2">MLD Treatment Capacity</p>
              <p className="text-sm opacity-90">Combined water & wastewater treatment plants designed</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#3498DB] to-[#00C9C9] rounded-2xl p-8 text-white">
              <h3 className="text-5xl font-bold mb-3">1200+</h3>
              <p className="text-lg font-semibold mb-2">KM Pipeline Network</p>
              <p className="text-sm opacity-90">Water distribution & sewerage networks engineered</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#27AE60] to-[#00C9C9] rounded-2xl p-8 text-white">
              <h3 className="text-5xl font-bold mb-3">₹2000+</h3>
              <p className="text-lg font-semibold mb-2">Crores Project Value</p>
              <p className="text-sm opacity-90">Total value of projects designed and executed</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#E74C3C] to-[#EC7063] rounded-2xl p-8 text-white">
              <h3 className="text-5xl font-bold mb-3">8+</h3>
              <p className="text-lg font-semibold mb-2">States Covered</p>
              <p className="text-sm opacity-90">Pan-India presence with diverse project portfolio</p>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">Technical Capabilities</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-[#005F73] mb-3">Design Software</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• WaterGEMS / SewerGEMS</li>
                  <li>• EPANET / SWMM</li>
                  <li>• HEC-RAS / HEC-HMS</li>
                  <li>• AutoCAD / Civil 3D</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#005F73] mb-3">Treatment Technologies</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Conventional Treatment</li>
                  <li>• MBR / MBBR Systems</li>
                  <li>• SBR Technology</li>
                  <li>• Advanced Oxidation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#005F73] mb-3">Project Types</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• EPC Contracts</li>
                  <li>• HAM Projects</li>
                  <li>• PMC Services</li>
                  <li>• DPR Preparation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <CTASection
            title="Ready to Start Your Project?"
            description="Let's discuss how our expertise can transform your water infrastructure vision into reality."
            primaryButtonText="Get Free Consultation"
            primaryButtonHref="/contact"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}