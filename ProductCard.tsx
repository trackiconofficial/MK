import { Send } from "lucide-react";
import { type Product, productWaMessage } from "@/lib/business";
import { CallButton, WhatsAppButton } from "./ContactButtons";

export function ProductCard({ product, onEnquire }: { product: Product; onEnquire: (id: string) => void }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={product.image} alt={`${product.name} stocked for supply`} loading="lazy" width={928} height={720}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">Contact for Price</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        <div className="mt-5 grid gap-2">
          <button onClick={() => onEnquire(product.id)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-charcoal text-sm font-semibold text-charcoal-foreground transition hover:brightness-125">
            <Send className="size-4" aria-hidden /> Enquire Now
          </button>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <WhatsAppButton size="sm" label="Get Price" message={productWaMessage(product)} className="h-10" />
            <CallButton size="sm" variant="outline" className="h-10" />
          </div>
        </div>
      </div>
    </article>
  );
}
