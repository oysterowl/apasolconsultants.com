'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from './Button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Pages with light/colored hero sections need immediate navbar background
      const pagesWithColoredHero = ['/projects', '/sectors', '/contact', '/about'];
      
      if (pagesWithColoredHero.includes(pathname)) {
        setScrolled(window.scrollY > 50);
      } else {
        // Get viewport height to trigger near bottom of hero section
        const viewportHeight = window.innerHeight;
        setScrolled(window.scrollY > viewportHeight - 100);
      }
    };
    
    // Check initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && pathname === '/') {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleDropdownEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = (e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    // Check if we're moving to another dropdown trigger or the dropdown itself
    if (!relatedTarget?.closest('[data-dropdown-trigger]') && !relatedTarget?.closest('[data-dropdown-content]')) {
      setActiveDropdown(null);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/98 backdrop-blur-xl shadow-[0_1px_3px_rgb(0,0,0,0.05)] py-4' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-[1600px]">
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
            <div className={`hidden lg:block border-l-2 pl-3 ml-1 ${
              scrolled ? 'border-gray-300' : 'border-white/50'
            }`}>
              <p className={`text-xs font-medium tracking-wider uppercase leading-tight ${
                scrolled ? 'text-gray-500' : 'text-white/90'
              }`}>
                Water Engineering
              </p>
              <p className={`text-xs font-medium tracking-wider uppercase leading-tight ${
                scrolled ? 'text-gray-500' : 'text-white/90'
              }`}>
                Consultants
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link href="/about" className={`px-5 py-2.5 text-[15px] font-medium transition-colors duration-150 rounded-xl relative group ${
              scrolled 
                ? 'text-gray-600 hover:text-[#005F73]' 
                : 'text-white hover:text-[#005F73]'
            }`}>
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-gray-50/70 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-200 origin-center" />
            </Link>

            <Link 
              href="/#services" 
              onClick={(e) => handleSmoothScroll(e, '#services')}
              className={`px-5 py-2.5 text-[15px] font-medium transition-colors duration-150 rounded-xl relative group ${
                scrolled 
                  ? 'text-gray-600 hover:text-[#005F73]' 
                  : 'text-white hover:text-[#005F73]'
              }`}
            >
              <span className="relative z-10">Services</span>
              <div className="absolute inset-0 bg-gray-50/70 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-150 origin-center" />
            </Link>

            <Link href="/projects" className={`px-5 py-2.5 text-[15px] font-medium transition-colors duration-150 rounded-xl relative group ${
              scrolled 
                ? 'text-gray-600 hover:text-[#005F73]' 
                : 'text-white hover:text-[#005F73]'
            }`}>
              <span className="relative z-10">Projects</span>
              <div className="absolute inset-0 bg-gray-50/70 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-150 origin-center" />
            </Link>

            {/* Sectors Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('sectors')}
              onMouseLeave={handleDropdownLeave}
              data-dropdown-trigger
            >
              <button
                className={`px-5 py-2.5 text-[15px] font-medium transition-colors duration-150 rounded-xl flex items-center group relative ${
                  scrolled 
                    ? 'text-gray-600 hover:text-[#005F73]' 
                    : 'text-white hover:text-[#005F73]'
                }`}
              >
                <span className="relative z-10 flex items-center">
                  Sectors
                  <svg className={`ml-1.5 w-3.5 h-3.5 transition-transform duration-100 ${activeDropdown === 'sectors' ? 'rotate-180' : ''}`} 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gray-50/70 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-200 origin-center" />
              </button>
              
              <div 
                className={`absolute top-full left-0 mt-2 w-[600px] ${activeDropdown === 'sectors' ? 'block' : 'hidden'}`}
                data-dropdown-content
              >
                <div className="bg-white rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden p-4">
                  <div className="grid grid-cols-2 gap-1">
                    <Link href="/sectors#municipal" 
                          className="block px-4 py-3.5 text-gray-600 hover:bg-gray-50 hover:text-[#005F73] rounded-xl transition-all duration-150 group">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#005F73]/10 group-hover:to-[#00C9C9]/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-all duration-200">
                          <svg className="w-6 h-6 text-gray-500 group-hover:text-[#005F73] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[15px]">Municipal Water Infrastructure</div>
                          <div className="text-[13px] text-gray-500 mt-0.5">Urban water supply & sanitation</div>
                        </div>
                      </div>
                    </Link>
                    
                    <Link href="/sectors#wastewater" 
                          className="block px-4 py-3.5 text-gray-600 hover:bg-gray-50 hover:text-[#005F73] rounded-xl transition-all duration-150 group">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#005F73]/10 group-hover:to-[#00C9C9]/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-all duration-200">
                          <svg className="w-6 h-6 text-gray-500 group-hover:text-[#00C9C9] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[15px]">Wastewater Management</div>
                          <div className="text-[13px] text-gray-500 mt-0.5">Treatment & disposal solutions</div>
                        </div>
                      </div>
                    </Link>
                    
                    <Link href="/sectors#industrial" 
                          className="block px-4 py-3.5 text-gray-600 hover:bg-gray-50 hover:text-[#005F73] rounded-xl transition-all duration-150 group">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#005F73]/10 group-hover:to-[#00C9C9]/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-all duration-200">
                          <svg className="w-6 h-6 text-gray-500 group-hover:text-[#005F73] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[15px]">Industrial Solutions</div>
                          <div className="text-[13px] text-gray-500 mt-0.5">Process water & effluent treatment</div>
                        </div>
                      </div>
                    </Link>
                    
                    <Link href="/sectors#rural" 
                          className="block px-4 py-3.5 text-gray-600 hover:bg-gray-50 hover:text-[#005F73] rounded-xl transition-all duration-150 group">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#005F73]/10 group-hover:to-[#00C9C9]/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-all duration-200">
                          <svg className="w-6 h-6 text-gray-500 group-hover:text-[#00C9C9] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[15px]">Rural Development</div>
                          <div className="text-[13px] text-gray-500 mt-0.5">Sustainable water for communities</div>
                        </div>
                      </div>
                    </Link>
                    
                    <Link href="/sectors#stormwater" 
                          className="block px-4 py-3.5 text-gray-600 hover:bg-gray-50 hover:text-[#005F73] rounded-xl transition-all duration-150 group">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#005F73]/10 group-hover:to-[#00C9C9]/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-all duration-200">
                          <svg className="w-6 h-6 text-gray-500 group-hover:text-[#005F73] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[15px]">Stormwater Management</div>
                          <div className="text-[13px] text-gray-500 mt-0.5">Drainage & flood control</div>
                        </div>
                      </div>
                    </Link>
                    
                    <Link href="/sectors#smart-water" 
                          className="block px-4 py-3.5 text-gray-600 hover:bg-gray-50 hover:text-[#005F73] rounded-xl transition-all duration-150 group">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#005F73]/10 group-hover:to-[#00C9C9]/10 flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-all duration-200">
                          <svg className="w-6 h-6 text-gray-500 group-hover:text-[#00C9C9] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[15px]">Smart Water Solutions</div>
                          <div className="text-[13px] text-gray-500 mt-0.5">IoT & digital infrastructure</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <Link href="/careers" className={`px-5 py-2.5 text-[15px] font-medium transition-colors duration-150 rounded-xl relative group ${
              scrolled 
                ? 'text-gray-600 hover:text-[#005F73]' 
                : 'text-white hover:text-[#005F73]'
            }`}>
              <span className="relative z-10">Careers</span>
              <div className="absolute inset-0 bg-gray-50/70 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-200 origin-center" />
            </Link>
            
            <div className="ml-8">
              <Button 
                href="/contact" 
                variant="primary"
                size="sm"
                className="shadow-sm hover:shadow-md transition-shadow duration-200"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Get Started
              </Button>
            </div>
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
          <div className="bg-white/95 backdrop-blur-md radius-lg shadow-xl border border-gray-100 p-4">
            <Link href="/about" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 rounded-xl transition-all duration-300 font-medium">
              About
            </Link>

            <Link 
              href="/#services"
              onClick={(e) => handleSmoothScroll(e, '#services')}
              className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 rounded-xl transition-all duration-300 font-medium"
            >
              Services
            </Link>
            
            <Link href="/projects" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 rounded-xl transition-all duration-300 font-medium">
              Projects
            </Link>

            <div className="my-2">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sectors</p>
              <Link href="/sectors#municipal" className="block px-4 py-2 pl-8 text-gray-700 hover:text-[#005F73] transition-colors text-sm">
                Municipal Infrastructure
              </Link>
              <Link href="/sectors#wastewater" className="block px-4 py-2 pl-8 text-gray-700 hover:text-[#005F73] transition-colors text-sm">
                Wastewater Management
              </Link>
              <Link href="/sectors#industrial" className="block px-4 py-2 pl-8 text-gray-700 hover:text-[#005F73] transition-colors text-sm">
                Industrial Solutions
              </Link>
              <Link href="/sectors#rural" className="block px-4 py-2 pl-8 text-gray-700 hover:text-[#005F73] transition-colors text-sm">
                Rural Development
              </Link>
            </div>

            <Link href="/careers" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 rounded-xl transition-all duration-300 font-medium">
              Careers
            </Link>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Button 
                href="/contact" 
                variant="primary"
                size="md"
                fullWidth
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}