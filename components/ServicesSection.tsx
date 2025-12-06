'use client';

import { useEffect, useRef, useState } from 'react';

type ServiceSummary = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  heroDescription?: string;
};

interface ServiceCardProps {
  title: string;
  description?: string;
  delay: number;
  href: string;
  gradient: string;
}

function ServiceCard({ title, description, delay, href, gradient }: ServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <a href={href}>
      <div
        ref={ref}
        className={`group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#26AFFF] shadow-sm hover:shadow-xl transition-all duration-300 h-full transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Accent bar */}
        <div className={`h-3 w-full ${gradient}`} />
        <div className="h-3 w-full bg-gradient-to-r from-gray-50 via-white to-gray-50" />

        {/* Content */}
        <div className="p-8 space-y-4">
          <h3 className="text-2xl font-bold text-[#2C3E50] tracking-tight">
            {title}
          </h3>
          {description && (
            <p className="text-gray-600 leading-relaxed line-clamp-3">
              {description}
            </p>
          )}
          {/* CTA */}
          <div className="flex items-center text-[#0057FF] font-semibold group-hover:text-[#26AFFF] transition-colors duration-300">
            <span>Explore Service</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

interface ServicesSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  services?: ServiceSummary[];
  ctaText?: string;
  ctaLink?: string;
}

const gradientPalette = [
  'bg-gradient-to-br from-[#26AFFF] to-[#007A8F]',
  'bg-gradient-to-br from-[#007A8F] to-[#0057FF]',
  'bg-gradient-to-br from-[#0057FF] to-[#003D4F]',
];

export default function ServicesSection({ tagline, heading, description, services, ctaText, ctaLink }: ServicesSectionProps) {
  const serviceCards: ServiceCardProps[] =
    services?.map((svc, idx) => ({
      title: svc.title,
      description: svc.description || svc.heroDescription,
      delay: idx * 100,
      href: `/services/${svc.slug}`,
      gradient: gradientPalette[idx % gradientPalette.length],
    })) || [];

  const hasIntro = Boolean(tagline || heading || description);
  const hasServices = serviceCards.length > 0;

  if (!hasIntro && !hasServices) {
    return null;
  }

  return (
    <section className="py-32" id="services">
      <div className="container mx-auto px-6 lg:px-12">
        {hasIntro && (
          <div className="text-center mb-16">
            {tagline && (
              <p className="text-[#26AFFF] font-semibold mb-3 tracking-wide uppercase text-sm">{tagline}</p>
            )}
            {heading && (
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">{heading}</h2>
            )}
            {description && (
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                {description}
              </p>
            )}
          </div>
        )}

        {hasServices && (
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {serviceCards.map((card, idx) => (
              <ServiceCard key={`${card.href}-${idx}`} {...card} />
            ))}
          </div>
        )}

        {ctaText && ctaLink && (
          <div className="text-center">
            <a
              href={ctaLink}
              className="inline-flex items-center px-8 py-4 bg-white border-2 border-[#0057FF] text-[#0057FF] hover:bg-[#0057FF] hover:text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {ctaText}
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
