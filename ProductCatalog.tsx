import { PRODUCTS } from "@/lib/business";
import { ProductCard } from "./ProductCard";

export function ProductCatalog({ onEnquire }: { onEnquire: (id: string) => void }) {
  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28" aria-labelledby="products-title">
      <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow">Our Products</p>
          <h2 id="products-title" className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">Construction essentials, all in one place</h2>
        </div>
        <p className="max-w-md text-muted-foreground">Prices change with market rates and quantity. Enquire for current pricing and availability.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} onEnquire={onEnquire} />)}
      </div>
    </section>
  );
}
