"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BlogSearch } from "@/components/sections/blog-search";

/** Blog detay sayfasında sağda: "Search Here" — arama yapınca /blog?q=... ile listeye yönlendirir */
export function BlogDetailSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (q) {
      router.push(`/blog?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/blog");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sticky top-24">
      <BlogSearch
        value={value}
        onChange={setValue}
        placeholder="Enter Your Keyword..."
      />
      <button
        type="submit"
        className="mt-3 w-full rounded-lg bg-[#282A2E] py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--brand-red)"
      >
        Ara
      </button>
    </form>
  );
}
