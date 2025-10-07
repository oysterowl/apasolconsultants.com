'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Force scroll to top when navigating to blog page
    if (pathname === '/blog') {
      window.scrollTo(0, 0);

      // Also set it with a slight delay to override any browser behavior
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
