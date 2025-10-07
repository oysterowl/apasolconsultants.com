'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  // Future CMS integration - these would come from CMS
  const heroData = {
    backgroundImage: null,
    tagline: 'Transforming Water Infrastructure',
    heading: 'Engineering',
    headingAccent: 'Sustainable Solutions',
    description: 'Comprehensive water and wastewater engineering consultancy delivering optimized solutions across India.',
    primaryCTA: {
      text: 'View Our Work',
      href: '/projects'
    },
    secondaryCTA: {
      text: 'Get in Touch',
      href: '/contact'
    },
    stats: [
      { value: '500+', label: 'MLD Capacity' },
      { value: '200+', label: 'Projects' },
      { value: '15+', label: 'Years' }
    ]
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center hero-section" data-hero="true">
      {/* Background - Placeholder gradient when no CMS image */}
      <div className="absolute inset-0">
        {heroData.backgroundImage ? (
          // Future: CMS image will go here
          <div className="absolute inset-0 bg-gray-900">
            {/* Image component will go here */}
          </div>
        ) : (
          // Placeholder gradient - similar to blog posts
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1821] via-[#1b2d3f] to-[#2a4a66]">
            {/* Subtle pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 35px,
                  rgba(255,255,255,.1) 35px,
                  rgba(255,255,255,.1) 70px
                )`
              }}
            />
          </div>
        )}

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">

          {/* Tagline */}
          <p className={`text-white/90 text-lg md:text-xl mb-4 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            {heroData.tagline}
          </p>

          {/* Main Heading */}
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {heroData.heading}
            <span className="block text-[#26AFFF]">{heroData.headingAccent}</span>
          </h1>

          {/* Description */}
          <p className={`text-white/90 text-lg md:text-xl mb-10 max-w-2xl transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {heroData.description}
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
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

          {/* Simple Stats Bar */}
          <div className={`mt-20 flex flex-wrap gap-8 transition-all duration-700 delay-400 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {heroData.stats.map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  );
}