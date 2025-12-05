'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CTASection from '@/components/CTASection';

interface Department {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
}

interface CareerPosition {
  id: string;
  title: string;
  slug: string;
  department: string | Department;
  location: string;
  type: string;
  experience: string;
  description: {
    root: {
      children: Array<{
        children: Array<{
          text: string;
        }>;
      }>;
    };
  };
}

interface MediaImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface ImpactSection {
  title: string;
  content: string;
  image?: string | MediaImage;
  displayTitle?: string;
  displaySubtitle?: string;
}

interface CultureCard {
  title: string;
  description: string;
  image?: string | MediaImage;
}

interface Benefit {
  title: string;
  description: string;
}

interface OpenPositions {
  heading?: string;
  description?: string;
}

interface ButtonLink {
  text?: string;
  link?: string;
}

interface CTA {
  heading?: string;
  description?: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
}

interface PageData {
  whyJoinIntro?: {
    heading: string;
    description: string;
  };
  highlightSections?: {
    highlightSection1?: ImpactSection;
    highlightSection2?: ImpactSection;
    highlightSection3?: ImpactSection;
  };
  culture?: {
    cultureCard1?: CultureCard;
    cultureCard2?: CultureCard;
    cultureCard3?: CultureCard;
  };
  benefitsSection?: {
    benefitsHeading?: string;
    benefits?: Benefit[];
  };
  openPositions?: OpenPositions;
  cta?: CTA;
}

interface CareersPageContentProps {
  positions: CareerPosition[];
  pageData: PageData;
  departments: Department[];
}

export default function CareersPageContent({ positions, pageData, departments }: CareersPageContentProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getDepartmentName = (dept: string | Department): string => {
    if (typeof dept === 'string') return dept;
    return dept.name;
  };

  const departmentList = ["All", ...departments.map(d => d.name)];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const openingsSection = document.getElementById('openings');
    if (openingsSection) {
      openingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ?
            <span key={i} className="bg-[#26AFFF]/20 text-[#0057FF] font-semibold">{part}</span> :
            part
        )}
      </>
    );
  };

  const getDescriptionText = (description: CareerPosition['description']): string => {
    try {
      return description?.root?.children?.[0]?.children?.[0]?.text || '';
    } catch {
      return '';
    }
  };

  const filteredPositions = positions.filter(position => {
    const deptName = getDepartmentName(position.department);

    const matchesDepartment = selectedDepartment === "All" || deptName === selectedDepartment;
    const descriptionText = getDescriptionText(position.description);
    const matchesSearch = searchQuery === "" ||
      position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      descriptionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deptName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.experience.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDepartment && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPositions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPositions = filteredPositions.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDepartment, searchQuery]);

  return (
    <>
      {/* Why Join Section */}
      {pageData?.whyJoinIntro && (
        <section id="culture" className="py-24">
          <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
                {pageData.whyJoinIntro.heading}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {pageData.whyJoinIntro.description}
              </p>
            </div>

          <div className="space-y-24 lg:space-y-32">
            {[
              { section: pageData.highlightSections?.highlightSection1, index: 0 },
              { section: pageData.highlightSections?.highlightSection2, index: 1 },
              { section: pageData.highlightSections?.highlightSection3, index: 2 }
            ].filter(item => item.section).map(({ section, index }) => {
              const isEven = index % 2 === 0;
              const gradients = [
                'from-[#0057FF] via-[#007A8F] to-[#26AFFF]',
                'from-[#0077BE] via-[#00A8CC] to-[#00C9FF]',
                'from-[#60A5FA] to-[#DBEAFE]'
              ];

              return (
                <div key={index} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className={`lg:col-span-5 ${!isEven ? 'lg:col-start-8 lg:order-2' : ''}`}>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#2C3E50] mb-6">
                      {section!.title}
                    </h3>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                      {section!.content.split('\n\n').map((paragraph: string, pIndex: number) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  <div className={`lg:col-span-6 ${isEven ? 'lg:col-start-7' : 'lg:col-start-1 lg:order-1'}`}>
                    {section!.image ? (
                      <div className="relative h-[350px] rounded-2xl overflow-hidden">
                        <Image
                          src={typeof section!.image === 'string' ? section!.image : section!.image.url}
                          alt={section!.title}
                          className="w-full h-full object-cover"
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    ) : (
                      <div className={`relative h-[350px] bg-gradient-to-br ${gradients[index % 3]} rounded-2xl overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-center p-8">
                            <div className="text-6xl font-bold mb-2">{section!.displayTitle}</div>
                            <div className="text-lg">{section!.displaySubtitle}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {(pageData.culture?.cultureCard1 || pageData.culture?.cultureCard2 || pageData.culture?.cultureCard3) && (
            <div className="mt-24">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { card: pageData.culture?.cultureCard1, index: 0 },
                  { card: pageData.culture?.cultureCard2, index: 1 },
                  { card: pageData.culture?.cultureCard3, index: 2 }
                ].filter(item => item.card).map(({ card, index }) => {
                  const gradients = [
                    'from-[#0057FF] to-[#26AFFF]',
                    'from-[#0077BE] to-[#00A8CC]',
                    'from-[#60A5FA] to-[#DBEAFE]'
                  ];

                  return (
                    <div key={index} className={`relative h-56 bg-gradient-to-br ${gradients[index % 3]} rounded-2xl overflow-hidden group`}>
                      {card!.image ? (
                        <>
                          <Image
                            src={typeof card!.image === 'string' ? card!.image : card!.image.url}
                            alt={card!.title}
                            className="w-full h-full object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute inset-0 flex items-end p-6">
                            <div className="text-white">
                              <h3 className="text-xl font-bold mb-2">{card!.title}</h3>
                              <p className="text-white/90 text-sm">{card!.description}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-center p-6">
                            <h3 className="text-xl font-bold mb-2">{card!.title}</h3>
                            <p className="text-white/80 text-sm">{card!.description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {pageData.benefitsSection?.benefits && pageData.benefitsSection.benefits.length > 0 && (
            <div className="mt-24 pt-20 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-[#2C3E50] text-center mb-12">
                {pageData.benefitsSection.benefitsHeading || 'Beyond the Work'}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {pageData.benefitsSection.benefits.map((benefit: Benefit, index: number) => (
                  <div key={index}>
                    <h4 className="font-semibold text-[#0057FF] mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      )}

      {/* Current Openings */}
      <section id="openings" className="py-24 bg-gray-50 border-t border-gray-200 scroll-mt-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
          <div className="max-w-3xl mb-12 mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4">
              {pageData?.openPositions?.heading || 'Open Positions'}
            </h2>
            <p className="text-xl text-gray-600">
              {pageData?.openPositions?.description || 'Join our team of experts working on India\'s most challenging water infrastructure projects.'}
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by role, department, location, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#26AFFF] focus:bg-white transition-all duration-200"
              />
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                Found {filteredPositions.length} {filteredPositions.length === 1 ? 'position' : 'positions'}
              </p>
            )}
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              {departmentList.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedDepartment === dept
                      ? 'bg-[#0057FF] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dept}
                  {dept !== 'All' && (
                    <span className="ml-2 text-xs opacity-75">
                      ({positions.filter(p => getDepartmentName(p.department) === dept).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {paginatedPositions.map((position) => {
              const displayDept = getDepartmentName(position.department);
              const descriptionText = getDescriptionText(position.description);

              return (
                <Link
                  key={position.id}
                  href={`/careers/${position.slug}`}
                  className="group block bg-white border border-gray-300 rounded-xl hover:border-[#26AFFF] hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6 lg:p-8">
                    <div className="grid lg:grid-cols-12 gap-6 items-start">
                      <div className="lg:col-span-8">
                        <h3 className="text-xl lg:text-2xl font-bold text-[#2C3E50] group-hover:text-[#0057FF] transition-colors mb-3">
                          {highlightText(position.title, searchQuery)}
                        </h3>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {highlightText(descriptionText, searchQuery)}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {highlightText(displayDept, searchQuery)}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {highlightText(position.location, searchQuery)}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#26AFFF]/10 text-[#0057FF]">
                            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {position.type === 'full-time' ? 'Full-time' : position.type}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#0057FF]/10 text-[#0057FF]">
                            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {highlightText(position.experience, searchQuery)}
                          </span>
                        </div>
                      </div>

                      <div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
                        <div className="inline-flex items-center text-[#0057FF] font-semibold group-hover:text-[#26AFFF] transition-colors">
                          <span className="mr-2">View Details</span>
                          <div className="w-8 h-8 rounded-full bg-[#0057FF]/10 flex items-center justify-center group-hover:bg-[#26AFFF]/10 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredPositions.length === 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg mb-2">No positions available in this category</p>
                <p className="text-gray-500">Check back soon or explore other departments</p>
              </div>
            </div>
          )}

          {filteredPositions.length > 0 && totalPages > 1 && (
            <div className="max-w-4xl mx-auto mt-8">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredPositions.length)} of {filteredPositions.length} total positions
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          currentPage === page
                            ? 'bg-[#0057FF] text-white shadow-md'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-1 text-gray-400">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {pageData?.cta && (
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <CTASection
              title={pageData.cta.heading || ''}
              description={pageData.cta.description || ''}
              primaryButtonText={pageData.cta.primaryButton?.text || ''}
              primaryButtonHref={pageData.cta.primaryButton?.link || ''}
              secondaryButtonText={pageData.cta.secondaryButton?.text}
              secondaryButtonHref={pageData.cta.secondaryButton?.link}
            />
          </div>
        </section>
      )}
    </>
  );
}
