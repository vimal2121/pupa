import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function generateMetadata() {
  const faviconSetting = await prisma.siteSetting.findUnique({
    where: { key: 'favicon_url' }
  })

  return {
    title: 'Pupa',
    description: 'Speciality Brand Empowerment company through storytelling.',
    icons: faviconSetting?.value ? {
      icon: faviconSetting.value,
      shortcut: faviconSetting.value,
      apple: faviconSetting.value
    } : undefined,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
