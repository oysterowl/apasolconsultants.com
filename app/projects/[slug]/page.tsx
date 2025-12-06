import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import PageHero from '@/components/PageHero';
import { notFound } from 'next/navigation';
import Image from 'next/image';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

interface ProjectCategory {
  name?: string;
  slug?: string;
}

interface ProjectDocument {
  id: string;
  name: string;
  slug: string;
  location?: string;
  capacity?: string;
  type?: string | ProjectCategory;
  year?: string;
  value?: string;
  status?: 'completed' | 'ongoing';
  description?: string;
  excerpt?: string;
  image1?: { url?: string; alt?: string };
  image2?: { url?: string; alt?: string };
}

async function fetchProject(slug: string): Promise<ProjectDocument | null> {
  if (!CMS_URL) return null;
  const res = await fetch(
    `${CMS_URL}/api/projects?limit=1&depth=2&where[slug][equals]=${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.docs?.[0] || null;
}

function getImageUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  return CMS_URL ? `${CMS_URL}${url}` : url;
}

function getCategoryLabel(type?: string | ProjectCategory) {
  if (!type) return '';
  if (typeof type === 'string') return type;
  return type.name || type.slug || '';
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await fetchProject(slug);

  if (!project) {
    notFound();
  }

  const projectImageUrl1 = getImageUrl(project.image1?.url);
  const projectImageUrl2 = getImageUrl(project.image2?.url);
  const typeLabel = getCategoryLabel(project.type);

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      <PageHero
        variant="primary"
        badge={typeLabel || 'Project'}
        title={project.name}
        description={project.excerpt || ''}
      />

      <section className="bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl -mt-12">
          <div className="flex flex-wrap gap-3">
            {project.location && (
              <InfoPill label="Location" value={project.location} />
            )}
            {project.status && (
              <InfoPill label="Status" value={project.status === 'completed' ? 'Completed' : 'Ongoing'} />
            )}
            {project.year && (
              <InfoPill label="Year" value={project.year} />
            )}
            {project.capacity && (
              <InfoPill label="Capacity" value={project.capacity} />
            )}
            {project.value && (
              <InfoPill label="Value" value={project.value} />
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#2C3E50]">Project Overview</h2>
              {project.description ? (
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              ) : (
                <p className="text-gray-600 leading-relaxed">Project details coming soon.</p>
              )}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">Key Details</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  {project.location && <Detail label="Location" value={project.location} />}
                  {typeLabel && <Detail label="Category" value={typeLabel} />}
                  {project.capacity && <Detail label="Capacity" value={project.capacity} />}
                  {project.year && <Detail label="Year" value={project.year} />}
                  {project.value && <Detail label="Project Value" value={project.value} />}
                  {project.status && (
                    <Detail
                      label="Status"
                      value={project.status === 'completed' ? 'Completed' : 'Ongoing'}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {projectImageUrl1 && (
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                  <div className="relative h-[280px] sm:h-[340px]">
                    <Image
                      src={projectImageUrl1}
                      alt={project.image1?.alt || project.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </div>
                </div>
              )}
              {projectImageUrl2 && (
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                  <div className="relative h-[240px] sm:h-[300px]">
                    <Image
                      src={projectImageUrl2}
                      alt={project.image2?.alt || project.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12" />
      </section>

      <FooterWrapper />
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
      <span className="text-xs uppercase tracking-wide text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-[#1a1a1a]">{value}</span>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-800 border border-gray-200">
      <span className="text-gray-500">{label}: </span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}





