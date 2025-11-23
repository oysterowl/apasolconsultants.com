import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import PageHero from '@/components/PageHero';
import Button from '@/components/Button';
import CTASection from '@/components/CTASection';
import CountUp from '@/components/CountUp';
import CertificationCarousel from '@/components/CertificationCarousel';
import { getAboutPageData } from '@/lib/api';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

interface RichTextNode {
  children?: Array<{ text?: string }>;
}

interface Media {
  url?: string;
}

// Extract plain text paragraphs from Payload rich text (both Slate-style arrays and Lexical objects)
function extractParagraphs(content: unknown): string[] {
  if (!content) return [];

  // Handle classic array-based rich text
  if (Array.isArray(content)) {
    return content
      .map(node => {
        const children = (node as RichTextNode)?.children;
        if (!Array.isArray(children)) return '';
        return children.map(child => child?.text ?? '').join('').trim();
      })
      .filter(Boolean);
  }

  // Handle Lexical-style rich text ({ root: { children: [...] } })
  if (typeof content === 'object' && content !== null) {
    const rootChildren = (content as { root?: { children?: unknown[] } }).root?.children;
    if (Array.isArray(rootChildren)) {
      return rootChildren
        .map(child => {
          const children = (child as RichTextNode)?.children;
          if (!Array.isArray(children)) return '';
          return children.map(grandChild => grandChild?.text ?? '').join('').trim();
        })
        .filter(Boolean);
    }
  }

  return [];
}

function resolveMediaUrl(media: unknown): string | undefined {
  const url =
    typeof media === 'object' && media !== null
      ? (media as Media).url
      : typeof media === 'string'
        ? media
        : undefined;

  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  return CMS_URL ? `${CMS_URL}${url}` : url;
}

function extractFounderBio(bio: unknown): string[] {
  if (!bio) return [];
  if (Array.isArray(bio)) {
    return bio
      .map(entry => {
        if (typeof entry === 'string') return entry.trim();
        if (entry && typeof entry === 'object') {
          const paragraph = (entry as { paragraph?: string }).paragraph;
          if (paragraph) return paragraph.trim();
          const text = extractParagraphs(entry as unknown);
          if (text.length > 0) return text.join(' ').trim();
        }
        return '';
      })
      .filter(Boolean);
  }
  return [];
}

interface StatItem {
  number: number;
  suffix: string;
  label: string;
  sublabel: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

interface ExpertiseItem {
  skill?: string;
  item?: string;
}

interface AchievementItem {
  achievement: string;
}

interface ValueItem {
  number: string;
  title: string;
  description: string;
  color: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

interface AboutPageData {
  hero?: {
    badge?: string;
    heading?: string;
    description?: string;
  };
  stats?: {
    heading?: string;
    description?: string;
    items?: StatItem[];
  };
  companyStory?: {
    badge?: string;
    heading?: string;
    description?: string;
    image?: Media | string;
    content?: RichTextNode[] | { root?: { children?: RichTextNode[] } };
  };
  timeline?: {
    heading?: string;
    description?: string;
    events?: TimelineEvent[];
  };
  missionVision?: {
    mission?: {
      heading?: string;
      content?: string;
    };
    vision?: {
      heading?: string;
      content?: string;
    };
  };
  founder?: {
    badge?: string;
    heading?: string;
    sectionHeading?: string;
    name?: string;
    role?: string;
    title?: string;
    photo?: Media | string;
    bio?: RichTextNode[];
    expertise?: ExpertiseItem[];
    achievements?: AchievementItem[];
    quote?: string;
  };
  certifications?: {
    heading?: string;
    description?: string;
    items?: Array<{
      name?: string;
      issuer?: string;
      year?: string;
      logo?: Media | string;
    }>;
  };
  values?: {
    heading?: string;
    items?: ValueItem[];
  };
  cta?: {
    heading?: string;
    description?: string;
    primaryButton?: {
      text?: string;
      link?: string;
    };
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    'about-page',
    'About Us - APASOL Consultants | Water & Wastewater Engineering Experts',
    'Learn about APASOL Consultants - Leading water and wastewater engineering firm in India with 20+ projects, 400 MLD capacity, serving 3M+ people across 8 states since 2020.'
  );
}

export default async function AboutPage() {
  const pageData = await getAboutPageData();

  if (!pageData) {
    return (
      <div className="min-h-screen bg-white">
        <HeaderWrapper />
        <div className="container mx-auto px-6 py-20">
          <p className="text-center text-gray-600">Content is being loaded...</p>
        </div>
        <FooterWrapper />
      </div>
    );
  }

  const {
    hero,
    stats,
    companyStory,
    timeline,
    missionVision,
    founder,
    certifications,
    values,
    cta
  } = pageData as AboutPageData;

  const storyParagraphs = extractParagraphs(companyStory?.content);
  const founderBioParagraphs = extractParagraphs(founder?.bio);
  const founderBioFallback = extractFounderBio(founder?.bio);
  const founderBio = founderBioParagraphs.length ? founderBioParagraphs : founderBioFallback;
  const founderExpertise =
    founder?.expertise
      ?.map(item => (item.skill ?? (item as { item?: string }).item ?? '').trim())
      .filter(Boolean) ?? [];
  const storyImageUrl = resolveMediaUrl(companyStory?.image);
  const founderPhotoUrl = resolveMediaUrl(founder?.photo);
  const certificationsList =
    (certifications?.items ?? [])
      .map(item => ({
        name: item.name ?? '',
        issuer: item.issuer ?? '',
        year: item.year ?? '',
      }))
      .filter(item => item.name && item.issuer && item.year);
  const certificationsHeading = certifications?.heading ?? 'Certifications & Accreditations';
  const certificationsDescription = certifications?.description;

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      <PageHero
        variant="primary"
        badge={hero?.badge}
        title={hero?.heading ?? ''}
        description={hero?.description ?? ''}
      />

      {stats && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
                {stats.heading}
              </h2>
              <p className="text-gray-600 text-lg">
                {stats.description}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-xl overflow-hidden">
              {stats.items?.map((stat: StatItem, index: number) => (
                <div key={index} className="bg-white p-8 text-center">
                  <div className="text-5xl lg:text-6xl font-bold text-[#0057FF] mb-2 flex items-center justify-center">
                    <CountUp end={stat.number} duration={2500} />
                    <span className="text-3xl lg:text-4xl ml-1">{stat.suffix}</span>
                  </div>
                  <p className="text-gray-700 font-medium text-lg">{stat.label}</p>
                  <p className="text-gray-500 text-sm mt-1">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {companyStory && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8">
                  <p className="text-[#26AFFF] font-semibold mb-4 tracking-wide uppercase text-sm inline-flex items-center">
                    <span className="w-12 h-0.5 bg-[#26AFFF] mr-3"></span>
                    {companyStory.badge}
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4 leading-tight">
                    {companyStory.heading}
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                    {companyStory.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {storyParagraphs.map((paragraph, index) => (
                    <div key={index} className="text-lg text-gray-700 leading-relaxed">
                      {paragraph}
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href="/projects" variant="secondary">
                    View Our Projects
                  </Button>
                </div>
              </div>
              <div className="relative">
                {storyImageUrl ? (
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                    <img
                      src={storyImageUrl}
                      alt={companyStory?.heading ? `${companyStory.heading} visual` : 'Company story'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-[#0057FF] to-[#26AFFF] rounded-2xl"></div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {timeline && (
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-[#26AFFF] font-semibold mb-4 tracking-wide uppercase text-sm">
                {timeline.heading}
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50]">
                {timeline.description}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>

                <div className="space-y-8">
                  {timeline.events?.map((item: TimelineEvent, index: number) => (
                    <div key={index} className="relative flex items-start">
                      <div className="absolute left-8 w-4 h-4 -translate-x-1/2 bg-white border-2 border-[#26AFFF] rounded-full mt-2"></div>

                      <div className="ml-20">
                        <div className={`p-6 rounded-xl border ${
                          item.highlight
                            ? 'border-[#26AFFF] bg-[#26AFFF]/5'
                            : 'border-gray-200 bg-white'
                        }`}>
                          <div className="flex items-baseline mb-3">
                            <span className={`text-2xl font-bold ${
                              item.highlight ? 'text-[#26AFFF]' : 'text-[#0057FF]'
                            }`}>
                              {item.year}
                            </span>
                            <span className="mx-3 text-gray-300">•</span>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {missionVision && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-xl border border-gray-200 p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#26AFFF]/10 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-[#26AFFF]"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="16" y1="16" x2="22" y2="10" />
                      <polygon points="30,6 26,6 26,2 22,6 22,10 26,10 " />
                      <circle cx="16" cy="16" r="6" />
                      <path d="M27,9c1.3,2,2,4.4,2,7c0,7.2-5.8,13-13,13S3,23.2,3,16S8.8,3,16,3c2.6,0,5,0.7,7,2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#2C3E50]">{missionVision.mission?.heading}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {missionVision.mission?.content}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#0057FF]/10 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-[#0057FF]"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="16" cy="18" r="3" />
                      <path d="M31,18c0,0-6-9-15-9S1,18,1,18s6,9,15,9S31,18,31,18z" />
                      <line x1="16" y1="6" x2="16" y2="2" />
                      <line x1="7" y1="9" x2="4" y2="6" />
                      <line x1="25" y1="9" x2="28" y2="6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#2C3E50]">{missionVision.vision?.heading}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {missionVision.vision?.content}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      {founder && (
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-[#26AFFF] font-semibold mb-4 tracking-wide uppercase text-sm">
                {founder.badge}
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
                {founder.sectionHeading ?? founder.heading}
              </h2>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl border border-gray-200 p-8 lg:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-[#2C3E50] mb-2">{founder.name}</h3>
                    <p className="text-xl text-[#26AFFF] font-semibold">
                      {founder.title ?? founder.role}
                    </p>
                  </div>
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    {founderPhotoUrl ? (
                      <img
                        src={founderPhotoUrl}
                        alt={founder.name ? `${founder.name} portrait` : 'Founder photo'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0057FF] to-[#26AFFF]" />
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {founderBio.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {founderExpertise.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-[#2C3E50] mb-4">Core Expertise</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {founderExpertise.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <svg className="w-5 h-5 text-[#26AFFF] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {founder.achievements && (
                  <div className="bg-[#26AFFF]/5 rounded-xl p-6 border border-[#26AFFF]/20">
                    <h4 className="text-lg font-semibold text-[#0057FF] mb-3">Notable Achievements</h4>
                    <ul className="space-y-2 text-gray-700">
                      {founder.achievements.map((item: AchievementItem, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#26AFFF] mr-2">•</span>
                          {item.achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {founder.quote && (
                  <div className="mt-8 pl-6 border-l-4 border-[#26AFFF]">
                    <p className="text-gray-600 italic text-lg">
                      &quot;{founder.quote}&quot;
                    </p>
                    <p className="text-[#0057FF] font-semibold mt-2">- {founder.name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {certificationsList.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-[#26AFFF] font-semibold mb-4 tracking-wide uppercase text-sm">
                Accreditations
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50]">
                {certificationsHeading}
              </h2>
              {certificationsDescription && (
                <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
                  {certificationsDescription}
                </p>
              )}
            </div>

            <CertificationCarousel certifications={certificationsList} />
          </div>
        </section>
      )}

      {values && (
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-[#26AFFF] font-semibold mb-4 tracking-wide uppercase text-sm">
                What Drives Us
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50]">
                {values.heading}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.items?.map((value: ValueItem, index: number) => (
                <div key={index} className="text-center">
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
                    style={{ backgroundColor: `${value.color}15` }}
                  >
                    <span
                      className="text-4xl font-bold"
                      style={{ color: value.color }}
                    >
                      {value.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-3">{value.title}</h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {cta && (
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <CTASection
              title={cta.heading ?? ''}
              description={cta.description ?? ''}
              primaryButtonText={cta.primaryButton?.text ?? ''}
              primaryButtonHref={cta.primaryButton?.link ?? ''}
            />
          </div>
        </section>
      )}

      <FooterWrapper />
    </div>
  );
}
