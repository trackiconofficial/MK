import { Boxes, MessageSquareText, Truck, Phone, Mail, MessageCircle, PackageSearch, ClipboardList, Handshake, MapPin, ArrowUpRight } from "lucide-react";
import { BUSINESS, PRODUCTS, telLink, waLink, generalWaMessage, addressLines, mapEmbedLink, mapPlaceLink, mapDirectionsLink } from "@/lib/business";

import hero from "@/assets/hero.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CallButton, WhatsAppButton } from "./ContactButtons";
import { Logo } from "./Header";

export function CategoryShowcase() {
  return (
    <section className="border-b bg-beige/60" aria-label="Product categories">
      <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-6 sm:px-6">
        {PRODUCTS.map((p) => (
          <a key={p.id} href="#products" className="flex shrink-0 items-center gap-3 rounded-full border bg-card py-1.5 pl-1.5 pr-4 text-sm font-semibold shadow-sm transition hover:border-primary">
            <img src={p.image} alt="" loading="lazy" width={36} height={36} className="size-9 rounded-full object-cover" />
            {p.name}
          </a>
        ))}
      </div>
    </section>
  );
}

const WHY = [
  { icon: Boxes, title: "Many materials, one supplier", text: "Cement, sand, steel, bricks, pavers, blocks and aggregates — enquire for everything in one conversation." },
  { icon: MessageSquareText, title: "Quick, direct enquiries", text: "Talk to us directly by phone or WhatsApp. No forms to wait on, no middlemen." },
  { icon: Truck, title: "Supply requirements discussed", text: "Share your quantity and site location and we'll discuss pricing, availability and supply options." },
];

export function WhyUs() {
  return (
    <section id="why" className="bg-charcoal py-20 text-charcoal-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow">Why choose MK TRADERS</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl md:text-5xl">{BUSINESS.tagline}</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {WHY.map((w) => (
            <div key={w.title} className="rounded-2xl border border-charcoal-foreground/10 bg-charcoal-foreground/5 p-7">
              <w.icon className="size-8 text-primary" aria-hidden />
              <h3 className="mt-5 text-xl font-bold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-foreground/70">{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: PackageSearch, title: "Choose your product", text: "Browse our materials and pick what your project needs." },
  { icon: ClipboardList, title: "Share quantity & delivery location", text: "Tell us how much you need and where your site is." },
  { icon: Handshake, title: "Contact MK TRADERS", text: "Confirm current pricing and availability by call or WhatsApp." },
];

export function HowToOrder() {
  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
      <p className="eyebrow">How to order</p>
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">Three simple steps</h2>
      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative rounded-2xl border bg-card p-7 shadow-card">
            <span className="font-display text-6xl font-extrabold text-primary/15">0{i + 1}</span>
            <s.icon className="absolute right-7 top-7 size-7 text-primary" aria-hidden />
            <h3 className="mt-2 text-xl font-bold">Step {i + 1}: {s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Gallery() {
  const items = [{ src: hero, alt: "Building material yard with cement, bricks, sand and steel" }, ...PRODUCTS.map((p) => ({ src: p.image, alt: p.name }))];
  return (
    <section id="gallery" className="bg-beige/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow">Gallery</p>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">Materials & stock</h2>
        <div className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4">
          {items.map((it, i) => (
            <figure key={i} className={`group overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <img src={it.src} alt={it.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "How can I get the current price of a material?", a: "Prices depend on market rates, quantity and location, so we don't list them online. Tap “Get Price on WhatsApp” on any product or call us for current pricing." },
  { q: "Which building materials do you supply?", a: `We deal in ${PRODUCTS.map((p) => p.name).join(", ")}. Ask us about any other construction material you need.` },
  { q: "Do you deliver to my site?", a: "Please share your delivery location and quantity with us by phone or WhatsApp, and we'll let you know the supply options for your site." },
  { q: "What details should I share for a quick quote?", a: "Product, required quantity (with unit), delivery locality, and any specific size or grade requirement." },
  { q: "Is my information stored on this website?", a: "No. The enquiry form and assistant only prepare a WhatsApp message on your device. Nothing is sent until you press Send in WhatsApp." },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
      <p className="eyebrow text-center">FAQ</p>
      <h2 className="mt-3 text-center text-3xl font-extrabold sm:text-4xl">Frequently asked questions</h2>
      <Accordion type="single" collapsible className="mt-10">
        {FAQS.map((f, i) => (
          <AccordionItem key={i} value={`f${i}`}>
            <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function ContactInfo() {
  return (
    <div>
      <p className="eyebrow">Contact</p>
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">Get pricing & availability</h2>
      <p className="mt-4 max-w-md text-muted-foreground">Call or WhatsApp MK TRADERS with your requirement, or fill in the quote form.</p>
      <ul className="mt-8 space-y-4">
        <li><a href={telLink} className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm hover:border-primary"><span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground"><Phone className="size-5" /></span><span><span className="block text-xs text-muted-foreground">Phone</span><span className="font-semibold">{BUSINESS.phoneDisplay}</span></span></a></li>
        <li><a href={waLink(generalWaMessage)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm hover:border-primary"><span className="grid size-11 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground"><MessageCircle className="size-5" /></span><span><span className="block text-xs text-muted-foreground">WhatsApp</span><span className="font-semibold">{BUSINESS.phoneDisplay}</span></span></a></li>
        <li><a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm hover:border-primary"><span className="grid size-11 place-items-center rounded-full bg-charcoal text-charcoal-foreground"><Mail className="size-5" /></span><span className="min-w-0"><span className="block text-xs text-muted-foreground">Email</span><span className="block truncate font-semibold">{BUSINESS.email}</span></span></a></li>
        <li>
          <a href={mapPlaceLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-2xl border bg-card p-4 shadow-sm hover:border-primary">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-beige text-charcoal"><MapPin className="size-5" /></span>
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">Address</span>
              <span className="block font-semibold">{BUSINESS.addressLine1}</span>
              <span className="block text-sm text-muted-foreground">{BUSINESS.addressLine2}</span>
              <span className="block text-sm text-muted-foreground">{BUSINESS.city}, {BUSINESS.state}, {BUSINESS.country}</span>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary">Get directions <ArrowUpRight className="size-3.5" /></span>
            </span>
          </a>
        </li>
      </ul>
      <div className="mt-6 overflow-hidden rounded-2xl border bg-card shadow-sm">
        <iframe
          title="Map showing MK TRADERS in Lucknow"
          src={mapEmbedLink}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
          className="h-56 w-full border-0 md:h-64"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3">
          <span className="text-xs text-muted-foreground">{addressLines.join(", ")}</span>
          <a href={mapDirectionsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">Open in Google Maps <ArrowUpRight className="size-3.5" /></a>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3"><CallButton /><WhatsAppButton /></div>
    </div>
  );
}


export function Footer() {
  return (
    <footer className="bg-charcoal pb-24 pt-14 text-charcoal-foreground md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-charcoal-foreground/70">{BUSINESS.category}. {BUSINESS.tagline}.</p>
          <a href={mapPlaceLink} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-start gap-2 text-sm text-charcoal-foreground/70 hover:text-primary">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>{BUSINESS.addressLine1}, {BUSINESS.addressLine2}, {BUSINESS.city}</span>
          </a>
        </div>

        <div><h3 className="font-bold">Products</h3><ul className="mt-3 space-y-1.5 text-sm text-charcoal-foreground/70">{PRODUCTS.map((p) => <li key={p.id}><a href="#products" className="hover:text-primary">{p.name}</a></li>)}</ul></div>
        <div><h3 className="font-bold">Contact</h3><ul className="mt-3 space-y-1.5 text-sm text-charcoal-foreground/70">
          <li><a href={telLink} className="hover:text-primary">{BUSINESS.phoneDisplay}</a></li>
          <li><a href={waLink(generalWaMessage)} target="_blank" rel="noopener noreferrer" className="hover:text-primary">WhatsApp</a></li>
          <li><a href={`mailto:${BUSINESS.email}`} className="break-all hover:text-primary">{BUSINESS.email}</a></li>
        </ul></div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-charcoal-foreground/10 px-4 pt-6 text-xs text-charcoal-foreground/50 sm:px-6">© {new Date().getFullYear()} MK TRADERS. All rights reserved.</p>
    </footer>
  );
}
