import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer, CartSidebar } from "@/components/layout";
import { GoogleAnalytics, GoogleTagManager, GoogleTagManagerNoscript, MetaPixel, PinterestTag, TikTokPixel } from "@/components/analytics";
import { JsonLd } from "@/components/seo";
import { WhatsAppWidget, CookieConsent } from "@/components/widgets";
import { generateOrganizationSchema, generateWebsiteSchema, seoConfig } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.defaultKeywords,
  authors: [{ name: seoConfig.siteName }],
  creator: seoConfig.siteName,
  publisher: seoConfig.siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    images: [
      {
        url: seoConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: seoConfig.siteName,
      },
    ],
    locale: seoConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [seoConfig.defaultImage],
    creator: seoConfig.twitterHandle,
    site: seoConfig.twitterHandle,
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: seoConfig.siteUrl,
    languages: {
      "tr-TR": seoConfig.siteUrl,
    },
  },
  category: "e-commerce",
  other: {
    "theme-color": seoConfig.themeColor,
    "msapplication-TileColor": seoConfig.themeColor,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="tr">
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        
        {/* Structured Data */}
        <JsonLd data={[organizationSchema, websiteSchema]} />
        
        {/* Analytics Scripts */}
        <GoogleTagManager />
        <GoogleAnalytics />
        <MetaPixel />
        <PinterestTag />
        <TikTokPixel />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager Noscript */}
        <GoogleTagManagerNoscript />
        
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CartSidebar />
        
        {/* Widgets */}
        <WhatsAppWidget 
          phoneNumber="905551234567" 
          message="Merhaba! Apeirona'dan size nasıl yardımcı olabilirim?"
        />
        <CookieConsent />
      </body>
    </html>
  );
}
