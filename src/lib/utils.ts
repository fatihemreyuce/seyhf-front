import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** HTML etiketlerini kaldırır ve entity'leri düz metne çevirir. */
export function stripHtml(html: string): string {
  if (typeof html !== "string") return "";
  let text = html
    // Etiketleri kaldır
    .replace(/<[^>]*>/g, " ")
    // Fazla boşlukları birleştir
    .replace(/\s+/g, " ")
    .trim();
  // Sayısal entity'ler: &#123; &#x7B;
  text = text.replace(/&#(\d+);/g, (_, dec) =>
    String.fromCharCode(parseInt(dec, 10))
  );
  text = text.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  // Yaygın isimli entity'ler (Türkçe dahil)
  const entities: Record<string, string> = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&apos;": "'",
    "&uuml;": "ü",
    "&Uuml;": "Ü",
    "&ccedil;": "ç",
    "&Ccedil;": "Ç",
    "&ouml;": "ö",
    "&Ouml;": "Ö",
    "&gbreve;": "ğ",
    "&Gbreve;": "Ğ",
    "&inodot;": "ı",
    "&Idot;": "İ",
    "&scedil;": "ş",
    "&Scedil;": "Ş",
  };
  for (const [entity, char] of Object.entries(entities)) {
    text = text.split(entity).join(char);
  }
  return text;
}
