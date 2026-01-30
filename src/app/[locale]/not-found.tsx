"use client";

import Link from "next/link";
import { Home, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      <div className="content-container flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-2xl text-center">
          {/* 404 Icon */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-(--brand-red)/20 opacity-75" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-(--brand-red)/10 to-(--brand-red)/5 shadow-lg">
                <FileQuestion className="h-16 w-16 text-(--brand-red)" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* 404 Number */}
          <div className="mb-4">
            <h1 className="text-8xl font-extrabold text-gray-200 md:text-9xl">
              404
            </h1>
          </div>

          {/* Title */}
          <h2 className="mb-4 text-3xl font-bold text-[#111] md:text-4xl">
            Sayfa Bulunamadı
          </h2>

          {/* Description */}
          <p className="mb-8 text-lg text-[#666]">
            Üzgünüz! Aradığınız sayfa bulunamadı veya taşınmış olabilir.
            <br className="hidden sm:inline" />
            Endişelenmeyin, size yardımcı olalım.
          </p>

          {/* Action Button */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-(--brand-red) px-8 py-3.5 text-lg font-semibold text-white shadow-sm transition-all hover:bg-(--brand-red)/90 hover:shadow-md"
            >
              <Home className="h-6 w-6 transition-transform group-hover:-translate-y-0.5" />
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
