'use client';

import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

// Job positions data (same as in main careers page)
const positions = [
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

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Number(params.id);

  const job = positions.find(p => p.id === jobId);

  if (!job) {
    router.push('/404');
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Simple Hero */}
      <section className="bg-gray-50 border-b border-gray-200 pt-32 pb-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-[#005F73] transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/careers" className="text-gray-500 hover:text-[#005F73] transition-colors">
                Careers
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-[#005F73] font-medium">{job.title}</span>
            </nav>
          </div>

          {/* Job Title and Meta */}
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-6">
              {job.title}
            </h1>

            {/* Job Meta */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {job.department}
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.type}
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {job.experience}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && (
                <div>
                  <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Key Responsibilities</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((resp, index) => (
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

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-[#00C9C9] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About APASOL */}
              <div>
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">About APASOL</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  APASOL Consultants is a leading water engineering firm dedicated to creating sustainable water solutions across India.
                  With over 15 years of experience, we've designed and implemented water infrastructure projects serving millions of people.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Join our team of 200+ experts working on cutting-edge projects that combine traditional engineering excellence
                  with modern technology to solve India's water challenges.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Apply Card */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-[#2C3E50] mb-4">Ready to Apply?</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Join our mission to transform water infrastructure across India.
                </p>
                <a
                  href={`mailto:careers@apasolconsultants.com?subject=Application for ${job.title}`}
                  className="block w-full text-center bg-[#005F73] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#004A5C] transition-colors shadow-md"
                >
                  Apply Now
                </a>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  or email us at careers@apasolconsultants.com
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#2C3E50] mb-4">Benefits</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Competitive salary packages</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Health & wellness coverage</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Professional development</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Work-life balance</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#00C9C9] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Innovation opportunities</span>
                  </li>
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