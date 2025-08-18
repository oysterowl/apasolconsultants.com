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
                <div className="absolute top-full left-0 mt-1 w-56 dropdown-content">
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#005F73] to-[#00C9C9] p-3">
                      <p className="text-white text-xs font-semibold uppercase tracking-wider">Our Work</p>
                    </div>
                    <div className="p-2">
                      <Link href="/projects" 
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 hover:text-[#005F73] rounded-lg transition-all duration-300 group">
                        <div className="font-medium mb-1">Completed Projects</div>
                        <div className="text-xs text-gray-500 group-hover:text-[#00C9C9]">View our portfolio</div>
                      </Link>
                      <Link href="/projects#capacity" 
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 hover:text-[#005F73] rounded-lg transition-all duration-300 group">
                        <div className="font-medium mb-1">Our Capacity</div>
                        <div className="text-xs text-gray-500 group-hover:text-[#00C9C9]">Technical capabilities</div>
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
                <div className="absolute top-full left-0 mt-1 w-72 dropdown-content">
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#005F73] to-[#00C9C9] p-3">
                      <p className="text-white text-xs font-semibold uppercase tracking-wider">Industries We Serve</p>
                    </div>
                    <div className="p-2 max-h-96 overflow-y-auto">
                      <Link href="/sectors#drinking-water" 
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#3498DB]/5 hover:to-[#00C9C9]/5 hover:text-[#005F73] rounded-lg transition-all duration-300 group">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-lg bg-[#3498DB]/10 flex items-center justify-center mr-3 group-hover:bg-[#3498DB]/20 transition-colors">
                            <svg className="w-4 h-4 text-[#3498DB]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium mb-0.5">Drinking Water Supply</div>
                            <div className="text-xs text-gray-500">Treatment & distribution systems</div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link href="/sectors#wastewater" 
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#00C9C9]/5 hover:to-[#3498DB]/5 hover:text-[#005F73] rounded-lg transition-all duration-300 group">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-lg bg-[#00C9C9]/10 flex items-center justify-center mr-3 group-hover:bg-[#00C9C9]/20 transition-colors">
                            <svg className="w-4 h-4 text-[#00C9C9]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium mb-0.5">Waste Water Treatment</div>
                            <div className="text-xs text-gray-500">Collection & treatment solutions</div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link href="/sectors#water-reuse" 
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#27AE60]/5 hover:to-[#00C9C9]/5 hover:text-[#005F73] rounded-lg transition-all duration-300 group">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-lg bg-[#27AE60]/10 flex items-center justify-center mr-3 group-hover:bg-[#27AE60]/20 transition-colors">
                            <svg className="w-4 h-4 text-[#27AE60]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium mb-0.5">Waste Water Re-Use</div>
                            <div className="text-xs text-gray-500">Recycling & reclamation systems</div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link href="/sectors#storm-water" 
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#3498DB]/5 hover:text-[#005F73] rounded-lg transition-all duration-300 group">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-lg bg-[#005F73]/10 flex items-center justify-center mr-3 group-hover:bg-[#005F73]/20 transition-colors">
                            <svg className="w-4 h-4 text-[#005F73]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium mb-0.5">Storm Water Drainage</div>
                            <div className="text-xs text-gray-500">Flood management systems</div>
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