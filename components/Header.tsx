'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [sectorsDropdownOpen, setSectorsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const projectsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectorsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProjectsDropdownOpen(false);
    setSectorsDropdownOpen(false);
  }, [pathname]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && pathname === '/') {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleProjectsEnter = () => {
    if (projectsTimeoutRef.current) {
      clearTimeout(projectsTimeoutRef.current);
    }
    setProjectsDropdownOpen(true);
  };

  const handleProjectsLeave = () => {
    projectsTimeoutRef.current = setTimeout(() => {
      setProjectsDropdownOpen(false);
    }, 150);
  };

  const handleSectorsEnter = () => {
    if (sectorsTimeoutRef.current) {
      clearTimeout(sectorsTimeoutRef.current);
    }
    setSectorsDropdownOpen(true);
  };

  const handleSectorsLeave = () => {
    sectorsTimeoutRef.current = setTimeout(() => {
      setSectorsDropdownOpen(false);
    }, 150);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-2' 
        : 'bg-white/80 backdrop-blur-sm py-4'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link href="/" className="group flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#005F73]/10 to-[#00C9C9]/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center">
                <Image 
                  src="/apasol-logo.png" 
                  alt="APASOL Consultants" 
                  width={180} 
                  height={60} 
                  className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
            <div className="hidden lg:block border-l-2 border-gray-300 pl-3 ml-1">
              <p className="text-xs text-gray-500 font-medium tracking-wider uppercase leading-tight">
                Water Engineering
              </p>
              <p className="text-xs text-gray-500 font-medium tracking-wider uppercase leading-tight">
                Consultants
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/#services" 
              onClick={(e) => handleSmoothScroll(e, '#services')}
              className="px-5 py-3 text-gray-700 hover:text-[#005F73] font-medium transition-all duration-300 hover:bg-gray-50 rounded-lg"
            >
              Services
            </Link>

            {/* Projects Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleProjectsEnter}
              onMouseLeave={handleProjectsLeave}
            >
              <button
                className="px-5 py-3 text-gray-700 hover:text-[#005F73] font-medium transition-all duration-300 hover:bg-gray-50 rounded-lg flex items-center group"
              >
                Projects
                <svg className={`ml-1.5 w-4 h-4 transition-transform duration-300 ${projectsDropdownOpen ? 'rotate-180' : ''}`} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {projectsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 dropdown-content">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/20 overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
                    {/* Premium header with subtle animation */}
                    <div className="relative bg-gradient-to-r from-[#005F73] via-[#007A8F] to-[#00C9C9] p-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
                      <p className="relative text-white text-xs font-bold uppercase tracking-widest">Our Work</p>
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-white/20 via-white/50 to-white/20"></div>
                    </div>
                    <div className="p-2">
                      <Link href="/projects" 
                            className="block px-5 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/8 hover:to-[#00C9C9]/8 hover:text-[#005F73] rounded-xl transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#005F73]/0 to-[#00C9C9]/0 group-hover:from-[#005F73]/5 group-hover:to-[#00C9C9]/5 transition-all duration-300"></div>
                        <div className="relative flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-[#005F73]/10 flex items-center justify-center mr-4 group-hover:bg-[#005F73]/15 group-hover:scale-105 transition-all duration-300">
                            <svg className="w-5 h-5 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-sm mb-1">Completed Projects</div>
                            <div className="text-xs text-gray-500 group-hover:text-[#00C9C9] transition-colors">View our portfolio</div>
                          </div>
                        </div>
                      </Link>
                      <Link href="/projects#capacity" 
                            className="block px-5 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/8 hover:to-[#00C9C9]/8 hover:text-[#005F73] rounded-xl transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#005F73]/0 to-[#00C9C9]/0 group-hover:from-[#005F73]/5 group-hover:to-[#00C9C9]/5 transition-all duration-300"></div>
                        <div className="relative flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-[#00C9C9]/10 flex items-center justify-center mr-4 group-hover:bg-[#00C9C9]/15 group-hover:scale-105 transition-all duration-300">
                            <svg className="w-5 h-5 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-sm mb-1">Our Capacity</div>
                            <div className="text-xs text-gray-500 group-hover:text-[#00C9C9] transition-colors">Technical capabilities</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sectors Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleSectorsEnter}
              onMouseLeave={handleSectorsLeave}
            >
              <button
                className="px-5 py-3 text-gray-700 hover:text-[#005F73] font-medium transition-all duration-300 hover:bg-gray-50 rounded-lg flex items-center group"
              >
                Sectors
                <svg className={`ml-1.5 w-4 h-4 transition-transform duration-300 ${sectorsDropdownOpen ? 'rotate-180' : ''}`} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {sectorsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 dropdown-content">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/20 overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
                    {/* Premium header with subtle animation */}
                    <div className="relative bg-gradient-to-r from-[#005F73] via-[#007A8F] to-[#00C9C9] p-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
                      <p className="relative text-white text-xs font-bold uppercase tracking-widest">Industries We Serve</p>
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-white/20 via-white/50 to-white/20"></div>
                    </div>
                    <div className="p-2 max-h-96 overflow-y-auto">
                      <Link href="/sectors#drinking-water" 
                            className="block px-5 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#3498DB]/8 hover:to-[#00C9C9]/8 hover:text-[#005F73] rounded-xl transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#3498DB]/0 to-[#00C9C9]/0 group-hover:from-[#3498DB]/5 group-hover:to-[#00C9C9]/5 transition-all duration-300"></div>
                        <div className="relative flex items-start">
                          <div className="w-12 h-12 rounded-xl bg-[#3498DB]/10 flex items-center justify-center mr-4 group-hover:bg-[#3498DB]/15 group-hover:scale-105 transition-all duration-300">
                            <svg className="w-6 h-6 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm mb-1">Drinking Water Supply</div>
                            <div className="text-xs text-gray-500 group-hover:text-[#3498DB] transition-colors">Treatment & distribution systems</div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link href="/sectors#wastewater" 
                            className="block px-5 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#00C9C9]/8 hover:to-[#3498DB]/8 hover:text-[#005F73] rounded-xl transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00C9C9]/0 to-[#3498DB]/0 group-hover:from-[#00C9C9]/5 group-hover:to-[#3498DB]/5 transition-all duration-300"></div>
                        <div className="relative flex items-start">
                          <div className="w-12 h-12 rounded-xl bg-[#00C9C9]/10 flex items-center justify-center mr-4 group-hover:bg-[#00C9C9]/15 group-hover:scale-105 transition-all duration-300">
                            <svg className="w-6 h-6 text-[#00C9C9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm mb-1">Waste Water Treatment</div>
                            <div className="text-xs text-gray-500 group-hover:text-[#00C9C9] transition-colors">Collection & treatment solutions</div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link href="/sectors#water-reuse" 
                            className="block px-5 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#27AE60]/8 hover:to-[#00C9C9]/8 hover:text-[#005F73] rounded-xl transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#27AE60]/0 to-[#00C9C9]/0 group-hover:from-[#27AE60]/5 group-hover:to-[#00C9C9]/5 transition-all duration-300"></div>
                        <div className="relative flex items-start">
                          <div className="w-12 h-12 rounded-xl bg-[#27AE60]/10 flex items-center justify-center mr-4 group-hover:bg-[#27AE60]/15 group-hover:scale-105 transition-all duration-300">
                            <svg className="w-6 h-6 text-[#27AE60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm mb-1">Waste Water Re-Use</div>
                            <div className="text-xs text-gray-500 group-hover:text-[#27AE60] transition-colors">Recycling & reclamation systems</div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link href="/sectors#storm-water" 
                            className="block px-5 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/8 hover:to-[#3498DB]/8 hover:text-[#005F73] rounded-xl transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#005F73]/0 to-[#3498DB]/0 group-hover:from-[#005F73]/5 group-hover:to-[#3498DB]/5 transition-all duration-300"></div>
                        <div className="relative flex items-start">
                          <div className="w-12 h-12 rounded-xl bg-[#005F73]/10 flex items-center justify-center mr-4 group-hover:bg-[#005F73]/15 group-hover:scale-105 transition-all duration-300">
                            <svg className="w-6 h-6 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm mb-1">Storm Water Drainage</div>
                            <div className="text-xs text-gray-500 group-hover:text-[#005F73] transition-colors">Flood management systems</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="px-5 py-3 text-gray-700 hover:text-[#005F73] font-medium transition-all duration-300 hover:bg-gray-50 rounded-lg">
              About
            </Link>
            <Link href="/careers" className="px-5 py-3 text-gray-700 hover:text-[#005F73] font-medium transition-all duration-300 hover:bg-gray-50 rounded-lg">
              Careers
            </Link>
            <Link href="/contact" className="px-5 py-3 text-gray-700 hover:text-[#005F73] font-medium transition-all duration-300 hover:bg-gray-50 rounded-lg">
              Contact Us
            </Link>
            
            <Link href="/contact" className="ml-4 btn-primary !py-3 !px-6 !text-sm">
              Get Started
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-gradient-to-r from-[#005F73]/5 to-[#00C9C9]/5 hover:from-[#005F73]/10 hover:to-[#00C9C9]/10 transition-all duration-300"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-[#005F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-4">
            <Link 
              href="/#services"
              onClick={(e) => handleSmoothScroll(e, '#services')}
              className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 rounded-xl transition-all duration-300 font-medium"
            >
              Services
            </Link>
            
            <div className="my-2">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</p>
              <Link href="/projects" className="block px-4 py-2 pl-8 text-gray-700 hover:text-[#005F73] transition-colors">
                Completed Projects
              </Link>
              <Link href="/projects#capacity" className="block px-4 py-2 pl-8 text-gray-700 hover:text-[#005F73] transition-colors">
                Our Capacity
              </Link>
            </div>

            <div className="my-2">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sectors</p>
              <Link href="/sectors#drinking-water" className="block px-4 py-2 pl-8 text-gray-700 hover:text-[#005F73] transition-colors text-sm">
                Drinking Water Supply
              </Link>
              <Link href="/sectors#wastewater" className="block px-4 py-2 pl-8 text-gray-700 hover:text-[#005F73] transition-colors text-sm">
                Waste Water Treatment
              </Link>
              <Link href="/sectors#water-reuse" className="block px-4 py-2 pl-8 text-gray-700 hover:text-[#005F73] transition-colors text-sm">
                Waste Water Re-Use
              </Link>
              <Link href="/sectors#storm-water" className="block px-4 py-2 pl-8 text-gray-700 hover:text-[#005F73] transition-colors text-sm">
                Storm Water Drainage
              </Link>
            </div>

            <Link href="/about" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 rounded-xl transition-all duration-300 font-medium">
              About
            </Link>
            <Link href="/careers" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 rounded-xl transition-all duration-300 font-medium">
              Careers
            </Link>
            <Link href="/contact" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 rounded-xl transition-all duration-300 font-medium">
              Contact Us
            </Link>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link href="/contact" className="block w-full text-center btn-primary !py-3">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}