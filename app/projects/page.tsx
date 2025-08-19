'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

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
  
  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="pt-32 pb-12 px-6 lg:px-12 bg-gradient-to-br from-[#005F73] to-[#00C9C9]">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Delivering excellence in water infrastructure projects across India with 
              over ₹2000 crores worth of engineering solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-[#005F73] text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === 'completed' 
                  ? 'bg-[#005F73] text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Completed ({projects.filter(p => p.status === 'completed').length})
            </button>
            <button
              onClick={() => setFilter('ongoing')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === 'ongoing' 
                  ? 'bg-[#005F73] text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Ongoing ({projects.filter(p => p.status === 'ongoing').length})
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group relative overflow-hidden">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Premium Gradient Background */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#005F73] via-[#007A8F] to-[#00C9C9]">
                      {/* Animated Pattern Overlay */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
                          animation: 'slide 20s linear infinite'
                        }}></div>
                      </div>
                    </div>
                    
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-between">
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
                          <p className="text-white/90 text-xs font-medium uppercase tracking-wider">{project.type}</p>
                        </div>
                        <div className={`backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg ${
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
                    
                    {/* Capacity Display */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="transform transition-transform duration-500 group-hover:scale-105">
                        <h3 className="text-4xl font-bold text-white mb-1">{project.capacity}</h3>
                        <p className="text-white/80 text-sm font-medium">Treatment Capacity</p>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2 group-hover:text-[#005F73] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-1.5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm font-medium">{project.location}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{project.year}</p>
                        <p className="font-bold text-[#005F73]">{project.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

      <Footer />
    </div>
  );
}