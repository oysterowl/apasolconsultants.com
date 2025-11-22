'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Client {
  name: string;
  alt?: string;
  logo?: { url?: string } | string;
  website?: string;
}

interface ClientsPageContentProps {
  clients: Client[];
}

export default function ClientsPageContent({ clients }: ClientsPageContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = clients.slice(startIndex, endIndex);

  const buildLogoUrl = (logo: Client['logo']) => {
    if (!logo) return undefined;
    const url = typeof logo === 'string' ? logo : logo.url;
    if (!url) return undefined;
    if (url.startsWith('http')) return url;
    const cms = process.env.NEXT_PUBLIC_CMS_URL;
    return cms ? `${cms}${url}` : url;
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-4">
            Our Clients
          </h2>
          <p className="text-lg text-[#808080]">
            Trusted partners across municipalities, government bodies, and industries
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentClients.map((client, idx) => {
            const logoUrl = buildLogoUrl(client.logo);
            const card = (
              <div className="flex flex-col items-center w-full">
                <div className="bg-[#f8f9fa] rounded-xl p-8 flex items-center justify-center min-h-[180px] border border-gray-200 hover:border-[#26AFFF] hover:shadow-[0_10px_30px_rgba(38,175,255,0.25)] transition-all duration-200 w-full">
                  <div className="w-full flex items-center justify-center h-28">
                    {logoUrl ? (
                      <div className="relative w-full h-28">
                        <Image
                          src={logoUrl}
                          alt={client.alt || client.name}
                          fill
                          sizes="220px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0057FF]/10 to-[#26AFFF]/10 rounded-lg" />
                    )}
                  </div>
                </div>
                <p className="text-center text-gray-600 font-semibold text-sm mt-3">
                  {client.name}
                </p>
              </div>
            );

            const href =
              client.website && client.website.startsWith('http')
                ? client.website
                : client.website
                  ? `https://${client.website.replace(/^https?:\/\//, '')}`
                  : undefined;

            return href ? (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                {card}
              </a>
            ) : (
              <div key={idx}>{card}</div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              aria-label="Previous page"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-[#0057FF] text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              aria-label="Next page"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
