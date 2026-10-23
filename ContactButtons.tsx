import { Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { telLink, waLink, generalWaMessage } from "@/lib/business";

type Size = "sm" | "md" | "lg";
const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-6 text-base gap-2",
};
const base =
  "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] whitespace-nowrap";

export function WhatsAppButton({
  message = generalWaMessage, label = "Get Price on WhatsApp", size = "md", className,
}: { message?: string; label?: string; size?: Size; className?: string }) {
  return (
    <a href={waLink(message)} target="_blank" rel="noopener noreferrer"
      aria-label={`${label} (opens WhatsApp)`}
      className={cn(base, sizes[size], "bg-whatsapp text-whatsapp-foreground hover:brightness-110 shadow-sm", className)}>
      <MessageCircle className="size-4" aria-hidden /> {label}
    </a>
  );
}

export function CallButton({
  label = "Call Now", size = "md", variant = "primary", className,
}: { label?: string; size?: Size; variant?: "primary" | "outline" | "light"; className?: string }) {
  const v = {
    primary: "bg-primary text-primary-foreground hover:brightness-110 shadow-glow",
    outline: "border border-foreground/20 text-foreground hover:bg-foreground/5",
    light: "border border-charcoal-foreground/30 text-charcoal-foreground hover:bg-charcoal-foreground/10",
  }[variant];
  return (
    <a href={telLink} aria-label={`${label}: +91 86012 83163`} className={cn(base, sizes[size], v, className)}>
      <Phone className="size-4" aria-hidden /> {label}
    </a>
  );
}
