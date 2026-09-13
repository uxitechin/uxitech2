import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const tech = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-tech",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UXI TECH — Digital Solutions for Modern Businesses",
  description:
    "We don't just build websites. We build digital systems that move businesses forward. Custom web applications, AI automation, CRM pipelines, and brand systems.",
  metadataBase: new URL("https://uxitech.in"),
  keywords: [
    "UXI TECH",
    "Digital Systems Studio",
    "Web Application Development",
    "AI Automation",
    "WhatsApp Automation",
    "Custom CRM Systems",
    "Branding & Graphic Design",
    "SEO Optimization",
    "Pavan Vedesh",
  ],
  authors: [{ name: "Pavan Vedesh" }, { name: "UXI TECH" }],
  creator: "UXI TECH",
  openGraph: {
    title: "UXI TECH — Digital Systems Studio",
    description:
      "We don't just build websites. We build digital systems that move businesses forward.",
    url: "https://uxitech.in",
    siteName: "UXI TECH",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UXI TECH — Digital Systems Studio",
    description:
      "We don't just build websites. We build digital systems that move businesses forward.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFDF9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${tech.variable}`}>
      <body className="font-sans antialiased bg-[#FFFDF9] text-[#171717] min-h-screen flex flex-col selection:bg-[#D5E7F7] selection:text-[#171717]">
        <Preloader />
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
