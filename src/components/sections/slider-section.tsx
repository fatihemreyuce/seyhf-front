import { fetchSliders } from "@/lib/api";
import { Slider } from "./slider";

/** Slider verisi panel API'sinden (fetchSliders) çekilir; hata/boşta Slider fallback kullanır. */
export async function SliderSection() {
  const slides = await fetchSliders();
  return <Slider slides={slides} />;
}
