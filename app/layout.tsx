import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppWidgetWrapper from "@/components/WhatsAppWidgetWrapper";
import ScrollManager from "@/components/ScrollManager";
import type { SiteInfo } from "@/types/siteInfo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

async function getSiteInfo(): Promise<SiteInfo | null> {
  try {
    const headers: HeadersInit = {};
    const apiKey = process.env.CMS_API_KEY;

    if (apiKey) {
      headers['Authorization'] = `users API-Key ${apiKey}`;
    }

    const response = await fetch(`${CMS_URL}/api/globals/site-info`, {
      headers,
      next: { revalidate: 60 }
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching site info:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfo();

  const ogImageUrl = siteInfo?.defaultOgImage?.url
    ? `${CMS_URL}${siteInfo.defaultOgImage.url}`
    : undefined;

  const faviconUrl = siteInfo?.favicon?.url
    ? `${CMS_URL}${siteInfo.favicon.url}`
    : undefined;

  return {
    ...(siteInfo?.siteTitle && {
      title: {
        default: siteInfo.siteTitle,
        template: `%s | ${siteInfo.ogSiteName || 'APASOL Consultants'}`
      },
    }),
    ...(siteInfo?.siteDescription && {
      description: siteInfo.siteDescription,
    }),
    keywords: [
      "water engineering consultants",
      "wastewater treatment",
      "water treatment plant design",
      "sewage treatment plant",
      "water infrastructure India",
      "hydraulic modeling",
      "water distribution network",
      "APASOL consultants",
      "engineering consultancy Delhi",
      "water resources management"
    ],
    ...(siteInfo?.companyName && {
      authors: [{ name: siteInfo.companyName }],
      creator: siteInfo.ogSiteName,
      publisher: siteInfo.ogSiteName,
    }),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://apasolconsultants.com'),
    alternates: {
      canonical: '/',
    },
    ...(faviconUrl && {
      icons: {
        icon: faviconUrl,
        shortcut: faviconUrl,
        apple: faviconUrl,
      },
    }),
    openGraph: {
      ...(siteInfo?.ogTitle && { title: siteInfo.ogTitle }),
      ...(siteInfo?.ogDescription && { description: siteInfo.ogDescription }),
      ...(siteInfo?.ogSiteName && { siteName: siteInfo.ogSiteName }),
      url: 'https://apasolconsultants.com',
      locale: 'en_IN',
      type: 'website',
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            ...(siteInfo?.ogSiteName && { alt: siteInfo.ogSiteName }),
          }
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      ...(siteInfo?.twitterTitle && { title: siteInfo.twitterTitle }),
      ...(siteInfo?.twitterDescription && { description: siteInfo.twitterDescription }),
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: '', // Add Google Search Console verification code when available
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#0057FF" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ScrollManager />
        {children}
        <WhatsAppWidgetWrapper />
      </body>
    </html>
  );
}
