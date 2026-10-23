import { describe, it, expect } from "vitest";
import { telLink, waLink, productWaMessage, PRODUCTS, inquiryWaMessage, BUSINESS, addressFull, mapEmbedLink, mapDirectionsLink, mapPlaceLink } from "./business";


describe("contact links", () => {
  it("tel link uses +918601283163", () => expect(telLink).toBe("tel:+918601283163"));
  it("whatsapp link uses wa.me/918601283163 and encodes text", () => {
    expect(waLink("Hi & bye")).toBe("https://wa.me/918601283163?text=Hi%20%26%20bye");
  });
  it("product message includes product name", () => {
    const steel = PRODUCTS.find((p) => p.id === "steel")!;
    expect(productWaMessage(steel)).toContain("TMT Steel Bars");
  });
  it("inquiry message includes quantity with unit and location", () => {
    const m = inquiryWaMessage({ name: "Ravi", product: "Cement", quantity: "50", unit: "bags", location: "Sector 5" });
    expect(m).toContain("Quantity: 50 bags");
    expect(m).toContain("Delivery location: Sector 5");
  });
  it("address is the Navada Road yard in Lucknow", () => {
    expect(BUSINESS.addressLine1).toBe("Navada Road, Near Bajrang Chauraha");
    expect(BUSINESS.addressLine2).toBe("Amrai Goan, Indira Nagar");
    expect(BUSINESS.city).toBe("Lucknow");
    expect(addressFull).toBe("Navada Road, Near Bajrang Chauraha, Amrai Goan, Indira Nagar, Lucknow, Uttar Pradesh, India");
  });
  it("geo coordinates match 26°55'26.9\"N 81°01'31.0\"E", () => {
    expect(BUSINESS.geo.lat).toBeCloseTo(26.924139, 5);
    expect(BUSINESS.geo.lng).toBeCloseTo(81.025278, 5);
  });
  it("map links point at the yard coordinates", () => {
    expect(mapEmbedLink).toContain("q=26.924139,81.025278");
    expect(mapPlaceLink).toContain("query=26.924139,81.025278");
    expect(mapDirectionsLink).toContain("destination=26.924139,81.025278");
  });
});

