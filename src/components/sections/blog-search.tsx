"use client";

export interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/** Koyu gri konturlu büyüteç ikonu */
function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4C505A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export function BlogSearch({
  value,
  onChange,
  placeholder = "Enter Your Keyword...",
}: BlogSearchProps) {
  return (
    <div className="rounded-lg bg-[#f0f0f0] p-4 md:p-5">
      <label
        htmlFor="blog-search"
        className="mb-3 block text-base font-bold text-[#282A2E]"
      >
        Search Here
      </label>
      <div className="relative">
        <input
          id="blog-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-4 pr-12 text-[#333] placeholder:text-gray-400 focus:border-(--brand-red) focus:outline-none focus:ring-1 focus:ring-(--brand-red)"
          aria-label="Blog başlığı veya anahtar kelime ara"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </span>
      </div>
    </div>
  );
}
