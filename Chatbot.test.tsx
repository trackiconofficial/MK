import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Chatbot } from "./Chatbot";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Chatbot effect cleanup", () => {
  it("does not use a scrolling return value as cleanup when messages change or the chat unmounts", () => {
    const scrollIntoView = vi.fn(() => Promise.resolve());
    const original = Object.getOwnPropertyDescriptor(Element.prototype, "scrollIntoView");
    Object.defineProperty(Element.prototype, "scrollIntoView", { configurable: true, value: scrollIntoView });

    try {
      const view = render(<Chatbot open onOpenChange={() => {}} />);
      fireEvent.click(screen.getByRole("button", { name: /^Cement$/ }));
      expect(screen.getByText(/How much do you need/)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText("Type your message"), { target: { value: "100 bags" } });
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));
      expect(screen.getByText(/What is the delivery location/)).toBeInTheDocument();
      expect(scrollIntoView).toHaveBeenCalled();
      act(() => view.unmount());
    } finally {
      if (original) Object.defineProperty(Element.prototype, "scrollIntoView", original);
      else Reflect.deleteProperty(Element.prototype, "scrollIntoView");
    }
  });
});