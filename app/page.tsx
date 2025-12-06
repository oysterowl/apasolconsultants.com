import Header from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import SectorsSection from '@/components/SectorsSection';
import AboutSection from '@/components/AboutSection';
import ContactSectionWrapper from '@/components/ContactSectionWrapper';
import CTASection from '@/components/CTASection';
import { getHomePageData } from '@/lib/api';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || '';

type HomeData = {
  richTextContent?: {
    root?: {
      children?: Array<{
        type: 'paragraph';
        children: Array<{
          type: 'text';
          text: string;
          bold?: boolean;
        }>;
      }>;
    };
  };
  hero?: {
    badge?: string;
    title?: string;
    titleAccent?: string;
    subtitle?: string;
    backgroundType?: string;
    backgroundImage?: { url?: string };
    backgroundVideo?: { url?: string };
  };
  buttons?: {
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
  stats?: {
    stat1Value?: string;
    stat1Label?: string;
    stat2Value?: string;
    stat2Label?: string;
    stat3Value?: string;
    stat3Label?: string;
  };
  servicesIntro?: {
    tagline?: string;
    heading?: string;
    description?: string;
    featuredServices?: Array<{
      id?: string;
      slug?: string;
      title?: string;
      description?: string;
      heroDescription?: string;
    }>;
    ctaText?: string;
    ctaLink?: string;
  };
  portfolio?: {
    tagline?: string;
    heading?: string;
    description?: string;
    featuredProjects?: Array<{
      id?: string;
      slug?: string;
      name?: string;
      location?: string;
      capacity?: string;
      type?: string | { id?: string; name?: string; title?: string };
      year?: string;
      status?: string;
      excerpt?: string;
    }>;
    ctaText?: string;
    ctaLink?: string;
  };
  about?: {
    badge?: string;
    heading?: string;
    headingGradient?: string;
    content?: HomeData['richTextContent'];
    missionTitle?: string;
    missionText?: string;
    visionTitle?: string;
    visionText?: string;
    brandName?: string;
    brandTagline?: string;
    stats?: Array<{
      value: string;
      label: string;
    }>;
  };
  sectors?: {
    tagline?: string;
    heading?: string;
    description?: string;
    featuredSectors?: Array<{
      id?: string;
      slug?: string;
      title?: string;
      content?: string;
      stats?: Array<{ label?: string; value?: string }>;
      category?: { name?: string } | string;
    }>;
    ctaText?: string;
    ctaLink?: string;
  };
  contactSection?: {
    tagline?: string;
    heading?: string;
    description?: string;
    phoneTitle?: string;
    phoneSubtitle?: string;
    phoneHours?: string;
    emailTitle?: string;
    emailSubtitle?: string;
    emailNote?: string;
    visitTitle?: string;
    visitSubtitle?: string;
    visitHours?: string;
  };
  cta?: {
    title?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
  };
};

export default async function Home() {
  const homeData = await getHomePageData();
  const {
    hero,
    buttons,
    stats: statsGroup,
    servicesIntro,
    portfolio,
    about,
    sectors,
    cta,
  } = (homeData as HomeData) || {};

  let backgroundImageUrl: string | null = null;
  let backgroundVideoUrl: string | null = null;

  if (hero?.backgroundType === 'image' && hero.backgroundImage?.url) {
    backgroundImageUrl = hero.backgroundImage.url.startsWith('http')
      ? hero.backgroundImage.url
      : CMS_URL
        ? `${CMS_URL}${hero.backgroundImage.url}`
        : hero.backgroundImage.url;
  } else if (hero?.backgroundType === 'video' && hero.backgroundVideo?.url) {
    backgroundVideoUrl = hero.backgroundVideo.url.startsWith('http')
      ? hero.backgroundVideo.url
      : CMS_URL
        ? `${CMS_URL}${hero.backgroundVideo.url}`
        : hero.backgroundVideo.url;
  }

  const stats: { value: string; label: string }[] = [];
  if (statsGroup?.stat1Value && statsGroup.stat1Label) {
    stats.push({ value: statsGroup.stat1Value, label: statsGroup.stat1Label });
  }
  if (statsGroup?.stat2Value && statsGroup.stat2Label) {
    stats.push({ value: statsGroup.stat2Value, label: statsGroup.stat2Label });
  }
  if (statsGroup?.stat3Value && statsGroup.stat3Label) {
    stats.push({ value: statsGroup.stat3Value, label: statsGroup.stat3Label });
  }

  const services = (servicesIntro?.featuredServices || [])
    .map((service) => ({
      id: service.id || service.slug || '',
      slug: service.slug || '',
      title: service.title || '',
      description: service.description,
      heroDescription: service.heroDescription,
    }))
    .filter((service) => service.slug && service.title);

  const projects = (portfolio?.featuredProjects || [])
    .map((project) => ({
      id: project.id || project.slug || '',
      slug: project.slug || '',
      name: project.name || '',
      location: project.location,
      capacity: project.capacity,
      type: project.type,
      year: project.year,
      status: project.status,
      excerpt: project.excerpt,
    }))
    .filter((project) => project.slug && project.name);

  const featuredSectors = (sectors?.featuredSectors || [])
    .map((sector) => ({
      id: sector.id || sector.slug || '',
      slug: sector.slug || '',
      title: sector.title || '',
      content: sector.content,
      stats: (sector.stats || [])
        .map((stat) => ({
          label: stat.label || '',
          value: stat.value || '',
        }))
        .filter((stat) => stat.label && stat.value),
      category:
        typeof sector.category === 'object'
          ? sector.category?.name
            ? { name: sector.category.name }
            : undefined
          : sector.category,
    }))
    .filter((sector) => sector.slug && sector.title);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection
        tagline={hero?.badge}
        heading={hero?.title}
        headingAccent={hero?.titleAccent}
        description={hero?.subtitle}
        primaryCTA={
          buttons?.primaryButtonText && buttons?.primaryButtonLink
            ? { text: buttons.primaryButtonText, href: buttons.primaryButtonLink }
            : undefined
        }
        secondaryCTA={
          buttons?.secondaryButtonText && buttons?.secondaryButtonLink
            ? { text: buttons.secondaryButtonText, href: buttons.secondaryButtonLink }
            : undefined
        }
        stats={stats}
        backgroundImageUrl={backgroundImageUrl}
        backgroundVideoUrl={backgroundVideoUrl}
      />
      <ServicesSection
        tagline={servicesIntro?.tagline}
        heading={servicesIntro?.heading}
        description={servicesIntro?.description}
        services={services}
        ctaText={servicesIntro?.ctaText}
        ctaLink={servicesIntro?.ctaLink}
      />
      <ProjectsSection
        tagline={portfolio?.tagline}
        heading={portfolio?.heading}
        description={portfolio?.description}
        projects={projects}
        ctaText={portfolio?.ctaText}
        ctaLink={portfolio?.ctaLink}
      />
      <SectorsSection
        tagline={sectors?.tagline}
        heading={sectors?.heading}
        description={sectors?.description}
        sectors={featuredSectors}
        ctaText={sectors?.ctaText}
        ctaLink={sectors?.ctaLink}
      />
      <AboutSection
        badge={about?.badge}
        heading={about?.heading}
        headingGradient={about?.headingGradient}
        content={about?.content}
        missionTitle={about?.missionTitle}
        missionText={about?.missionText}
        visionTitle={about?.visionTitle}
        visionText={about?.visionText}
        brandName={about?.brandName}
        brandTagline={about?.brandTagline}
        stats={about?.stats}
      />
      <ContactSectionWrapper />
      {cta?.title && cta?.description && cta?.primaryButtonText && cta?.primaryButtonHref && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            <CTASection
              title={cta.title}
              description={cta.description}
              primaryButtonText={cta.primaryButtonText}
              primaryButtonHref={cta.primaryButtonHref}
              secondaryButtonText={cta.secondaryButtonText}
              secondaryButtonHref={cta.secondaryButtonHref}
            />
          </div>
        </section>
      )}
      <FooterWrapper />
    </div>
  );
}
