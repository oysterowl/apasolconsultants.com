'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Button from '@/components/Button';
import Link from 'next/link';
import { useState } from 'react';

interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities?: string[];
}

const positions: JobPosition[] = [
  {
    id: 1,
    title: "Senior Design Engineer - Water Treatment",
    department: "Engineering",
    location: "New Delhi",
    type: "Full-time",
    experience: "5-8 years",
    description: "Lead design and engineering of water treatment plants and distribution systems for large-scale infrastructure projects across India.",
    requirements: [
      "B.E/B.Tech in Civil/Environmental Engineering",
      "5+ years experience in WTP design",
      "Proficiency in WaterGEMS, AutoCAD",
      "Experience with DPR preparation"
    ],
    responsibilities: [
      "Design water treatment plants with capacity ranging from 10-500 MLD",
      "Prepare detailed engineering drawings and technical specifications",
      "Coordinate with multidisciplinary teams for project execution",
      "Conduct feasibility studies and technical evaluations"
    ]
  },
  {
    id: 2,
    title: "Project Manager - Wastewater",
    department: "Project Management",
    location: "New Delhi / Remote",
    type: "Full-time",
    experience: "8-12 years",
    description: "Manage large-scale wastewater treatment projects from conception to commissioning, ensuring timely delivery and quality standards.",
    requirements: [
      "M.Tech in Environmental Engineering preferred",
      "8+ years in wastewater project management",
      "Experience with EPC/HAM projects",
      "Strong client management skills"
    ],
    responsibilities: [
      "Lead project teams for wastewater infrastructure development",
      "Manage project budgets, timelines, and resources",
      "Interface with government agencies and stakeholders",
      "Ensure compliance with environmental regulations"
    ]
  },
  {
    id: 3,
    title: "SCADA Engineer",
    department: "Instrumentation",
    location: "New Delhi",
    type: "Full-time",
    experience: "3-5 years",
    description: "Design and implement SCADA systems for water and wastewater treatment facilities, enabling smart water management solutions.",
    requirements: [
      "B.E in Instrumentation/Electronics",
      "Experience with PLC programming",
      "Knowledge of SCADA software platforms",
      "Understanding of water treatment processes"
    ],
    responsibilities: [
      "Design and configure SCADA systems for water infrastructure",
      "Program PLCs and HMI interfaces",
      "Integrate IoT sensors and telemetry systems",
      "Provide technical support during commissioning"
    ]
  }
];

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Competitive Salary",
    description: "Industry-leading compensation packages"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Learning & Growth",
    description: "Continuous skill development and training opportunities"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Great Team",
    description: "Work with industry experts and passionate professionals"
  }
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");

  const departments = ["All", ...Array.from(new Set(positions.map(p => p.department)))];
  
  const filteredPositions = selectedDepartment === "All" 
    ? positions 
    : positions.filter(p => p.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        variant="secondary"
        badge="Join Our Mission"
        title="Shape the Future of Water Infrastructure"
        description="Be part of a dynamic team creating sustainable water solutions for millions. We offer challenging projects, continuous learning, and the opportunity to make a real impact."
      >
        <div className="flex flex-wrap gap-4">
          <Link
            href="#openings"
            className="inline-flex items-center bg-white text-[#005F73] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            View Open Positions
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Link>
          <a
            href="#culture"
            className="inline-flex items-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#005F73] transition-all"
          >
            Our Culture
          </a>
        </div>
      </PageHero>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">200+</p>
              <p className="text-gray-600 mt-2">Team Members</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">500+</p>
              <p className="text-gray-600 mt-2">Projects Delivered</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">15+</p>
              <p className="text-gray-600 mt-2">Years of Excellence</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#005F73]">8</p>
              <p className="text-gray-600 mt-2">States Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section id="culture" className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">Why Join APASOL?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in creating an environment where talent thrives and innovation flourishes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Culture Images */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="relative h-64 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <h3 className="text-2xl font-bold mb-2">Innovation Lab</h3>
                  <p className="text-white/80">Cutting-edge technology and research</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 bg-gradient-to-br from-[#00C9C9] to-[#005F73] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <h3 className="text-2xl font-bold mb-2">Team Building</h3>
                  <p className="text-white/80">Regular events and activities</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <h3 className="text-2xl font-bold mb-2">Learning Sessions</h3>
                  <p className="text-white/80">Continuous skill development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section id="openings" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">Current Openings</h2>
            <p className="text-xl text-gray-600">Find your perfect role and grow with us</p>
          </div>

          {/* Department Filter */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-1 shadow-sm">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  variant={selectedDepartment === dept ? 'category-active' : 'ghost'}
                  size="sm"
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredPositions.map((position) => (
              <div 
                key={position.id} 
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => setSelectedJob(position)}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#2C3E50] mb-2 group-hover:text-[#005F73] transition-colors">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {position.department}
                        </span>
                        <span className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {position.location}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-r from-[#005F73] to-[#00C9C9] text-white rounded-full text-xs font-semibold">
                      {position.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{position.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm text-gray-500">Experience: {position.experience}</span>
                    <span className="text-[#00C9C9] font-semibold flex items-center group-hover:text-[#005F73] transition-colors">
                      View Details
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPositions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No open positions in this department at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-20 bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Join us in creating sustainable water solutions that transform communities
          </p>
          <a
            href="mailto:careers@apasolconsultants.com"
            className="inline-flex items-center bg-white text-[#005F73] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Send Your Resume
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <p className="mt-6 text-white/80">
            Email us at: <span className="font-semibold">careers@apasolconsultants.com</span>
          </p>
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedJob(null)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8 lg:p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-[#2C3E50] mb-3">{selectedJob.title}</h2>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {selectedJob.department}
                    </span>
                    <span className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {selectedJob.location}
                    </span>
                    <span className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {selectedJob.experience}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedJob(null)}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-[#005F73] mb-4">About the Role</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                </div>

                {selectedJob.responsibilities && (
                  <div>
                    <h3 className="text-xl font-bold text-[#005F73] mb-4">Key Responsibilities</h3>
                    <ul className="space-y-3">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-[#00C9C9] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-[#005F73] mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-[#00C9C9] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-10 pt-8 border-t">
                <a
                  href={`mailto:careers@apasolconsultants.com?subject=Application for ${selectedJob.title}`}
                  className="inline-flex items-center bg-gradient-to-r from-[#005F73] to-[#00C9C9] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all font-semibold"
                >
                  Apply for This Position
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <Button
                  onClick={() => setSelectedJob(null)}
                  variant="secondary"
                  size="md"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}