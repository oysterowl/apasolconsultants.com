'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Button from '@/components/Button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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
  },
  {
    id: 4,
    title: "Hydraulic Modelling Specialist",
    department: "Engineering",
    location: "Mumbai",
    type: "Full-time",
    experience: "4-6 years",
    description: "Develop and analyze hydraulic models for water distribution networks, flood management systems, and drainage infrastructure.",
    requirements: [
      "M.Tech in Water Resources Engineering",
      "Expertise in EPANET, MIKE Urban, InfoWorks",
      "Strong analytical and problem-solving skills",
      "Experience in GIS applications"
    ],
    responsibilities: [
      "Create hydraulic models for water distribution systems",
      "Perform surge analysis and network optimization",
      "Develop flood risk assessment models",
      "Provide technical solutions for water hammer mitigation"
    ]
  },
  {
    id: 5,
    title: "Environmental Consultant",
    department: "Environmental",
    location: "Bangalore",
    type: "Full-time",
    experience: "6-10 years",
    description: "Lead environmental impact assessments and sustainability initiatives for water infrastructure projects across multiple states.",
    requirements: [
      "M.Sc/M.Tech in Environmental Science",
      "Certified EIA Coordinator",
      "Knowledge of environmental regulations",
      "Experience with World Bank/ADB projects"
    ],
    responsibilities: [
      "Conduct Environmental Impact Assessments",
      "Develop Environmental Management Plans",
      "Ensure regulatory compliance",
      "Lead stakeholder consultation processes"
    ]
  },
  {
    id: 6,
    title: "Junior Engineer - Site Supervision",
    department: "Engineering",
    location: "Chennai",
    type: "Full-time",
    experience: "1-3 years",
    description: "Supervise construction activities at water treatment plant sites, ensuring quality control and adherence to design specifications.",
    requirements: [
      "B.E/B.Tech in Civil Engineering",
      "Basic knowledge of construction practices",
      "Good communication skills",
      "Willingness to travel"
    ],
    responsibilities: [
      "Monitor construction quality and progress",
      "Coordinate with contractors and vendors",
      "Maintain site documentation",
      "Report daily progress to project managers"
    ]
  },
  {
    id: 7,
    title: "Business Development Manager",
    department: "Business Development",
    location: "New Delhi",
    type: "Full-time",
    experience: "7-10 years",
    description: "Drive business growth by identifying new opportunities in water sector, building client relationships, and leading proposal development.",
    requirements: [
      "MBA or equivalent",
      "Strong network in water/infrastructure sector",
      "Excellent presentation skills",
      "Track record of winning large projects"
    ],
    responsibilities: [
      "Identify and pursue new business opportunities",
      "Build relationships with government and private clients",
      "Lead proposal and bid preparation",
      "Develop strategic partnerships"
    ]
  },
  {
    id: 8,
    title: "GIS Analyst",
    department: "Technology",
    location: "Hyderabad",
    type: "Full-time",
    experience: "2-4 years",
    description: "Develop GIS-based solutions for water resource management, asset mapping, and spatial analysis of water infrastructure.",
    requirements: [
      "B.Tech/M.Tech with GIS specialization",
      "Proficiency in ArcGIS, QGIS",
      "Knowledge of remote sensing",
      "Python/JavaScript programming skills"
    ],
    responsibilities: [
      "Create and maintain GIS databases",
      "Develop web-based GIS applications",
      "Perform spatial analysis for project planning",
      "Generate maps and visualizations"
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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Fixed at 5 items per page

  // Function to handle page changes with scroll to top
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to the openings section
    const openingsSection = document.getElementById('openings');
    if (openingsSection) {
      openingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const departments = ["All", ...Array.from(new Set(positions.map(p => p.department)))];

  // Highlight function for search text
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ?
            <mark key={i} className="bg-yellow-200 text-gray-900 rounded px-1">{part}</mark> :
            part
        )}
      </>
    );
  };

  const filteredPositions = positions.filter(position => {
    const matchesDepartment = selectedDepartment === "All" || position.department === selectedDepartment;
    const matchesSearch = searchQuery === "" ||
      position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.experience.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDepartment && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPositions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPositions = filteredPositions.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDepartment, searchQuery]);

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

          {/* Culture Cards */}
          <div className="mt-24">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative h-56 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center p-6">
                    <h3 className="text-xl font-bold mb-2">Innovation Lab</h3>
                    <p className="text-white/80 text-sm">Cutting-edge technology and research</p>
                  </div>
                </div>
              </div>
              <div className="relative h-56 bg-gradient-to-br from-[#0077BE] to-[#00A8CC] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center p-6">
                    <h3 className="text-xl font-bold mb-2">Team Building</h3>
                    <p className="text-white/80 text-sm">Regular events and activities</p>
                  </div>
                </div>
              </div>
              <div className="relative h-56 bg-gradient-to-br from-[#60A5FA] to-[#DBEAFE] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[#005F73] text-center p-6">
                    <h3 className="text-xl font-bold mb-2">Learning Sessions</h3>
                    <p className="text-[#005F73]/80 text-sm">Continuous skill development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid - Simplified */}
          <div className="mt-24 pt-20 border-t border-gray-200">
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


      {/* Current Openings */}
      <section id="openings" className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">
              Join our team of experts working on India's most challenging water infrastructure projects.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by role, department, location, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#00C9C9] focus:bg-white transition-all duration-200"
              />
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                Found {filteredPositions.length} {filteredPositions.length === 1 ? 'position' : 'positions'}
              </p>
            )}
          </div>

          {/* Department Filter - Same width as search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedDepartment === dept
                      ? 'bg-[#005F73] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dept}
                  {dept !== 'All' && (
                    <span className="ml-2 text-xs opacity-75">
                      ({positions.filter(p => p.department === dept).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs List - Single Column, Centered */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {paginatedPositions.map((position) => (
              <div
                key={position.id}
                className="group bg-white border border-gray-300 rounded-xl hover:border-[#00C9C9] hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedJob(position)}
              >
                <div className="p-6 lg:p-8">
                  <div className="grid lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Main Info */}
                    <div className="lg:col-span-8">
                      <h3 className="text-xl lg:text-2xl font-bold text-[#2C3E50] group-hover:text-[#005F73] transition-colors mb-3">
                        {highlightText(position.title, searchQuery)}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {highlightText(position.description, searchQuery)}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {highlightText(position.department, searchQuery)}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {highlightText(position.location, searchQuery)}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#00C9C9]/10 text-[#005F73]">
                          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {position.type}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#005F73]/10 text-[#005F73]">
                          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {highlightText(position.experience, searchQuery)}
                        </span>
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
                      <button className="inline-flex items-center text-[#005F73] font-semibold hover:text-[#00C9C9] transition-colors">
                        <span className="mr-2">View Details</span>
                        <div className="w-8 h-8 rounded-full bg-[#005F73]/10 flex items-center justify-center group-hover:bg-[#00C9C9]/10 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results State */}
          {filteredPositions.length === 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg mb-2">No positions available in this category</p>
                <p className="text-gray-500">Check back soon or explore other departments</p>
              </div>
            </div>
          )}

          {/* Pagination Controls - Bottom */}
          {filteredPositions.length > 0 && totalPages > 1 && (
            <div className="max-w-4xl mx-auto mt-8">
              {/* Total Jobs Count */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredPositions.length)} of {filteredPositions.length} total positions
                </p>
              </div>

              {/* Pagination Controls - Centered */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  // Show first page, last page, current page, and pages adjacent to current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          currentPage === page
                            ? 'bg-[#005F73] text-white shadow-md'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  // Show ellipsis
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-1 text-gray-400">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
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