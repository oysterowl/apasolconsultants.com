import type { Metadata } from "next";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export const metadata: Metadata = {
  title: {
    default: "APASOL Consultants - Water & Wastewater Engineering Solutions",
    template: "%s | APASOL Consultants"
  },
  description: "Leading water and wastewater engineering consultancy in India. Specializing in water treatment plants, sewage treatment, distribution networks, and sustainable water infrastructure solutions.",
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
  authors: [{ name: "APASOL Consultants & Engineers Pvt Ltd" }],
  creator: "APASOL Consultants",
  publisher: "APASOL Consultants",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://apasolconsultants.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "APASOL Consultants - Water & Wastewater Engineering Solutions",
    description: "Leading water and wastewater engineering consultancy delivering sustainable infrastructure solutions across India since 2020.",
    url: 'https://apasolconsultants.com',
    siteName: 'APASOL Consultants',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/apasol-logo.png',
        width: 1200,
        height: 630,
        alt: 'APASOL Consultants Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "APASOL Consultants - Water Engineering Solutions",
    description: "Leading water and wastewater engineering consultancy in India",
    images: ['/apasol-logo.png'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#005F73" />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#005F73] text-white px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>
        <main id="main-content" role="main">
          {children}
        </main>
        <WhatsAppWidget />
      </body>
    </html>
  );
}
