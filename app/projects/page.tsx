import Header from '@/components/ClientHeaderWrapper';
import ClientFooterWrapper from '@/components/ClientFooterWrapper';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import ProjectsPageContent from '@/components/ProjectsPageContent';

interface Project {
  id: string;
  name: string;
  location: string;
  capacity: string;
  type: string;
  year: string;
  value: string;
  status: 'completed' | 'ongoing';
  description: string;
}

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

// Mapping from CMS slugified types to display labels
const TYPE_LABELS: Record<string, string> = {
  'sewage-treatment-plant': 'Sewage Treatment Plant',
  'water-treatment-plant': 'Water Treatment Plant',
  'water-supply-scheme': 'Water Supply Scheme',
  'sewerage-system': 'Sewerage System',
  'storm-water-system': 'Storm Water System',
  'water-reclamation': 'Water Reclamation',
  'desalination': 'Desalination',
  'industrial-water-solutions': 'Industrial Water Solutions',
};

interface CMSProject {
  id: string;
  name: string;
  location: string;
  capacity: string;
  type: string;
  year: string;
  value: string;
  status: 'completed' | 'ongoing';
  description: string;
}

interface CMSResponse {
  docs: CMSProject[];
}

async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${CMS_URL}/api/projects?limit=100&sort=-year`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const data = await response.json() as CMSResponse;

    // Transform CMS data to match frontend interface
    return (data.docs || []).map((project: CMSProject) => ({
      id: project.id,
      name: project.name,
      location: project.location,
      capacity: project.capacity,
      type: TYPE_LABELS[project.type] || project.type,
      year: project.year,
      value: project.value,
      status: project.status,
      description: project.description,
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        variant="primary"
        badge="Our Work"
        title="Engineering Excellence in Water Infrastructure"
        description="Delivering transformative water solutions across India with over ₹300 crores worth of projects"
      />

      <ProjectsPageContent projects={projects} />

      {/* Our Capacity Section - Simplified */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">Our Capacity</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Engineering expertise backed by proven track record in large-scale water infrastructure
            </p>
          </div>

          {/* Stats Grid - Clean Design */}
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 mb-16">
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">475+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">MLD Capacity</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">300+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">KM Pipeline</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">₹300+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Crores Value</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">8+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">States</p>
            </div>
          </div>

          {/* Technical Capabilities */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-8 text-center">Technical Capabilities</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-[#0057FF] mb-4">Design Software</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    WaterGEMS / SewerGEMS
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    EPANET / SWMM
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    HEC-RAS / HEC-HMS
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    AutoCAD / Civil 3D
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0057FF] mb-4">Treatment Technologies</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Conventional Treatment
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    MBR / MBBR Systems
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    SBR Technology
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Advanced Oxidation
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0057FF] mb-4">Project Types</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    EPC Contracts
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    HAM Projects
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    PMC Services
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    DPR Preparation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <CTASection
            title="Ready to Start Your Project?"
            description="Let's discuss how our expertise can transform your water infrastructure vision into reality"
            primaryButtonText="Get Free Consultation"
            primaryButtonHref="/contact"
            secondaryButtonText="Download Portfolio"
            secondaryButtonHref="/resources"
          />
        </div>
      </section>

      <ClientFooterWrapper />
    </div>
  );
}