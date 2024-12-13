import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Base from "./base";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "APAC Platform",
  description: "Create for the Proof of Concept",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`antialiased`}>
        <Base>{children}</Base>
        <Toaster />
      </body>
    </html>
  );
}
