import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import ProjectsPageContent from "@/components/ProjectsPageContent";
import { getProjectsPageData } from "@/lib/api";

interface Project {
  id: string;
  name: string;
  location: string;
  capacity: string;
  type: string;
  year: string;
  value: string;
  status: "completed" | "ongoing";
  description: string;
  excerpt?: string;
  slug?: string;
}

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

interface CMSProjectType {
  name?: string;
  slug?: string;
}

interface CMSProject {
  id: string;
  name: string;
  location: string;
  capacity: string;
  type: string | CMSProjectType;
  year: string;
  value: string;
  status: "completed" | "ongoing";
  description: string;
  excerpt?: string;
  slug?: string;
}

interface CMSResponse {
  docs: CMSProject[];
}

async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${CMS_URL}/api/projects?limit=100&sort=-year&depth=1`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    const data = (await response.json()) as CMSResponse;

    // Transform CMS data to match frontend interface
    return (data.docs || []).map((project: CMSProject) => {
      const typeField = project.type;
      const typeLabel =
        typeof typeField === "string"
          ? typeField
          : typeField?.name || typeField?.slug || "";

      return {
        id: project.id,
        name: project.name,
        location: project.location,
        capacity: project.capacity,
        type: typeLabel,
        year: project.year,
        value: project.value,
        status: project.status,
        description: project.description,
        excerpt: project.excerpt,
        slug: project.slug,
      };
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const pageData = await getProjectsPageData();
  const projects = await getProjects();

  const hero = (pageData as { hero?: { badge?: string; heading?: string; description?: string } })?.hero;
  const overview = (pageData as { projectsOverview?: { heading?: string; description?: string } })?.projectsOverview;
  const capacity = (pageData as {
    capacitySection?: {
      heading?: string;
      description?: string;
      stats?: { value?: string; label?: string }[];
    };
  })?.capacitySection;
  const technical = (pageData as {
    technicalCapabilities?: {
      heading?: string;
      columns?: { title?: string; items?: { text?: string }[] }[];
    };
  })?.technicalCapabilities;
  const cta = (pageData as {
    cta?: {
      heading?: string;
      description?: string;
      primaryButtonText?: string;
      primaryButtonLink?: string;
      secondaryButtonText?: string;
      secondaryButtonLink?: string;
    };
  })?.cta;
  const capacityStats = Array.isArray(capacity?.stats) ? capacity.stats : [];

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      <PageHero
        variant="primary"
        badge={hero?.badge}
        title={hero?.heading}
        description={hero?.description}
      />

      <ProjectsPageContent
        projects={projects}
        heading={overview?.heading}
        description={overview?.description}
      />

      {/* Our Capacity Section */}
      {capacity && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
            <div className="text-center mb-12">
              {capacity.heading && (
                <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">{capacity.heading}</h2>
              )}
              {capacity.description && (
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {capacity.description}
                </p>
              )}
            </div>

            {/* Stats Grid */}
            {capacityStats.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 mb-16">
                {capacityStats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-8 lg:gap-12">
                    <div className="text-center relative">
                      <p className="text-4xl font-bold text-[#2C3E50] mb-2">{stat?.value}</p>
                      <p className="text-sm text-gray-600 uppercase tracking-wider">{stat?.label}</p>
                    </div>
                    {index < capacityStats.length - 1 && (
                      <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Technical Capabilities */}
            {technical && (
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                {technical.heading && (
                  <h3 className="text-2xl font-bold text-[#2C3E50] mb-8 text-center">
                    {technical.heading}
                  </h3>
                )}
                {Array.isArray(technical.columns) && technical.columns.length > 0 && (
                  <div className="grid md:grid-cols-3 gap-8">
                    {technical.columns.map((column, idx) => (
                      <div key={idx}>
                        {column.title && (
                          <h4 className="font-semibold text-[#0057FF] mb-4">{column.title}</h4>
                        )}
                        {Array.isArray(column.items) && column.items.length > 0 && (
                          <ul className="space-y-2 text-gray-600 text-sm">
                            {column.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start">
                                <svg className="w-4 h-4 text-[#26AFFF] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                {item.text}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta?.heading && cta?.description && cta?.primaryButtonText && cta?.primaryButtonLink && (
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <CTASection
              title={cta.heading}
              description={cta.description}
              primaryButtonText={cta.primaryButtonText}
              primaryButtonHref={cta.primaryButtonLink}
              secondaryButtonText={cta.secondaryButtonText}
              secondaryButtonHref={cta.secondaryButtonLink}
            />
          </div>
        </section>
      )}

      <FooterWrapper />
    </div>
  );
}
