"use client";

import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full fixed inset-0 z-[9999] items-center justify-center bg-white">
      <Loader2
        className="h-10 w-10 animate-spin text-red-600"
        aria-label="Yükleniyor..."
      />
    </div>
  );
}
