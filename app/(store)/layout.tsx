import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOVAMART - Your One-Stop Online Shopping Destination",
  description:
    "Discover a wide range of quality products at unbeatable prices on NOVAMART. Shop electronics, fashion, home goods, and more. Experience fast delivery, secure payments, and exceptional customer service.",
  keywords:
    "NOVAMART, online shopping, eCommerce, buy electronics, fashion, home goods, best deals, secure payments, fast delivery",
  openGraph: {
    title: "NOVAMART - Your One-Stop Online Shopping Destination",
    description:
      "Shop the latest products and enjoy great discounts on NOVAMART. Your trusted online store for electronics, fashion, home essentials, and more.",
    url: "https://www.novamart.com", // Replace with your actual domain
    type: "website",
    images: [
      {
        url: "https://www.novamart.com/logo.png", // Replace with your logo or banner URL
        width: 1200,
        height: 630,
        alt: "NOVAMART Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVAMART - Your One-Stop Online Shopping Destination",
    description:
      "Discover NOVAMART, your trusted eCommerce store for quality products, unbeatable prices, and fast delivery. Shop now!",
    site: "@NOVAMART", // Replace with your Twitter handle
    images: [
      {
        url: "https://www.novamart.com/logo.png", // Replace with your logo or banner URL
        alt: "NOVAMART Logo",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic >
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="">
          <Header/>
          <div className="pt-20 w-full">
          {children}
          </div>
        </main>
        <SanityLive/>
      </body>
    </html>
    </ClerkProvider>
  );
}
