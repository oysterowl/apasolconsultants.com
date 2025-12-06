import type { NextConfig } from "next";
import type { RemotePattern } from 'next/dist/shared/lib/image-config';

const remotePatterns: RemotePattern[] = [];

// Add CMS host from env, if provided
if (process.env.NEXT_PUBLIC_CMS_URL) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_CMS_URL);
    const protocol: 'http' | 'https' = url.protocol === 'https:' ? 'https' : 'http';
    remotePatterns.push({
      protocol,
      hostname: url.hostname,
      pathname: '/**',
      ...(url.port ? { port: url.port } : {}),
    });
  } catch {
    // Ignore invalid URL
  }
}

// Allow production site host
remotePatterns.push({
  protocol: 'https',
  hostname: 'apasolconsultants.com',
  pathname: '/**',
});

remotePatterns.push({
  protocol: 'https',
  hostname: 'www.apasolconsultants.com',
  pathname: '/**',
});

// Allow localhost in development for media proxies
remotePatterns.push({
  protocol: 'http',
  hostname: 'localhost',
  pathname: '/**',
  ...(process.env.NEXT_PUBLIC_CMS_URL?.includes('3001') ? { port: '3001' } : {}),
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
