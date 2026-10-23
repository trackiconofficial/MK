import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { CallButton, WhatsAppButton } from "./ContactButtons";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#products", label: "Products" },
  { href: "#why", label: "Why Us" },
  { href: "#how", label: "How to Order" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

import logoUrl from "@/assets/logo.png";

export function Logo({ light }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label={`${BUSINESS.name} home`}>
      <img src={logoUrl} alt="MK TRADERS logo" width={60} height={46} className="h-11 w-auto rounded-md object-contain" />
      <span className={cn("font-display text-lg font-extrabold leading-tight tracking-normal text-brand-ink whitespace-nowrap sm:text-xl", light && "rounded-sm bg-background px-2 py-1")}>
        MK TRADERS
      </span>
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("sticky top-0 z-40 transition-all", scrolled || open ? "bg-background/90 backdrop-blur-lg border-b shadow-sm" : "bg-background/70 backdrop-blur")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.href}><a className="transition-colors hover:text-foreground" href={n.href}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <WhatsAppButton size="sm" label="WhatsApp" className="hidden md:inline-flex" />
          <CallButton size="sm" />
          <button className="grid size-9 place-items-center rounded-full border lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t lg:hidden">
          <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
            {NAV.map((n) => (
              <li key={n.href}><a onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-medium hover:bg-muted" href={n.href}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
