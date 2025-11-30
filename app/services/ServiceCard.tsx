'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

interface Service {
  id: string;
  slug: string;
  title: string;
  heroDescription: string;
}

interface ServiceCardProps {
  service: Service;
  highlightedTitle?: ReactNode;
  highlightedDescription?: ReactNode;
}

export default function ServiceCard({ service, highlightedTitle, highlightedDescription }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`}>
      <div className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-[#26AFFF] hover:shadow-lg transition-all duration-300 h-full">
        <h3 className="text-2xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#0057FF] transition-colors">
          {highlightedTitle || service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          {highlightedDescription || service.heroDescription}
        </p>
        <div className="flex items-center text-[#26AFFF] font-semibold">
          Learn more
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
