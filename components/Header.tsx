'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from './Button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Pages with light/colored hero sections need immediate navbar background
      const pagesWithColoredHero = ['/projects', '/sectors', '/contact', '/about', '/services', '/blog'];
      
      // Also check if it's a services subpage
      const isServicesSubpage = pathname.startsWith('/services/');
      const isSectorsSubpage = pathname.startsWith('/sectors/');
      const isBlogSubpage = pathname.startsWith('/blog/');
      
      if (pagesWithColoredHero.includes(pathname) || isServicesSubpage || isSectorsSubpage || isBlogSubpage) {
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
  }, [pathname]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && pathname === '/') {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
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
                  className="h-12 w-auto object-contain"
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
              href="/services"
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

            <Link href="/sectors" className={`px-5 py-2.5 text-[15px] font-medium transition-colors duration-150 rounded-xl relative group ${
              scrolled 
                ? 'text-gray-600 hover:text-[#005F73]' 
                : 'text-white hover:text-[#005F73]'
            }`}>
              <span className="relative z-10">Sectors</span>
              <div className="absolute inset-0 bg-gray-50/70 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-150 origin-center" />
            </Link>
            
            <Link href="/blog" className={`px-5 py-2.5 text-[15px] font-medium transition-colors duration-150 rounded-xl relative group ${
              scrolled 
                ? 'text-gray-600 hover:text-[#005F73]' 
                : 'text-white hover:text-[#005F73]'
            }`}>
              <span className="relative z-10">Blog</span>
              <div className="absolute inset-0 bg-gray-50/70 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-200 origin-center" />
            </Link>
            
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
              href="/services"
              className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 rounded-xl transition-all duration-300 font-medium"
            >
              Services
            </Link>
            
            <Link href="/projects" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 rounded-xl transition-all duration-300 font-medium">
              Projects
            </Link>

            <Link href="/sectors" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 rounded-xl transition-all duration-300 font-medium">
              Sectors
            </Link>

            <Link href="/blog" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#005F73]/5 hover:to-[#00C9C9]/5 rounded-xl transition-all duration-300 font-medium">
              Blog
            </Link>

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