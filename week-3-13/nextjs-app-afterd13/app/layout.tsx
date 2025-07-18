import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/authProviders";

const roboto = Roboto({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Home Page",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={roboto.className}>
          <main>
            {children}
          </main>
        </body>
      </html>
    </NextAuthProvider>
  );
}
