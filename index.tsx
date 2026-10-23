import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCatalog } from "@/components/ProductCatalog";
import { InquiryForm } from "@/components/InquiryForm";
import { Chatbot } from "@/components/Chatbot";
import { FloatingBar } from "@/components/FloatingBar";
import { CategoryShowcase, WhyUs, HowToOrder, Gallery, FAQ, ContactInfo, Footer } from "@/components/Sections";
import { BUSINESS, PRODUCTS, mapPlaceLink } from "@/lib/business";


const TITLE = "MK TRADERS | Building Material Supplier in Lucknow";
const DESC = "MK TRADERS, Lucknow: cement, sand, TMT steel bars, red bricks, paver blocks, cement chequered tiles and gitti. Call or WhatsApp +91 86012 83163 for prices.";
const URL = "https://solid-stuff.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "building material supplier Lucknow, cement dealer Lucknow, TMT steel Lucknow, sand supplier, red bricks, paver blocks, chequered tiles, gitti, Indira Nagar, MK TRADERS" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:site_name", content: "MK TRADERS" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "geo.region", content: "IN-UP" },
      { name: "geo.placename", content: BUSINESS.city },
      { name: "geo.position", content: `${BUSINESS.geo.lat};${BUSINESS.geo.lng}` },
      { name: "ICBM", content: `${BUSINESS.geo.lat}, ${BUSINESS.geo.lng}` },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HardwareStore",
          "@id": URL,
          url: URL,
          name: BUSINESS.name,
          description: DESC,
          priceRange: "Contact for Price",
          hasMap: mapPlaceLink,
          makesOffer: PRODUCTS.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name: p.name, description: p.short } })),
          telephone: BUSINESS.phoneE164,
          email: BUSINESS.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: `${BUSINESS.addressLine1}, ${BUSINESS.addressLine2}`,
            addressLocality: BUSINESS.city,
            addressRegion: BUSINESS.state,
            addressCountry: "IN",
          },
          geo: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
          areaServed: BUSINESS.city,
        }),
      },
    ],
  }),
  component: Index,
});


function Index() {
  const [selected, setSelected] = useState<string>();
  const [chatOpen, setChatOpen] = useState(false);
  const enquire = (id: string) => {
    setSelected(id);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryShowcase />
        <ProductCatalog onEnquire={enquire} />
        <WhyUs />
        <HowToOrder />
        <Gallery />
        <FAQ />
        <section id="contact" className="border-t bg-muted/40 py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <ContactInfo />
            <InquiryForm selectedProductId={selected} />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingBar />
      <Chatbot open={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
}
