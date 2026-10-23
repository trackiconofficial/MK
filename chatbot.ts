/**
 * Rule-based chatbot engine. To connect a real AI model later, implement the
 * same `ChatEngine` interface (e.g. calling a server function) and swap it in.
 * The engine must never invent prices, availability or delivery commitments.
 */
import { PRODUCTS, inquiryWaMessage, type InquiryDetails } from "./business";

export type Step = "product" | "quantity" | "location" | "interest" | "summary" | "human";
export type ChatState = { step: Step; data: Partial<InquiryDetails> };
export type BotReply = { text: string; options?: string[]; actions?: { whatsappMessage: string } };
export interface ChatEngine {
  start(): { state: ChatState; reply: BotReply };
  respond(state: ChatState, input: string): { state: ChatState; reply: BotReply };
}

export const QUICK_OPTIONS = ["Cement", "Sand", "Steel", "Bricks", "Interlocking Tiles", "Gitti / Aggregates", "Get Price", "Talk to a Person"];

const KEYWORDS: [RegExp, string][] = [
  [/cement/i, "cement"],
  [/sand|ret|balu/i, "sand"],
  [/steel|tmt|sariya|saria|rod|bar/i, "steel"],
  [/brick|eent|int\b/i, "bricks"],
  [/tile|paver/i, "pavers"],
  [/block/i, "blocks"],
  [/gitti|aggregate|gravel|stone|kapchi/i, "aggregates"],
];

export function detectProduct(input: string) {
  for (const [re, id] of KEYWORDS) if (re.test(input)) return PRODUCTS.find((p) => p.id === id);
  return undefined;
}

const productPrompt: BotReply = {
  text: "Which building material do you need?",
  options: PRODUCTS.map((p) => p.short),
};

export const ruleEngine: ChatEngine = {
  start() {
    return {
      state: { step: "product", data: {} },
      reply: { text: "Welcome to MK TRADERS! What building material do you need today?", options: QUICK_OPTIONS },
    };
  },
  respond(state, raw) {
    const input = raw.trim();
    if (/talk to a person|human|call|person|agent/i.test(input)) {
      return {
        state: { ...state, step: "human" },
        reply: {
          text: "Sure! You can speak directly with MK TRADERS by phone or WhatsApp using the buttons below.",
          actions: { whatsappMessage: state.data.product ? inquiryWaMessage(state.data as InquiryDetails) : "Hello MK TRADERS, I would like to speak with someone about building materials." },
        },
      };
    }
    if (/^restart|start over|new enquiry/i.test(input)) return this.start();

    switch (state.step) {
      case "product":
      case "human": {
        const p = detectProduct(input);
        if (!p) return { state: { ...state, step: "product" }, reply: productPrompt };
        return {
          state: { step: "quantity", data: { ...state.data, product: p.name, unit: p.units[0] } },
          reply: { text: `Great, ${p.name}. How much do you need? (for example: 100 ${p.units[0]})` },
        };
      }
      case "quantity":
        return {
          state: { step: "location", data: { ...state.data, quantity: input, unit: /[a-z]/i.test(input) ? undefined : state.data.unit } },
          reply: { text: "Thanks. What is the delivery location or locality?" },
        };
      case "location":
        return {
          state: { step: "interest", data: { ...state.data, location: input } },
          reply: { text: "Would you like pricing, availability, or both?", options: ["Pricing", "Availability", "Both"] },
        };
      case "interest":
      case "summary": {
        const interest = /both/i.test(input) ? "Pricing and availability" : /avail/i.test(input) ? "Availability" : "Pricing";
        const data = { ...state.data, interest } as InquiryDetails;
        return {
          state: { step: "summary", data },
          reply: {
            text: `Here's your enquiry:\n• Product: ${data.product}\n• Quantity: ${data.quantity}\n• Location: ${data.location}\n• Looking for: ${interest}\n\nI can't quote prices or confirm stock here — MK TRADERS will share current details directly. Send this on WhatsApp or call now.`,
            actions: { whatsappMessage: inquiryWaMessage(data) },
            options: ["Start over"],
          },
        };
      }
    }
  },
};
