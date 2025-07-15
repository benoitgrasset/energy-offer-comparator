import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "~/components/layout/header";
import { cn } from "~/lib/cn";
import Providers from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Energy Offer Comparator",
    template: "%s | Energy Offer Comparator",
  },
  description:
    "Compare energy offers from different providers to find the best deal for your needs.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(geistSans.variable, inter.variable, "mx-4")}
        suppressHydrationWarning
      >
        <Providers>
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
