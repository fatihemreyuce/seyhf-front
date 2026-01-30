/** Tam sayfa loading: 2. SS — sadece ince gri halka + kırmızı segment, minimalist */
export function PageLoading() {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white">
      <div className="relative h-40 w-40 shrink-0" aria-hidden>
        <svg
          className="page-loading-spinner h-full w-full"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden
        >
          {/* İnce açık gri halka (çemberin çoğu) */}
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#e8e8e8"
            strokeWidth="1"
            fill="none"
          />
          {/* Kırmızı segment (yaklaşık çeyrek–üçte bir) */}
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="var(--brand-red)"
            strokeWidth="1"
            strokeDasharray="32 94"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
