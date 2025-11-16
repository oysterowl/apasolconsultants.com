'use client';

import Header from '@/components/HeaderWrapper';
import FooterWrapper from '@/components/FooterWrapper';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* 404 Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-12 py-32 lg:py-40">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 */}
            <h1 className="text-8xl lg:text-9xl font-bold text-[#0057FF] mb-8">
              404
            </h1>

            {/* Message */}
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-4">
              Page not found
            </h2>
            <p className="text-lg text-[#808080] mb-12 max-w-lg mx-auto">
              The page you are looking for doesn&apos;t exist or has been moved.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-[#0057FF] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#0046cc] transition-all duration-200 shadow-lg shadow-[#0057FF]/25 hover:shadow-xl hover:shadow-[#0057FF]/30"
              >
                Back to Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-gray-700 px-8 py-3.5 rounded-full font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FooterWrapper />
    </div>
  );
}
