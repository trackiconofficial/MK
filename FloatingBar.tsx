import { MessageCircle, Phone } from "lucide-react";
import { telLink, waLink, generalWaMessage } from "@/lib/business";

export function FloatingBar() {
  return (
    <>
      {/* Desktop */}
      <div className="fixed bottom-24 right-6 z-40 hidden flex-col gap-3 md:flex">
        <a href={waLink(generalWaMessage)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp MK TRADERS"
          className="grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-card transition hover:scale-105"><MessageCircle className="size-6" /></a>
        <a href={telLink} aria-label="Call MK TRADERS"
          className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition hover:scale-105"><Phone className="size-6" /></a>
      </div>
      {/* Mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t bg-background/95 p-2 backdrop-blur md:hidden">
        <a href={telLink} className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground"><Phone className="size-4" /> Call Now</a>
        <a href={waLink(generalWaMessage)} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-whatsapp-foreground"><MessageCircle className="size-4" /> WhatsApp</a>
      </div>
    </>
  );
}
