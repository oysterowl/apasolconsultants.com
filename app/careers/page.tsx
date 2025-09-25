'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Button from '@/components/Button';
import Link from 'next/link';
import { useState } from 'react';
import CTASection from '@/components/CTASection';

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
        <Link
          href="#openings"
          className="inline-flex items-center bg-white text-[#005F73] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
        >
          View Open Positions
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </PageHero>

      {/* Why Join APASOL - Combined Section */}
      <section id="culture" className="py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
              Why Join APASOL?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Be part of a mission that matters. Shape India's water future while building your career.
            </p>
          </div>

          {/* Alternating Content Blocks */}
          <div className="space-y-24 lg:space-y-32">
            {/* Block 1: Build the Future */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#005F73] mb-6">
                  Create Lasting Impact
                </h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Every project you work on directly affects millions of lives. From designing water treatment plants that serve entire cities to implementing rural water security programs, your work creates tangible change.
                  </p>
                  <p>
                    We're not just engineering infrastructure – we're engineering hope, health, and prosperity for generations to come.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="relative h-[350px] bg-gradient-to-br from-[#005F73] via-[#007A8F] to-[#00C9C9] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                      <div className="text-6xl font-bold mb-2">50M+</div>
                      <div className="text-lg">Lives Impacted</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Excellence in Engineering */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 lg:col-start-8 lg:order-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#005F73] mb-6">
                  Work with the Best
                </h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Join a team of India's finest water engineers, environmental scientists, and technology innovators. Learn from experts who've designed landmark projects and pioneered new methodologies.
                  </p>
                  <p>
                    Our culture of mentorship ensures you're always growing, whether you're a fresh graduate or a seasoned professional looking for new challenges.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-1 lg:order-1">
                <div className="relative h-[350px] bg-gradient-to-br from-[#0077BE] via-[#00A8CC] to-[#00C9FF] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                      <div className="text-6xl font-bold mb-2">200+</div>
                      <div className="text-lg">Expert Engineers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Block 3: Innovation & Growth */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#005F73] mb-6">
                  Pioneer Tomorrow's Solutions
                </h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Be at the forefront of water technology innovation. We're integrating IoT sensors, AI-driven optimization, and sustainable engineering practices to solve challenges that haven't been solved before.
                  </p>
                  <p>
                    With continuous learning programs, conference participation, and R&D opportunities, your career growth is limited only by your ambition.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="relative h-[350px] bg-gradient-to-br from-[#60A5FA] to-[#DBEAFE] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[#005F73] text-center p-8">
                      <div className="text-6xl font-bold mb-2">15+</div>
                      <div className="text-lg">Years of Innovation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid - Simplified */}
          <div className="mt-32 pt-20 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-[#2C3E50] text-center mb-12">
              Beyond the Work
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <h4 className="font-semibold text-[#005F73] mb-2">Competitive Compensation</h4>
                <p className="text-sm text-gray-600">Industry-leading packages that recognize your value</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#005F73] mb-2">Health & Wellness</h4>
                <p className="text-sm text-gray-600">Comprehensive coverage for you and your family</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#005F73] mb-2">Learning & Development</h4>
                <p className="text-sm text-gray-600">Conference sponsorships and skill enhancement programs</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#005F73] mb-2">Work-Life Balance</h4>
                <p className="text-sm text-gray-600">Flexible arrangements that respect your personal time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Images Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
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
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <CTASection
            title="Ready to Make an Impact?"
            description="Join us in creating sustainable water solutions that transform communities. Email us at: careers@apasolconsultants.com"
            primaryButtonText="Send Your Resume"
            primaryButtonHref="mailto:careers@apasolconsultants.com"
          />
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