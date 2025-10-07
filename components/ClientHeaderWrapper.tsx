'use client';

import { useEffect, useState } from 'react';
import Header from './Header';
import type { SiteInfo } from '@/types/siteInfo';

export default function ClientHeaderWrapper() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchSiteInfo = async () => {
      try {
        const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
        const response = await fetch(`${CMS_URL}/api/globals/site-info`);
        const data = await response.json();

        setSiteInfo(data);

        let url = data?.headerLogo?.url;
        if (url?.startsWith('/') && CMS_URL) {
          url = `${CMS_URL}${url}`;
        }
        setLogoUrl(url);
      } catch (error) {
        console.error('Error fetching site info:', error);
      }
    };

    fetchSiteInfo();
  }, []);

  return <Header logoUrl={logoUrl} siteInfo={siteInfo} />;
}
