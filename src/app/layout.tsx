import type { Metadata } from "next";
import { Montserrat, Poiret_One } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Suspense } from "react";
import Loading from "./loading";

// Font-family for text - primary
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

// Font-family for heading - secondary
const poiretOne = Poiret_One({
  variable: "--font-poiret-one",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Memovies",
  description:
    "Timeless movies, endless memories. Step back in time and rediscover the magic of your movie memories by Memovies.Memovies is a movie app that blends modern tech with vintage soul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${montserrat.variable} ${poiretOne.variable} antialiased`}
      >
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
