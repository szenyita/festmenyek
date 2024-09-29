import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Fejlec from "../components/Fejlec";
import Lablec from "../components/Lablec";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poloshop",
  description: "Legjobb polók",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Fejlec />
        {children}
        <Lablec />
      </body>
    </html>
  );
}
