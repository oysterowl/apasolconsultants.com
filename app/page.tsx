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
  const hero = (homeData as {
    hero?: {
      badge?: string;
      title?: string;
      titleAccent?: string;
      subtitle?: string;
      stats?: {
        stat1Value?: string;
        stat1Label?: string;
        stat2Value?: string;
        stat2Label?: string;
        stat3Value?: string;
        stat3Label?: string;
      };
      backgroundType?: string;
      backgroundImage?: { url?: string };
      backgroundVideo?: { url?: string };
      primaryButton?: { text?: string; link?: string };
      secondaryButton?: { text?: string; link?: string };
    };
  } | null)?.hero;

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
  const heroStats = hero?.stats;
  if (heroStats?.stat1Value && heroStats.stat1Label) {
    stats.push({ value: heroStats.stat1Value, label: heroStats.stat1Label });
  }
  if (heroStats?.stat2Value && heroStats.stat2Label) {
    stats.push({ value: heroStats.stat2Value, label: heroStats.stat2Label });
  }
  if (heroStats?.stat3Value && heroStats.stat3Label) {
    stats.push({ value: heroStats.stat3Value, label: heroStats.stat3Label });
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection
        tagline={hero?.badge}
        heading={hero?.title}
        headingAccent={hero?.titleAccent}
        description={hero?.subtitle}
        primaryCTA={hero?.primaryButton}
        secondaryCTA={hero?.secondaryButton}
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
