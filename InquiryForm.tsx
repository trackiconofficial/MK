import { useState, useEffect } from "react";
import { z } from "zod";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { PRODUCTS, ALL_UNITS, inquiryWaMessage, waLink } from "@/lib/business";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  product: z.string().min(1, "Please choose a product"),
  quantity: z.string().trim().min(1, "Please enter the quantity").max(30),
  unit: z.string().min(1),
  location: z.string().trim().min(2, "Please enter the delivery locality").max(120),
  notes: z.string().trim().max(500).optional(),
  contactMethod: z.enum(["Call", "WhatsApp"]),
});
type Form = z.infer<typeof schema>;

const field = "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";

export function InquiryForm({ selectedProductId }: { selectedProductId?: string | undefined }) {
  const [f, setF] = useState<Form>({ name: "", phone: "", product: "", quantity: "", unit: "bags", location: "", notes: "", contactMethod: "WhatsApp" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const p = PRODUCTS.find((x) => x.id === selectedProductId);
    if (p) setF((s) => ({ ...s, product: p.name, unit: p.units[0] ?? "other" }));
  }, [selectedProductId]);

  const product = PRODUCTS.find((p) => p.name === f.product);
  const units = product ? [...product.units, "other"] : ALL_UNITS;
  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setF((s) => {
      const next = { ...s, [k]: v };
      if (k === "product") { const p = PRODUCTS.find((x) => x.name === v); if (p) next.unit = p.units[0] ?? "other"; }
      return next;
    });
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as keyof Form] ??= i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    window.open(waLink(inquiryWaMessage(r.data)), "_blank", "noopener,noreferrer");
    setOpened(true);
  }

  const Err = ({ k }: { k: keyof Form }) => errors[k] ? <p id={`${k}-err`} className="mt-1 text-xs font-medium text-destructive">{errors[k]}</p> : null;
  const aria = (k: keyof Form) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border bg-card p-6 shadow-card sm:p-8" aria-labelledby="form-title">
      <h3 id="form-title" className="text-2xl font-bold">Request a quote</h3>
      <p className="mt-1 text-sm text-muted-foreground">Fill in your requirement — we'll prepare a WhatsApp message for you to send.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">Your name *<input className={field} value={f.name} onChange={set("name")} autoComplete="name" {...aria("name")} /><Err k="name" /></label>
        <label className="text-sm font-medium">Mobile number *<input className={field} value={f.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" {...aria("phone")} /><Err k="phone" /></label>
        <label className="text-sm font-medium sm:col-span-2">Product *
          <select className={field} value={f.product} onChange={set("product")} {...aria("product")}>
            <option value="">Select a product</option>
            {PRODUCTS.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
            <option value="Other building material">Other building material</option>
          </select><Err k="product" />
        </label>
        <label className="text-sm font-medium">Required quantity *<input className={field} value={f.quantity} onChange={set("quantity")} inputMode="decimal" placeholder="e.g. 100" {...aria("quantity")} /><Err k="quantity" /></label>
        <label className="text-sm font-medium">Unit
          <select className={field} value={f.unit} onChange={set("unit")}>{units.map((u) => <option key={u} value={u}>{u}</option>)}</select>
        </label>
        <label className="text-sm font-medium sm:col-span-2">Delivery locality *<input className={field} value={f.location} onChange={set("location")} placeholder="Area / locality / site" {...aria("location")} /><Err k="location" /></label>
        <label className="text-sm font-medium sm:col-span-2">Additional requirements<textarea className={field} rows={3} value={f.notes} onChange={set("notes")} placeholder="Size, grade, timing or anything else" /></label>
        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium">Preferred contact method</legend>
          <div className="mt-2 flex gap-3">
            {(["WhatsApp", "Call"] as const).map((m) => (
              <label key={m} className="flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-accent">
                <input type="radio" name="contact" className="accent-primary" checked={f.contactMethod === m} onChange={() => setF((s) => ({ ...s, contactMethod: m }))} /> {m}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <button type="submit" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-whatsapp-foreground transition hover:brightness-110">
        <MessageCircle className="size-4" aria-hidden /> Send Enquiry on WhatsApp
      </button>
      {opened && (
        <p role="status" className="mt-3 rounded-xl bg-accent px-4 py-3 text-sm">
          WhatsApp has been opened with your enquiry. Please press <strong>Send</strong> in WhatsApp to deliver it to MK TRADERS. If it didn't open, use the Call button instead.
        </p>
      )}
      <p className="mt-4 flex gap-2 text-xs leading-relaxed text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
        Privacy: your details are not saved on this website. They are only placed into a WhatsApp message on your own device, which you choose to send. MK TRADERS will use them only to respond to your enquiry.
      </p>
    </form>
  );
}
