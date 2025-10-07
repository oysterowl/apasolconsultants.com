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

export default function Header({ logoUrl = '/apasol-logo.png', siteInfo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasColoredHero, setHasColoredHero] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Detect if page has a colored hero section on mount
  useEffect(() => {
    const detectHero = () => {
      // Look for hero sections with data-hero attribute or specific classes
      const heroSection = document.querySelector('[data-hero="true"], .hero-section');

      if (heroSection) {
        // Check for various types of visual backgrounds
        const hasVisualBackground =
          // Check for gradient classes
          heroSection.querySelector('[class*="bg-gradient"]') ||
          // Check for video elements
          heroSection.querySelector('video') ||
          // Check for image elements (direct images in hero)
          heroSection.querySelector('img') ||
          // Check for background image in inline styles
          (heroSection as HTMLElement).style.backgroundImage ||
          // Check for background image in child elements
          heroSection.querySelector('[style*="background-image"]') ||
          // Check for canvas elements (for animated backgrounds)
          heroSection.querySelector('canvas') ||
          // Check for specific background classes that indicate images
          heroSection.matches('[class*="bg-image"], [class*="background-image"]')

        setHasColoredHero(!!hasVisualBackground);
      } else {
        // No hero section found, assume white background
        setHasColoredHero(false);
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(detectHero, 10);
  }, [pathname]);

  // Dynamic hero section detection and scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Try to find hero section dynamically
      const heroSection = document.querySelector('[data-hero="true"], .hero-section, #hero, section:first-of-type');

      if (heroSection) {
        // Get the bottom position of the hero section
        const heroBottom = heroSection.getBoundingClientRect().bottom + window.scrollY;
        // Add background when scrolled past 80% of hero section
        setScrolled(currentScrollY > heroBottom * 0.8);
      } else {
        // Fallback: Check for specific page patterns
        const pagesWithColoredHero = ['/projects', '/sectors', '/contact', '/about', '/services', '/blog'];
        const isServicesSubpage = pathname.startsWith('/services/');
        const isSectorsSubpage = pathname.startsWith('/sectors/');
        const isBlogSubpage = pathname.startsWith('/blog/');

        if (pagesWithColoredHero.includes(pathname) || isServicesSubpage || isSectorsSubpage || isBlogSubpage) {
          // For pages with colored heroes, show background after minimal scroll
          setScrolled(currentScrollY > 50);
        } else {
          // For home page or pages with full viewport heroes
          const viewportHeight = window.innerHeight;
          setScrolled(currentScrollY > viewportHeight - 100);
        }
      }

      // Auto-hiding navigation on mobile
      if (window.innerWidth < 1024) { // lg breakpoint
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

    // Throttle scroll events for better performance
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

    // Check initial state with a small delay to ensure DOM is ready
    setTimeout(handleScroll, 100);

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [pathname, lastScrollY]);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle touch gestures for mobile menu
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Swipe up to close menu (minimum 50px movement)
    if (deltaY < -50 && Math.abs(deltaX) < 100) {
      setMobileMenuOpen(false);
    }

    touchStartRef.current = null;
  }, []);

  // Handle click outside to close mobile menu
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
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Enhanced mobile menu toggle with haptic feedback
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => {
      const newValue = !prev;

      // Add haptic feedback if supported
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
      isScrollingDown && !mobileMenuOpen ? 'lg:translate-y-0 -translate-y-full' : 'translate-y-0'
    }`}>
      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-[1600px]">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
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
            {siteInfo?.companyName && (
              <div className={`hidden lg:block border-l-2 pl-3 ml-1 ${
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
          <div className="hidden lg:flex items-center space-x-1">
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
            variant="ghost-menu"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </Button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            mobileMenuOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 p-4 relative">
            {/* Swipe indicator */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"></div>
            {/* Enhanced mobile menu items with better touch targets */}
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
            
            <div className="mt-4 pt-4 border-t border-gray-100">
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