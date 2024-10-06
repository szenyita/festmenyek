import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Fejlec from "../components/Fejlec";
import Lablec from "../components/Lablec";
import CartProvider from "@/context/CartContext";
import AuthProvider from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anonim Művécsarnok",
  description: "Magyar alkotások",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Fejlec />
            {children}
            <Lablec />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
