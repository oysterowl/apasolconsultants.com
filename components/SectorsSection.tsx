'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Sector {
  id: string;
  slug: string;
  title: string;
  category?: {
    name: string;
  } | string;
  content?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  color?: string;
}

interface SectorsSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  sectors?: Sector[];
  ctaText?: string;
  ctaLink?: string;
}

const sectorColors = [
  { color: '#1a5fb4', shadowColor: 'rgba(26, 95, 180, 0.3)' },
  { color: '#26AFFF', shadowColor: 'rgba(38, 175, 255, 0.3)' },
  { color: '#0088cc', shadowColor: 'rgba(0, 136, 204, 0.3)' },
  { color: '#0057FF', shadowColor: 'rgba(0, 87, 255, 0.3)' },
  { color: '#1a7fb4', shadowColor: 'rgba(26, 127, 180, 0.3)' },
];

export default function SectorsSection({
  tagline,
  heading,
  description,
  sectors,
  ctaText,
  ctaLink
}: SectorsSectionProps) {
  const [activeSection, setActiveSection] = useState(0);

  if (!sectors || sectors.length === 0) {
    return null;
  }

  const sectorsWithColors = sectors.map((sector, index) => {
    const colors = sectorColors[index % sectorColors.length];
    const categoryName = typeof sector.category === 'object' && sector.category
      ? sector.category.name
      : typeof sector.category === 'string'
      ? sector.category
      : '';

    return {
      ...sector,
      color: colors.color,
      shadowColor: colors.shadowColor,
      categoryName,
      href: `/sectors/${sector.slug}`,
    };
  });

  return (
    <section className="py-32 bg-gray-50" id="sectors">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        {(tagline || heading || description) && (
          <div className="text-center mb-16">
            {tagline && (
              <p className="text-[#26AFFF] font-semibold mb-3 tracking-wide uppercase text-sm">
                {tagline}
              </p>
            )}
            {heading && (
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Horizontal Accordion */}
        <div className="flex flex-col lg:flex-row items-stretch border border-gray-300 rounded-2xl overflow-hidden max-w-6xl mx-auto h-[500px]">
          {sectorsWithColors.map((sector, index) => (
            <div
              key={sector.id}
              className={`relative cursor-pointer transition-all duration-500 ease-in-out ${
                activeSection === index
                  ? 'flex-[5] bg-white'
                  : 'flex-[0.1] min-w-[80px]'
              } ${index < sectors.length - 1 ? 'border-r border-gray-300' : ''}`}
              style={{
                backgroundColor: activeSection === index ? 'white' : sector.color,
                boxShadow: activeSection === index
                  ? `inset -12px 0px 20px -15px ${sector.shadowColor}`
                  : `inset -12px 0px 20px -15px rgba(0,0,0,0.3)`
              }}
              role="tabpanel"
              aria-labelledby={sector.id}
            >
              {/* Collapsed State */}
              {activeSection !== index && (
                <div onClick={() => setActiveSection(index)} className="flex flex-col items-center justify-start h-full pt-6">
                  <button
                    className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center mb-4 hover:bg-white/10 transition-colors"
                    aria-label={`Expand ${sector.title}`}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <h3
                    className="text-white font-bold text-lg whitespace-nowrap"
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)'
                    }}
                  >
                    {sector.title}
                  </h3>
                </div>
              )}

              {/* Expanded State */}
              {activeSection === index && (
                <Link href={sector.href} className="p-8 h-full flex flex-col animate-fadeIn group">
                  {/* Header with Industry Badge and Button */}
                  <div className="flex items-start justify-between mb-6">
                    {sector.categoryName && (
                      <div
                        className="px-4 py-2 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: sector.color }}
                      >
                        <span className="text-white font-bold text-sm uppercase tracking-wider">
                          {sector.categoryName}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-3xl font-bold mb-4"
                    style={{ color: sector.color }}
                  >
                    {sector.title}
                  </h3>

                  {/* Content */}
                  {sector.content && (
                    <div className="mb-8 flex-grow">
                      <p className="text-gray-600 text-lg leading-relaxed line-clamp-6">
                        {sector.content}
                      </p>
                    </div>
                  )}

                  {/* Stats */}
                  {sector.stats && sector.stats.length > 0 && (
                    <div className="flex gap-8 mb-6">
                      {sector.stats.map((stat, idx) => (
                        <div key={idx}>
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Learn More Text */}
                  <div
                    className="inline-flex items-center font-semibold transition-colors"
                    style={{ color: sector.color }}
                  >
                    Learn More
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {ctaText && ctaLink && (
          <div className="mt-16 text-center">
            <Link
              href={ctaLink}
              className="inline-flex items-center px-8 py-4 bg-[#0057FF] hover:bg-[#0046cc] text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-[#0057FF]/25 hover:shadow-xl hover:shadow-[#0057FF]/30"
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
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
      `}</style>
    </section>
  );
}
