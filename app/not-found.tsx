'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
            <h1 className="text-8xl lg:text-9xl font-bold text-[#005F73] mb-8">
              404
            </h1>

            {/* Message */}
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
              Page not found
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-lg mx-auto">
              The page you are looking for doesn&apos;t exist or has been moved.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-[#005F73] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#004A5C] transition-colors shadow-md"
              >
                Back to Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center bg-white text-[#005F73] px-6 py-3 rounded-full font-semibold border border-gray-200 hover:border-[#00C9C9] hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}