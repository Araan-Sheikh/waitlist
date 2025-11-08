import "./globals.css";
import type { Metadata } from "next";
const siteUrl = "https://is-host.in";
const title = "is-host.in — Universal VPS Panel Installer";
const description = "Install and manage Pterodactyl, CapRover, Coolify, and more on any VPS with one command. Deploy hosting panels instantly with our Go agent and web dashboard.";
const keywords = "VPS panel installer, Pterodactyl installer, CapRover installer, Coolify installer, Dockploy installer, VPS management, server panel deployment, automated panel installation, VPS dashboard, hosting panel manager, Linux VPS tools, Docker panel installer, server automation, DevOps tools, infrastructure management";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | is-host.in",
  },
  description,
  keywords,
  authors: [{ name: "Mohammed Araan Sheikh", url: siteUrl }],
  creator: "Mohammed Araan Sheikh",
  publisher: "Mohammed Araan Sheikh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title,
    description,
    siteName: "is-host.in",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: "is-host.in - Universal VPS Panel Installer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/logo.png`],
    creator: "@araan_sheikh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "is-host.in",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Linux",
    "description": "Universal VPS panel installer and manager. Deploy Pterodactyl, CapRover, Coolify, and more with one command.",
    "url": "https://is-host.in",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/PreOrder",
      "availabilityStarts": "2026-01-01"
    },
    "publisher": {
      "@type": "Person",
      "name": "Mohammed Araan Sheikh",
      "url": "https://is-host.in"
    },
    "featureList": [
      "One-command installation",
      "Multi-panel support (Pterodactyl, CapRover, Coolify, Dockploy)",
      "Agent-based deployment with live logs",
      "Centralized dashboard for all VPS instances",
      "Auto-detection of OS and dependencies",
      "Verified pre-tested scripts with SSL & DNS"
    ],
    "softwareVersion": "1.0.0",
    "releaseNotes": "MVP launching Q1 2026"
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico"/>
        <link rel="canonical" href="https://is-host.in" />
        <meta name="theme-color" content="#10b981" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#059669" media="(prefers-color-scheme: dark)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{__html: `
          try {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          } catch {}
        `}} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
