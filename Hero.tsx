import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { BUSINESS, PRODUCTS } from "@/lib/business";
import { CallButton, WhatsAppButton } from "./ContactButtons";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-charcoal text-charcoal-foreground">
      <img src={hero} alt="Cement bags, red bricks, sand and TMT steel bars stocked at a building material yard"
        width={1600} height={1104} className="absolute inset-0 -z-10 h-full w-full object-cover object-center" />
      <div className="hero-overlay absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28 lg:pb-36 lg:pt-36">
        <div className="max-w-2xl fade-up">
          <p className="eyebrow mb-5">{BUSINESS.tagline}</p>
          <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Build Strong. Build Smart.{" "}
            <span className="text-primary">Build with MK TRADERS.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal-foreground/80 sm:text-lg">
            Your building material partner for cement, sand, steel, bricks, interlocking tiles, and other construction essentials. Contact us to enquire about pricing, availability, and supply requirements.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <WhatsAppButton size="lg" />
            <CallButton size="lg" />
            <a href="#products" className="inline-flex h-13 items-center gap-2 rounded-full px-5 font-semibold text-charcoal-foreground hover:text-primary">
              Explore Products <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
        <ul className="mt-14 flex flex-wrap gap-2" aria-label="Materials we supply">
          {PRODUCTS.map((p) => (
            <li key={p.id} className="rounded-full border border-charcoal-foreground/20 bg-charcoal/40 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
