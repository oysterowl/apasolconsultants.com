import Header from '@/components/Header';
import FooterWrapper from '@/components/FooterWrapper';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import SectorsSection from '@/components/SectorsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <SectorsSection />
      <AboutSection />
      <ContactSection />
      <FooterWrapper />
    </div>
  );
}
