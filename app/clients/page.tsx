'use client';

import Header from '@/components/Header';
import ClientFooterWrapper from '@/components/ClientFooterWrapper';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';

export default function ClientsPage() {
  const clients = [
    {
      category: 'Municipal Corporations',
      logos: [
        { name: 'Municipal Corporation A', alt: 'Municipal Corporation A' },
        { name: 'Municipal Corporation B', alt: 'Municipal Corporation B' },
        { name: 'Municipal Corporation C', alt: 'Municipal Corporation C' },
      ]
    },
    {
      category: 'State Water Boards',
      logos: [
        { name: 'State Water Board A', alt: 'State Water Board A' },
        { name: 'State Water Board B', alt: 'State Water Board B' },
      ]
    },
    {
      category: 'Industrial Partners',
      logos: [
        { name: 'Industrial Partner A', alt: 'Industrial Partner A' },
        { name: 'Industrial Partner B', alt: 'Industrial Partner B' },
        { name: 'Industrial Partner C', alt: 'Industrial Partner C' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        variant="secondary"
        badge="Our Partners"
        title="Trusted by Leading Organizations"
        description="We&apos;re proud to partner with municipalities, government bodies, and industries across India to deliver world-class water infrastructure solutions."
      />

      {/* Clients Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
          <div className="space-y-16">
            {clients.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8 text-center">
                  {section.category}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {section.logos.map((logo, logoIdx) => (
                    <div
                      key={logoIdx}
                      className="bg-[#f8f9fa] rounded-xl p-8 flex items-center justify-center min-h-[150px] border border-gray-200 hover:border-[#26AFFF] hover:shadow-lg transition-all duration-200"
                    >
                      <p className="text-center text-[#808080] font-medium">
                        {logo.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Delivering excellence across diverse sectors and geographies
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">50+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Active Clients</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">15+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">States Served</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">100%</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Client Satisfaction</p>
            </div>
            <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
            <div className="text-center relative">
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">8+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Years of Trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-[#808080]">
              Hear from the organizations we&apos;ve partnered with
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#f8f9fa] rounded-2xl p-8 border border-gray-200"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-[#26AFFF]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#808080] mb-4 leading-relaxed">
                  &ldquo;APASOL delivered exceptional results on our water treatment project. Their expertise and professionalism were outstanding.&rdquo;
                </p>
                <div className="border-t border-gray-300 pt-4">
                  <p className="font-bold text-[#1a1a1a]">Client Name</p>
                  <p className="text-sm text-[#808080]">Organization Title</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Partner With Us?"
        description="Join leading organizations across India who trust APASOL for their water infrastructure projects."
        primaryButtonText="Start a Project"
        primaryButtonHref="/contact"
        secondaryButtonText="View Our Work"
        secondaryButtonHref="/projects"
      />
      <ClientFooterWrapper />
    </div>
  );
}
