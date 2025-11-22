import Header from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import SectorsSection from '@/components/SectorsSection';
import AboutSection from '@/components/AboutSection';
import ContactSectionWrapper from '@/components/ContactSectionWrapper';
import { getHomePageData } from '@/lib/api';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || '';

export default async function Home() {
  const homeData = await getHomePageData();
  const { hero, buttons, stats: statsGroup } = (homeData as {
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
  }) || {};

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
      <ServicesSection />
      <ProjectsSection />
      <SectorsSection />
      <AboutSection />
      <ContactSectionWrapper />
      <FooterWrapper />
    </div>
  );
}
