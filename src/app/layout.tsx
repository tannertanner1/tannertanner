import type { Metadata } from "next";
// import type { Viewport } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  // title: {
  //   absolute: "tannertanner",
  // },
  title: {
    template: "ㅜㅜ %s", // ㅠㅠ
    default: "ㅜㅜ", // a default is required when creating a template
  },
  description:
    "User Management, Passwordless Authentication, Payment Processing, Transactional Emails",
  keywords: [
    "tannertanner",
    "User Management",
    "Passwordless Authentication",
    "Payment Processing",
    "Transactional Emails",
  ],
  metadataBase: new URL("https://tannertanner.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  creator: "Tanner Tanner",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  authors: [{ name: "Tanner", url: "https://tannertanner.me" }],
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  applicationName: "Demo",
  openGraph: {
    title: "Demo",
    description:
      "User Management, Passwordless Authentication, Payment Processing, Transactional Emails",
    url: "https://tannertanner.vercel.app",
    siteName: "Demo",
    // Must be an absolute URL
    images: [
      {
        url: "https://tannertanner.vercel.app/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://tannertanner.vercel.app/og-alt.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
// export function generateViewport(): Viewport {
//   return {
//     themeColor: 'black',
//   }
// }
// export const viewport: Viewport = {
//   // colorScheme: 'dark',
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: 'cyan' },
//     { media: '(prefers-color-scheme: dark)', color: 'black' },
//   ],
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          inter.variable
        )}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

{
  /*

// @note rauchg // og-playground.vercel.app

// npm i @vercel/og

# robots.txt
Allow: /api/og/*

# app/api/og/route.tsx

import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '-.02em',
          fontWeight: 700,
          background: 'white',
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              background: 'black',
            }}
          />
          <span
            style={{
              marginLeft: 8,
              fontSize: 20,
            }}
          >
            tannertanner.vercel.app
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '20px 50px',
            margin: '0 42px',
            fontSize: 40,
            width: 'auto',
            maxWidth: 550,
            textAlign: 'center',
            backgroundColor: 'black',
            color: 'white',
            lineHeight: 1.4,
          }}
        >
          ㅜㅜ
        </div>
      </div>
  );
}

<br />
<br />
<br />

// @note `app/api/og/route.tsx`

import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '-.02em',
          fontWeight: 700,
          background: 'white',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 42,
            left: 42,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              background: 'black',
            }}
          />
          <span
            style={{
              marginLeft: 8,
              fontSize: 20,
            }}
          >
            tannertanner.vercel.app
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '20px 50px',
            margin: '0 42px',
            fontSize: 40,
            width: 'auto',
            maxWidth: 550,
            textAlign: 'center',
            backgroundColor: 'black',
            color: 'white',
            lineHeight: 1.4,
          }}
        >
          ㅜㅜ
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

// @note `app/layout.tsx`

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Site Title',
  description: 'Your Site Description',
  openGraph: {
    type: 'website',
    url: 'https://yourdomain.vercel.app',
    title: 'Your Site Title',
    description: 'Your Site Description',
    images: [
      {
        url: 'https://yourdomain.vercel.app/api/og',
        width: 1200,
        height: 630,
        alt: 'Your Site Title',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle',
    creator: '@yourtwitterhandle',
    title: 'Your Site Title',
    description: 'Your Site Description',
    images: [
      {
        url: 'https://yourdomain.vercel.app/api/og',
        alt: 'Your Site Title',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}

*/
}
