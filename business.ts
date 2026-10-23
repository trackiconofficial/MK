import cement from "@/assets/cement.jpg";
import sand from "@/assets/sand.jpg";
import steel from "@/assets/steel.jpg";
import bricks from "@/assets/bricks.jpg";
import pavers from "@/assets/pavers.jpg";
import blocks from "@/assets/blocks-real.jpg";
import aggregates from "@/assets/aggregates.jpg";

/** Edit business contact details here. */
export const BUSINESS = {
  name: "MK TRADERS",
  category: "Building Material Supplier",
  tagline: "All Types of Building Materials Under One Roof",
  phoneDisplay: "+91 86012 83163",
  phoneE164: "+918601283163",
  whatsappNumber: "918601283163",
  email: "kaleemhafiz141@gmail.com",
  addressLine1: "Navada Road, Near Bajrang Chauraha",
  addressLine2: "Amrai Goan, Indira Nagar",
  city: "Lucknow",
  state: "Uttar Pradesh",
  country: "India",
  /** 26°55'26.9"N 81°01'31.0"E */
  geo: { lat: 26.924139, lng: 81.025278 },
};

export const addressLines = [
  BUSINESS.addressLine1,
  BUSINESS.addressLine2,
  `${BUSINESS.city}, ${BUSINESS.state}, ${BUSINESS.country}`,
];

export const addressFull = addressLines.join(", ");


export const telLink = `tel:${BUSINESS.phoneE164}`;

export function waLink(message?: string) {
  const base = `https://wa.me/${BUSINESS.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const generalWaMessage =
  "Hello MK TRADERS, I would like to enquire about building materials. Please share current pricing and availability.";

const geoQuery = `${BUSINESS.geo.lat},${BUSINESS.geo.lng}`;

export const mapEmbedLink = `https://maps.google.com/maps?q=${geoQuery}&z=16&output=embed`;
export const mapPlaceLink = `https://www.google.com/maps/search/?api=1&query=${geoQuery}`;
export const mapDirectionsLink = `https://www.google.com/maps/dir/?api=1&destination=${geoQuery}`;


export type Product = {
  id: string;
  name: string;
  short: string;
  description: string;
  image: string;
  units: string[];
  waAsk: string;
};

export const PRODUCTS: Product[] = [
  { id: "cement", name: "Cement", short: "Cement", image: cement,
    description: "We source and supply top-grade cement bags from India’s most trusted premium brands—including UltraTech Cement, ACC, Ambuja, and Dalmia Cement. Specially formulated for high compressive strength and long-lasting durability, these premium cement mixes are ideal for constructing robust structural foundations, executing smooth wall plastering, building secure brick masonry, and handling all general construction work. Ensure crack-resistant longevity and uncompromised structural integrity for your residential or commercial projects from the foundation up.",
    units: ["bags", "tonnes"], waAsk: "current pricing, available grades/brands, quantity options, and supply details" },
  { id: "sand", name: "Sand", short: "Sand", image: sand,
    description: "Achieve uncompromised structural strength with our high-grade construction sand, meticulously processed to deliver structural excellence. Clean, silt-free, and perfectly graded, our premium selection includes coarse Morang river sand and high-performance M-Sand (manufactured sand) to ensure optimal mortar workability and maximum bonding capabilities. It is the ultimate choice for heavy-duty structural concrete, flawless wall plastering, and robust brickwork requirements.",
    units: ["cubic feet", "cubic metres", "tonnes"], waAsk: "current pricing, sand types, quantity options, and supply details" },
  { id: "steel", name: "TMT Steel Bars", short: "Steel", image: steel,
    description: "Build an unbreakable foundation with premium TMT reinforcement bars from India’s top-ranking manufacturers—including Tata Tiscon, JSW Neo, and Jindal Panther. Engineered in high-performance grades like Fe 500D and Fe 550D, these heavy-duty TMT steel bars deliver unmatched tensile strength, high ductility, and superior earthquake resistance. They serve as the reliable, high-performance backbone for casting robust slabs, beams, columns, and RCC structures.",
    units: ["kg", "tonnes", "pieces"], waAsk: "current pricing, available sizes, quantity options, and supply details" },
  { id: "bricks", name: "Red Clay Bricks", short: "Bricks", image: bricks,
    description: "Red clay bricks remain the premier choice for building durable walls, boundary structures, and heavy-duty load-bearing masonry. Crafted through traditional firing methods, these premium clay building bricks offer exceptional structural strength, natural thermal insulation, and superior weather resistance. Whether you are constructing residential foundations or high-strength boundary walls, classic red bricks deliver timeless aesthetic appeal alongside long-lasting structural integrity.",
    units: ["pieces"], waAsk: "current pricing, quantity options, and supply details" },
  { id: "pavers", name: "Interlocking Tiles / Paver Blocks", short: "Interlocking Tiles", image: pavers,
    description: "Transform your property with high-strength interlocking tiles and paver blocks, the ultimate choice for heavy-duty driveways, elegant courtyards, footpaths, and commercial outdoor flooring. Engineered from premium precast concrete, these durable, anti-slip pavers easily withstand heavy vehicle loads and harsh weather while delivering a clean, perfectly aligned grid layout. Choose our low-maintenance courtyard paving solutions to combine long-lasting structural resilience with high-end curb appeal. ",
    units: ["pieces", "square feet"], waAsk: "current pricing, available designs and colours, quantity options, and supply details" },
  { id: "blocks", name: "Cement Chequered Tiles", short: "Cement Chequered Tiles", image: blocks,
    description: "Cement chequered tiles are highly durable, premium precast concrete tiles engineered for superior heavy-duty performance. Available in specialized variants—including heavy-duty concrete chequered pavers, classic terrazzo chequered tiles, and decorative architectural wall cladding tiles—these anti-slip surfaces provide exceptional traction. Featuring a distinct grooved, checkered pattern, they are the ideal choice for high-traffic outdoor pavements, pathways, industrial areas, and structural facades. Their uniform dimensions ensure a perfectly neat, clean, and grid-locked alignment during installation.",
    units: ["pieces"], waAsk: "current pricing, available sizes, quantity options, and supply details" },
  { id: "aggregates", name: "Gitti / Construction Aggregates", short: "Gitti / Aggregates", image: aggregates,
    description: "Achieve maximum structural density with our premium crushed stone aggregates (gitti), meticulously sourced and graded for heavy-duty construction. Specially crushed for superior mechanical interlocking, our high-quality blue metal aggregates form a rock-solid structural matrix when mixed into concrete or laid as structural foundations. Available in precision-graded sizes—including 10mm, 20mm, and 40mm crushed stone—our aggregates are the ultimate choice for high-strength concrete, durable roads, and robust engineering base layers.",
    units: ["cubic feet", "cubic metres", "tonnes"], waAsk: "current pricing, available sizes, quantity options, and supply details" },
];

export const ALL_UNITS = ["bags", "kg", "tonnes", "pieces", "square feet", "cubic feet", "cubic metres", "other"];

export function productWaMessage(p: Product) {
  return `Hello MK TRADERS, I would like to enquire about ${p.name}. Please share ${p.waAsk}.`;
}

export type InquiryDetails = {
  name?: string | undefined;
  phone?: string | undefined;
  product: string;
  quantity?: string | undefined;
  unit?: string | undefined;
  location?: string | undefined;
  interest?: string | undefined;
  notes?: string | undefined;
  contactMethod?: string | undefined;
};

export function inquiryWaMessage(d: InquiryDetails) {
  const lines = ["Hello MK TRADERS, I would like to send an enquiry."];
  if (d.name) lines.push(`Name: ${d.name}`);
  if (d.phone) lines.push(`Mobile: ${d.phone}`);
  lines.push(`Product: ${d.product}`);
  if (d.quantity) lines.push(`Quantity: ${d.quantity}${d.unit ? " " + d.unit : ""}`);
  if (d.location) lines.push(`Delivery location: ${d.location}`);
  if (d.interest) lines.push(`Looking for: ${d.interest}`);
  if (d.notes) lines.push(`Additional requirements: ${d.notes}`);
  if (d.contactMethod) lines.push(`Preferred contact: ${d.contactMethod}`);
  lines.push("Please share pricing and availability.");
  return lines.join("\n");
}
