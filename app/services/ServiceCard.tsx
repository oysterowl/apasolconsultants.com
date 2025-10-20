'use client';

import Link from 'next/link';

interface Service {
  id: string;
  slug: string;
  title: string;
  heroDescription: string;
}

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`}>
      <div className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-[#26AFFF] hover:shadow-lg transition-all duration-300 h-full">
        <div className="w-14 h-14 bg-[#26AFFF]/10 rounded-xl flex items-center justify-center mb-6 text-[#26AFFF]">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#0057FF] transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          {service.heroDescription}
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
