'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from './Button';
import type { SiteInfo } from '@/types/siteInfo';

interface HeaderProps {
  logoUrl?: string;
  siteInfo: SiteInfo | null;
}

export default function Header({ logoUrl, siteInfo }: HeaderProps) {
  const DESKTOP_BREAKPOINT = 1280; // xl
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasColoredHero, setHasColoredHero] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const detectHero = () => {
      const heroSection = document.querySelector('[data-hero="true"], .hero-section');

      if (heroSection) {
        const hasVisualBackground =
          heroSection.querySelector('[class*="bg-gradient"]') ||
          heroSection.querySelector('video') ||
          heroSection.querySelector('img') ||
          (heroSection as HTMLElement).style.backgroundImage ||
          heroSection.querySelector('[style*="background-image"]') ||
          heroSection.querySelector('canvas') ||
          heroSection.matches('[class*="bg-image"], [class*="background-image"]')

        setHasColoredHero(!!hasVisualBackground);
      } else {
        setHasColoredHero(false);
      }
    };

    setTimeout(detectHero, 10);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const heroSection = document.querySelector('[data-hero="true"], .hero-section, #hero, section:first-of-type');

      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom + window.scrollY;
        setScrolled(currentScrollY > heroBottom * 0.8);
      } else {
        const pagesWithColoredHero = ['/projects', '/sectors', '/contact', '/about', '/services', '/blog'];
        const isServicesSubpage = pathname.startsWith('/services/');
        const isSectorsSubpage = pathname.startsWith('/sectors/');
        const isBlogSubpage = pathname.startsWith('/blog/');

        if (pagesWithColoredHero.includes(pathname) || isServicesSubpage || isSectorsSubpage || isBlogSubpage) {
          setScrolled(currentScrollY > 50);
        } else {
          const viewportHeight = window.innerHeight;
          setScrolled(currentScrollY > viewportHeight - 100);
        }
      }

      if (window.innerWidth < DESKTOP_BREAKPOINT) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsScrollingDown(true);
        } else {
          setIsScrollingDown(false);
        }
      } else {
        setIsScrollingDown(false);
      }

      setLastScrollY(currentScrollY);
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    setTimeout(handleScroll, 100);

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [pathname, lastScrollY]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    if (deltaY < -50 && Math.abs(deltaX) < 100) {
      setMobileMenuOpen(false);
    }

    touchStartRef.current = null;
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => {
      const newValue = !prev;

      if ('vibrate' in navigator && newValue) {
        navigator.vibrate(50);
      }

      return newValue;
    });
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white shadow-sm border-b border-gray-100 py-4'
        : 'bg-transparent py-5'
    } ${
      isScrollingDown && !mobileMenuOpen ? 'xl:translate-y-0 -translate-y-full' : 'translate-y-0'
    }`}>
      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-[1600px]">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            {logoUrl && (
              <div className="relative">
                <Image
                  src={logoUrl}
                  alt="APASOL Consultants"
                  width={180}
                  height={60}
                  className="h-16 w-auto object-contain"
                  priority
                />
              </div>
            )}
            {siteInfo?.companyName && (
              <div className={`hidden xl:block border-l-2 pl-3 ml-1 ${
                scrolled || !hasColoredHero ? 'border-gray-300' : 'border-white/50'
              }`}>
                <p className={`text-xs font-medium tracking-wider uppercase leading-tight ${
                  scrolled || !hasColoredHero ? 'text-gray-500' : 'text-white/90'
                }`}>
                  {siteInfo.companyName.split('&')[0].trim()}
                </p>
                {siteInfo.companyName.includes('&') && (
                  <p className={`text-xs font-medium tracking-wider uppercase leading-tight ${
                    scrolled || !hasColoredHero ? 'text-gray-500' : 'text-white/90'
                  }`}>
                    & {siteInfo.companyName.split('&')[1].trim()}
                  </p>
                )}
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1">
            <Link href="/" className={`px-5 py-2.5 text-[15px] font-medium transition-all duration-200 rounded-xl relative group ${
              scrolled || !hasColoredHero
                ? 'text-gray-700 hover:text-gray-900'
                : 'text-white hover:text-white/90'
            }`}>
              <span className="relative z-10">Home</span>
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                scrolled || !hasColoredHero
                  ? 'bg-gray-100'
                  : 'bg-white/10'
              }`} />
            </Link>

            {(siteInfo?.headerLinks?.showAbout !== false) && (
              <Link href="/about" className={`px-5 py-2.5 text-[15px] font-medium transition-all duration-200 rounded-xl relative group ${
                scrolled || !hasColoredHero
                  ? 'text-gray-700 hover:text-gray-900'
                  : 'text-white hover:text-white/90'
              }`}>
                <span className="relative z-10">About</span>
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                  scrolled || !hasColoredHero
                    ? 'bg-gray-100'
                    : 'bg-white/10'
                }`} />
              </Link>
            )}

            {(siteInfo?.headerLinks?.showServices !== false) && (
              <Link
                href="/services"
                className={`px-5 py-2.5 text-[15px] font-medium transition-all duration-200 rounded-xl relative group ${
                  scrolled || !hasColoredHero
                    ? 'text-gray-700 hover:text-gray-900'
                    : 'text-white hover:text-white/90'
                }`}
              >
                <span className="relative z-10">Services</span>
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                  scrolled || !hasColoredHero
                    ? 'bg-gray-100'
                    : 'bg-white/10'
                }`} />
              </Link>
            )}

            {(siteInfo?.headerLinks?.showProjects !== false) && (
              <Link href="/projects" className={`px-5 py-2.5 text-[15px] font-medium transition-all duration-200 rounded-xl relative group ${
                scrolled || !hasColoredHero
                  ? 'text-gray-700 hover:text-gray-900'
                  : 'text-white hover:text-white/90'
              }`}>
                <span className="relative z-10">Projects</span>
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                  scrolled || !hasColoredHero
                    ? 'bg-gray-100'
                    : 'bg-white/10'
                }`} />
              </Link>
            )}

            {(siteInfo?.headerLinks?.showClients !== false) && (
              <Link href="/clients" className={`px-5 py-2.5 text-[15px] font-medium transition-all duration-200 rounded-xl relative group ${
                scrolled || !hasColoredHero
                  ? 'text-gray-700 hover:text-gray-900'
                  : 'text-white hover:text-white/90'
              }`}>
                <span className="relative z-10">Clients</span>
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                  scrolled || !hasColoredHero
                    ? 'bg-gray-100'
                    : 'bg-white/10'
                }`} />
              </Link>
            )}

            {(siteInfo?.headerLinks?.showSectors !== false) && (
              <Link href="/sectors" className={`px-5 py-2.5 text-[15px] font-medium transition-all duration-200 rounded-xl relative group ${
                scrolled || !hasColoredHero
                  ? 'text-gray-700 hover:text-gray-900'
                  : 'text-white hover:text-white/90'
              }`}>
                <span className="relative z-10">Sectors</span>
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                  scrolled || !hasColoredHero
                    ? 'bg-gray-100'
                    : 'bg-white/10'
                }`} />
              </Link>
            )}

            {(siteInfo?.headerLinks?.showBlog !== false) && (
              <Link href="/blog" className={`px-5 py-2.5 text-[15px] font-medium transition-all duration-200 rounded-xl relative group ${
                scrolled || !hasColoredHero
                  ? 'text-gray-700 hover:text-gray-900'
                  : 'text-white hover:text-white/90'
              }`}>
                <span className="relative z-10">Blog</span>
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                  scrolled || !hasColoredHero
                    ? 'bg-gray-100'
                    : 'bg-white/10'
                }`} />
              </Link>
            )}

            {(siteInfo?.headerLinks?.showCareers !== false) && (
              <Link href="/careers" className={`px-5 py-2.5 text-[15px] font-medium transition-all duration-200 rounded-xl relative group ${
                scrolled || !hasColoredHero
                  ? 'text-gray-700 hover:text-gray-900'
                  : 'text-white hover:text-white/90'
              }`}>
                <span className="relative z-10">Careers</span>
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                  scrolled || !hasColoredHero
                    ? 'bg-gray-100'
                    : 'bg-white/10'
                }`} />
              </Link>
            )}
            
            <div className="ml-8">
              <Button
                href="/contact"
                variant="primary"
                size="sm"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <Button
            onClick={toggleMobileMenu}
            variant="ghost"
            size="icon"
            className="xl:hidden bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`xl:hidden transition-all duration-500 overflow-hidden rounded-2xl ${
            mobileMenuOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bg-white/95 backdrop-blur-md shadow-xl border border-gray-100 p-4 pb-6 relative overflow-hidden rounded-2xl">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"></div>
            <div className="pt-4">
              <Link
                href="/"
                className="flex items-center px-4 py-4 min-h-[48px] text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all duration-200 font-medium touch-manipulation"
              >
                <span className="text-lg">Home</span>
              </Link>

              {(siteInfo?.headerLinks?.showAbout !== false) && (
                <Link
                  href="/about"
                  className="flex items-center px-4 py-4 min-h-[48px] text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all duration-200 font-medium touch-manipulation"
                >
                  <span className="text-lg">About</span>
                </Link>
              )}

              {(siteInfo?.headerLinks?.showServices !== false) && (
                <Link
                  href="/services"
                  className="flex items-center px-4 py-4 min-h-[48px] text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all duration-200 font-medium touch-manipulation"
                >
                  <span className="text-lg">Services</span>
                </Link>
              )}

              {(siteInfo?.headerLinks?.showProjects !== false) && (
                <Link
                  href="/projects"
                  className="flex items-center px-4 py-4 min-h-[48px] text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all duration-200 font-medium touch-manipulation"
                >
                  <span className="text-lg">Projects</span>
                </Link>
              )}

              {(siteInfo?.headerLinks?.showClients !== false) && (
                <Link
                  href="/clients"
                  className="flex items-center px-4 py-4 min-h-[48px] text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all duration-200 font-medium touch-manipulation"
                >
                  <span className="text-lg">Clients</span>
                </Link>
              )}

              {(siteInfo?.headerLinks?.showSectors !== false) && (
                <Link
                  href="/sectors"
                  className="flex items-center px-4 py-4 min-h-[48px] text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all duration-200 font-medium touch-manipulation"
                >
                  <span className="text-lg">Sectors</span>
                </Link>
              )}

              {(siteInfo?.headerLinks?.showBlog !== false) && (
                <Link
                  href="/blog"
                  className="flex items-center px-4 py-4 min-h-[48px] text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all duration-200 font-medium touch-manipulation"
                >
                  <span className="text-lg">Blog</span>
                </Link>
              )}

              {(siteInfo?.headerLinks?.showCareers !== false) && (
                <Link
                  href="/careers"
                  className="flex items-center px-4 py-4 min-h-[48px] text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all duration-200 font-medium touch-manipulation"
                >
                  <span className="text-lg">Careers</span>
                </Link>
              )}
            </div>
            
            <div className="mt-4 pt-4 pb-4 border-t border-gray-100">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                fullWidth
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
