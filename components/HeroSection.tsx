'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroStat {
  value: string;
  label: string;
}

interface HeroSectionProps {
  tagline?: string;
  heading?: string;
  headingAccent?: string;
  description?: string;
  primaryCTA?: {
    text?: string;
    href?: string;
  };
  secondaryCTA?: {
    text?: string;
    href?: string;
  };
  stats?: HeroStat[];
  backgroundImageUrl?: string | null;
  backgroundVideoUrl?: string | null;
}

export default function HeroSection({
  tagline,
  heading,
  headingAccent,
  description,
  primaryCTA,
  secondaryCTA,
  stats,
  backgroundImageUrl,
  backgroundVideoUrl,
}: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  const defaultData = {
    tagline: 'Transforming Water Infrastructure',
    heading: 'Engineering',
    headingAccent: 'Sustainable Solutions',
    description:
      'Comprehensive water and wastewater engineering consultancy delivering optimized solutions across India.',
    primaryCTA: {
      text: 'View Our Work',
      href: '/projects',
    },
    secondaryCTA: {
      text: 'Get in Touch',
      href: '/contact',
    },
    stats: [
      { value: '400+', label: 'MLD Capacity' },
      { value: '20+', label: 'Projects' },
      { value: '4+', label: 'Years' },
    ] as HeroStat[],
  };

  const hasContentProps =
    Boolean(tagline) ||
    Boolean(heading) ||
    Boolean(headingAccent) ||
    Boolean(description) ||
    Boolean(primaryCTA?.text) ||
    Boolean(primaryCTA?.href) ||
    Boolean(secondaryCTA?.text) ||
    Boolean(secondaryCTA?.href) ||
    Boolean(stats && stats.length > 0);

  const heroData = hasContentProps
    ? {
        tagline: tagline ?? '',
        heading: heading ?? '',
        headingAccent,
        description: description ?? '',
        primaryCTA: {
          text: primaryCTA?.text ?? defaultData.primaryCTA.text,
          href: primaryCTA?.href ?? defaultData.primaryCTA.href,
        },
        secondaryCTA: {
          text: secondaryCTA?.text ?? defaultData.secondaryCTA.text,
          href: secondaryCTA?.href ?? defaultData.secondaryCTA.href,
        },
        stats: stats && stats.length > 0 ? stats : [],
      }
    : {
        tagline: defaultData.tagline,
        heading: defaultData.heading,
        headingAccent: defaultData.headingAccent,
        description: defaultData.description,
        primaryCTA: defaultData.primaryCTA,
        secondaryCTA: defaultData.secondaryCTA,
        stats: defaultData.stats,
      };

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasBackgroundVideo = Boolean(backgroundVideoUrl);
  const hasBackgroundImage = Boolean(backgroundImageUrl);

  return (
    <section className="relative h-screen flex items-center hero-section" data-hero="true">
      <div className="absolute inset-0">
        {hasBackgroundVideo ? (
          <div className="absolute inset-0 bg-black">
            <video
              className="w-full h-full object-cover"
              src={backgroundVideoUrl || undefined}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ) : hasBackgroundImage ? (
          <div
            className="absolute inset-0 bg-gray-900 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1821] via-[#1b2d3f] to-[#2a4a66]">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 35px,
                  rgba(255,255,255,.1) 35px,
                  rgba(255,255,255,.1) 70px
                )`,
              }}
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <p
            className={`text-white/90 text-lg md:text-xl mb-4 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            {heroData.tagline}
          </p>

          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {heroData.heading}
            {heroData.headingAccent && (
              <span className="block text-[#26AFFF]">{heroData.headingAccent}</span>
            )}
          </h1>

          <p
            className={`text-white/90 text-lg md:text-xl mb-10 max-w-2xl transition-all duration-700 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {heroData.description}
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              href={heroData.primaryCTA.href}
              className="group inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-[#0057FF] rounded-xl font-semibold transition-colors shadow-lg"
            >
              {heroData.primaryCTA.text}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={heroData.secondaryCTA.href}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-semibold border border-white/30 transition-all"
            >
              {heroData.secondaryCTA.text}
            </Link>
          </div>

          <div
            className={`mt-20 flex flex-wrap gap-8 transition-all duration-700 delay-400 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {heroData.stats.map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  );
}
