import { fetchCirculars } from "@/lib/api";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { CircularsGrid } from "./circulars-grid";

/** Case Study tarzı circulars grid: partners altında, 3x2 kartlar, hover animasyonu. */
export async function CircularsSection() {
  const circulars = await fetchCirculars();

  return (
    <section className="relative bg-white">
      <div className="content-container relative py-10 md:py-14">
        <AnimateOnScroll variant="from-top" className="mb-10 text-center">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-gray-500 md:text-sm">
            Our Case Study
          </p>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-[#282A2E] md:text-3xl lg:text-4xl">
            OUR RECENT <span className="text-[#ED3237]">[</span>
            <span className="text-[#ED3237]">CIRCULARS</span>
            <span className="text-[#ED3237]">]</span> SHOWCASE
          </h2>
        </AnimateOnScroll>

        <CircularsGrid circulars={circulars} />
      </div>
    </section>
  );
}
