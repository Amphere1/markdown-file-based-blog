import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Markdown Blog",
  description: "A markdown-powered blog built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-black dark:bg-zinc-900 dark:text-white`}
      >
        <main className="max-w-3xl mx-auto px-4 py-8">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
