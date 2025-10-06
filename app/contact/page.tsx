import HeaderWrapper from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import PageHero from '@/components/PageHero';
import ContactPageContent from './ContactPageContent';
import { getGlobalData } from '@/lib/api';
import type { SiteInfo } from '@/types/siteInfo';

interface ContactPageData {
  hero: {
    heading: string;
    description: string;
    badge: string;
  };
  contactInfo: {
    heading: string;
    description: string;
    phoneSection: {
      title: string;
      description: string;
      buttonText: string;
    };
    emailSection: {
      title: string;
      description: string;
      buttonText: string;
    };
    addressSection: {
      title: string;
      description: string;
      buttonText: string;
    };
  };
  departments: {
    heading: string;
    description: string;
    items: Array<{
      name: string;
      description: string;
      email: string;
      phone?: string;
      icon?: string;
    }>;
  };
  contactForm: {
    heading: string;
    description: string;
    formFields: Array<{
      name: string;
      label: string;
      type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
      placeholder?: string;
      required: boolean;
      options?: Array<{
        label: string;
        value: string;
      }>;
    }>;
    consentText: string;
    consentRequired: boolean;
    submitButton: string;
    submittingText: string;
    successMessage: string;
    errorMessage: string;
  };
  mapSection: {
    embedUrl?: string;
  };
  resources: {
    heading: string;
    resource1?: {
      title?: string;
      description?: string;
      file?: unknown;
    };
    resource2?: {
      title?: string;
      description?: string;
      file?: unknown;
    };
  };
  faq: {
    heading: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    heading: string;
    description: string;
    primaryButton: {
      text: string;
      action: 'email' | 'phone' | 'custom';
      customLink?: string;
    };
    secondaryButton: {
      text: string;
      action: 'email' | 'phone' | 'custom';
      customLink?: string;
    };
  };
}

export default async function ContactPage() {
  const pageData = await getGlobalData('contact-page') as ContactPageData | null;
  const siteInfo = await getGlobalData('site-info') as SiteInfo | null;

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper />

      <PageHero
        variant="contact"
        badge={pageData?.hero?.badge || ''}
        title={pageData?.hero?.heading || 'Get in Touch'}
        description={pageData?.hero?.description || 'Contact us for your water and wastewater engineering needs'}
      />

      <ContactPageContent
        contactInfo={pageData?.contactInfo}
        departments={pageData?.departments}
        contactForm={pageData?.contactForm}
        mapSection={pageData?.mapSection}
        resources={pageData?.resources}
        faq={pageData?.faq}
        cta={pageData?.cta}
        siteInfo={siteInfo}
      />

      <FooterWrapper />
    </div>
  );
}