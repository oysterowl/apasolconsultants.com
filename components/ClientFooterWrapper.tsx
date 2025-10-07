'use client';

import { useEffect, useState } from 'react';
import Footer from './Footer';
import type { SiteInfo } from '@/types/siteInfo';

export default function ClientFooterWrapper() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchSiteInfo() {
      try {
        const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
        if (!CMS_URL) {
          return;
        }

        const response = await fetch(`${CMS_URL}/api/globals/site-info?depth=2`);

        if (response.ok) {
          const data = await response.json();
          setSiteInfo(data);

          let url = data?.logo?.url;
          if (url?.startsWith('/') && CMS_URL) {
            url = `${CMS_URL}${url}`;
          }
          setLogoUrl(url);
        }
      } catch {
        // Silently fail if CMS is unavailable
      }
    }

    fetchSiteInfo();
  }, []);

  return <Footer siteInfo={siteInfo} logoUrl={logoUrl} />;
}
