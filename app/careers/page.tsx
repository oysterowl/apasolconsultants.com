'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
}

const positions: JobPosition[] = [
  {
    id: 1,
    title: "Senior Design Engineer - Water Treatment",
    department: "Engineering",
    location: "New Delhi",
    type: "Full-time",
    experience: "5-8 years",
    description: "Lead design and engineering of water treatment plants and distribution systems.",
    requirements: [
      "B.E/B.Tech in Civil/Environmental Engineering",
      "5+ years experience in WTP design",
      "Proficiency in WaterGEMS, AutoCAD",
      "Experience with DPR preparation"
    ]
  },
  {
    id: 2,
    title: "Project Manager - Wastewater",
    department: "Project Management",
    location: "New Delhi / Remote",
    type: "Full-time",
    experience: "8-12 years",
    description: "Manage large-scale wastewater treatment projects from conception to commissioning.",
    requirements: [
      "M.Tech in Environmental Engineering preferred",
      "8+ years in wastewater project management",
      "Experience with EPC/HAM projects",
      "Strong client management skills"
    ]
  },
  {
    id: 3,
    title: "SCADA Engineer",
    department: "Instrumentation",
    location: "New Delhi",
    type: "Full-time",
    experience: "3-5 years",
    description: "Design and implement SCADA systems for water and wastewater treatment facilities.",
    requirements: [
      "B.E in Instrumentation/Electronics",
      "Experience with PLC programming",
      "Knowledge of SCADA software platforms",
      "Understanding of water treatment processes"
    ]
  }
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="pt-32 pb-12 px-6 lg:px-12 bg-gradient-to-br from-[#005F73] to-[#00C9C9]">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Be part of a dynamic team shaping India's water infrastructure future. 
              We offer challenging projects, continuous learning, and career growth opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-8">Current Openings</h2>
              
              <div className="space-y-6">
                {positions.map((position) => (
                  <div key={position.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{position.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="text-gray-600">
                            <span className="font-semibold">Department:</span> {position.department}
                          </span>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-600">{position.location}</span>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-600">{position.experience}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[#00C9C9] text-white rounded-full text-xs font-semibold">
                        {position.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{position.description}</p>
                    
                    <button
                      onClick={() => setSelectedJob(position)}
                      className="text-[#005F73] font-semibold hover:text-[#00C9C9] transition-colors"
                    >
                      View Details →
                    </button>
                  </div>
                ))}
              </div>

              {positions.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center">
                  <p className="text-gray-600">No open positions at the moment. Please check back later.</p>
                </div>
              )}
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-24">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Why Join Apasol?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">Work on large-scale infrastructure projects</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">Continuous learning and skill development</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">Competitive compensation and benefits</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">Collaborative and innovative work culture</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">Opportunity to impact communities</span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold text-[#2C3E50] mb-3">Send Your Resume</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Interested in joining our team? Send your resume to:
                  </p>
                  <a href="mailto:careers@apasolconsultants.com" className="text-[#00C9C9] font-semibold text-sm hover:underline">
                    careers@apasolconsultants.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2C3E50] mb-2">{selectedJob.title}</h2>
                  <p className="text-gray-600">{selectedJob.department} • {selectedJob.location}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-[#005F73] mb-2">Job Description</h3>
                <p className="text-gray-600">{selectedJob.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-[#005F73] mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <a
                  href={`mailto:careers@apasolconsultants.com?subject=Application for ${selectedJob.title}`}
                  className="bg-[#00C9C9] text-white px-6 py-3 rounded-full hover:bg-[#00B5B5] transition-all font-semibold"
                >
                  Apply Now
                </a>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}