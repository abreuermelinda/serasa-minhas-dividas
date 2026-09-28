import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { describe, expect, it, vi } from "vitest";

import { NegotiationProvider, useNegotiation } from "@/contexts/NegotiationContext";
import type { Offer } from "@/types/offer";

import PaymentPage from "./page";

const pushMock = vi.fn();
const replaceMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
  }),
}));

const selectedOffer: Offer = {
  id: "offer-001",
  creditorName: "Banco Horizonte",
  debtType: "Cartão de crédito",
  debtSince: "2023-03",
  originalAmount: 3480.9,
  negotiatedAmount: 689,
  discountPercentage: 80,
  paymentCondition: {
    type: "cash",
  },
  isBestOffer: true,
};

function PaymentPageWithSelectedOffer() {
  const { selectedOffer: currentOffer, selectOffer } = useNegotiation();

  useEffect(() => {
    if (!currentOffer) {
      selectOffer(selectedOffer);
    }
  }, [currentOffer, selectOffer]);

  if (!currentOffer) {
    return null;
  }

  return <PaymentPage />;
}

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <NegotiationProvider>
        <PaymentPageWithSelectedOffer />
      </NegotiationProvider>
    </QueryClientProvider>,
  );
}

describe("Payment page", () => {
  it("enables review button after selecting a payment method", async () => {
    const user = userEvent.setup();

    renderPage();

    const pixRadio = await screen.findByRole("radio", {
      name: /pix/i,
    });

    const reviewButton = screen.getByRole("button", {
      name: /ir para revisão/i,
    });

    expect(reviewButton).toBeDisabled();

    await user.click(pixRadio);

    expect(pixRadio).toBeChecked();
    expect(reviewButton).toBeEnabled();
  });
});