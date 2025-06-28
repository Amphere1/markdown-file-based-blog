"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="mb-10 border-b pb-4">
      <Link href="/">
        <h1 className="text-3xl font-bold hover:text-blue-600 transition-colors">
          📝 My Markdown Blog
        </h1>
      </Link>
    </header>
  );
}
