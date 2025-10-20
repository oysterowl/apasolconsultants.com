'use client';

import { useState, useEffect } from 'react';

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

interface CertificationCarouselProps {
  certifications: Certification[];
}

export default function CertificationCarousel({ certifications }: CertificationCarouselProps) {
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000;
    const fps = 60;
    const updateInterval = 1000 / fps;
    const increment = 100 / (duration / updateInterval);

    let animationFrame: number;
    let lastTime = Date.now();
    let currentProgress = 0;

    const animate = () => {
      const now = Date.now();
      const deltaTime = now - lastTime;

      if (deltaTime >= updateInterval) {
        currentProgress += increment * (deltaTime / updateInterval);

        if (currentProgress >= 100) {
          currentProgress = 0;
          setCurrentCertIndex((prev) => (prev + 1) % certifications.length);
        }

        setProgress(currentProgress);
        lastTime = now;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [certifications.length]);

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        {/* Current Certification */}
        <div className="bg-white border border-gray-200 rounded-2xl px-12 py-10 shadow-lg">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#0057FF] mb-3">
              {certifications[currentCertIndex].name}
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              {certifications[currentCertIndex].issuer}
            </p>
            <span className="inline-block px-4 py-2 bg-[#26AFFF]/10 text-[#26AFFF] rounded-full text-sm font-semibold uppercase tracking-wide">
              Certified {certifications[currentCertIndex].year}
            </span>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentCertIndex((prev) => (prev - 1 + certifications.length) % certifications.length)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
          aria-label="Previous certification"
        >
          <svg className="w-5 h-5 text-[#0057FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentCertIndex((prev) => (prev + 1) % certifications.length)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
          aria-label="Next certification"
        >
          <svg className="w-5 h-5 text-[#0057FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator with Progress */}
      <div className="flex justify-center mt-8 gap-2">
        {certifications.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentCertIndex(index);
              setProgress(0);
            }}
            className={`relative overflow-hidden rounded-full transition-all duration-300 ${
              index === currentCertIndex
                ? 'w-10 h-2.5 bg-gray-300'
                : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to certification ${index + 1}`}
          >
            {index === currentCertIndex && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#0057FF] to-[#26AFFF] origin-left"
                style={{
                  transform: `scaleX(${progress / 100})`,
                  transition: 'none',
                  willChange: 'transform'
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
