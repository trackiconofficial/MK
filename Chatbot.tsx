import { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { ruleEngine, type ChatState, type BotReply } from "@/lib/chatbot";
import { PRODUCTS, generalWaMessage } from "@/lib/business";
import { CallButton, WhatsAppButton } from "./ContactButtons";
import { cn } from "@/lib/utils";

type Msg = { from: "bot" | "user"; text: string; reply?: BotReply };

export function Chatbot({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [state, setState] = useState<ChatState | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !state) {
      const s = ruleEngine.start();
      setState(s.state);
      setMsgs([{ from: "bot", text: s.reply.text, reply: s.reply }]);
    }
  }, [open, state]);
  useEffect(() => {
    // Ignore DOM/polyfill return values: React only accepts a cleanup function.
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function send(text: string) {
    if (!text.trim()) return;
    const current = state ?? ruleEngine.start().state;
    let r: { state: ChatState; reply: BotReply } | undefined;
    try {
      r = ruleEngine.respond(current, text);
    } catch {
      r = undefined;
    }
    if (!r?.reply) {
      r = {
        state: { step: "product", data: {} },
        reply: {
          text: "Sorry, I didn't catch that. Please pick a material below, or contact MK TRADERS directly.",
          options: PRODUCTS.map((p) => p.short),
          actions: { whatsappMessage: generalWaMessage },
        },
      };
    }
    const res = r;
    setState(res.state);
    setMsgs((m) => [...m, { from: "user", text }, { from: "bot", text: res.reply.text, reply: res.reply }]);
    setInput("");
  }

  const last = msgs[msgs.length - 1];

  return (
    <>
      <button onClick={() => onOpenChange(!open)} aria-label={open ? "Close MK TRADERS Assistant" : "Open MK TRADERS Assistant"}
        className="fixed bottom-20 right-4 z-50 grid size-14 place-items-center rounded-full bg-charcoal text-charcoal-foreground shadow-card transition hover:scale-105 md:bottom-6 md:right-6">
        {open ? <X className="size-6" /> : <Bot className="size-6" />}
      </button>
      {open && (
        <div role="dialog" aria-label="MK TRADERS Assistant"
          className="fixed inset-x-3 bottom-36 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border bg-card shadow-card fade-up sm:inset-x-auto sm:right-6 sm:w-96 md:bottom-24">
          <div className="flex items-center gap-3 bg-charcoal px-4 py-3 text-charcoal-foreground">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><Bot className="size-5" /></span>
            <div className="flex-1"><p className="font-display font-bold">MK TRADERS Assistant</p><p className="text-xs opacity-70">Product enquiry helper</p></div>
            <button onClick={() => onOpenChange(false)} aria-label="Close chat"><X className="size-5" /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-muted/50 p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={cn("max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm", m.from === "bot" ? "bg-card shadow-sm" : "ml-auto bg-primary text-primary-foreground")}>
                {m.text}
                {m.reply?.actions && (
                  <div className="mt-3 grid gap-2">
                    <WhatsAppButton size="sm" label="WhatsApp Inquiry" message={m.reply.actions.whatsappMessage} />
                    <CallButton size="sm" />
                  </div>
                )}
              </div>
            ))}
            {last?.reply?.options && (
              <div className="flex flex-wrap gap-2">
                {last.reply.options.map((o) => (
                  <button key={o} onClick={() => send(o)} className="rounded-full border border-primary/40 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent">{o}</button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t p-3">
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <input id="chat-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" className="flex-1 rounded-full border bg-background px-4 text-sm outline-none focus:border-primary" />
            <button type="submit" aria-label="Send message" className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><Send className="size-4" /></button>
          </form>
        </div>
      )}
    </>
  );
}
