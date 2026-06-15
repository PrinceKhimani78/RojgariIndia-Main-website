import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientWrapper/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rojgari India",
  description: "Generated with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (!sessionStorage.getItem('splashShown')) {
                  var tempSplash = document.createElement('div');
                  tempSplash.id = 'temp-splash-cover';
                  tempSplash.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:white;z-index:999999;';
                  document.documentElement.appendChild(tempSplash);
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Suspense fallback={null}>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </Suspense>
      </body>
    </html>
  );
}
