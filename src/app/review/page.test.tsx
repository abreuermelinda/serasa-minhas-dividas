import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";

import {
  NegotiationProvider,
  useNegotiation,
} from "@/contexts/NegotiationContext";
import { server } from "@/mocks/server";
import type { Offer } from "@/types/offer";
import type { PaymentMethod } from "@/types/paymentMethod";

import ReviewPage from "./page";

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

const selectedPaymentMethod: PaymentMethod = {
  id: "payment-pix",
  type: "pix",
  label: "Pix",
  description: "Pagamento na hora, sem sair de casa",
  isFastest: true,
};

function ReviewPageWithNegotiation() {
  const {
    selectedOffer: currentOffer,
    selectedPaymentMethod: currentPaymentMethod,
    selectOffer,
    selectPaymentMethod,
  } = useNegotiation();

  useEffect(() => {
    if (!currentOffer) {
      selectOffer(selectedOffer);
    }

    if (!currentPaymentMethod) {
      selectPaymentMethod(selectedPaymentMethod);
    }
  }, [
    currentOffer,
    currentPaymentMethod,
    selectOffer,
    selectPaymentMethod,
  ]);

  if (!currentOffer || !currentPaymentMethod) {
    return null;
  }

  return <ReviewPage />;
}

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <NegotiationProvider>
        <ReviewPageWithNegotiation />
      </NegotiationProvider>
    </QueryClientProvider>,
  );
}

describe("Review page", () => {
  it("shows an error message when agreement confirmation fails", async () => {
    const user = userEvent.setup();

    server.use(
      http.post("/api/review", () => {
        return HttpResponse.json(
          {
            message: "Erro interno ao confirmar acordo",
          },
          {
            status: 500,
          },
        );
      }),
    );

    renderPage();

    const termsCheckbox = await screen.findByRole("checkbox", {
      name: /li e aceito os termos do acordo/i,
    });

    const confirmButton = screen.getByRole("button", {
      name: /confirmar acordo/i,
    });

    expect(confirmButton).toBeDisabled();

    await user.click(termsCheckbox);

    expect(termsCheckbox).toBeChecked();
    expect(confirmButton).toBeEnabled();

    await user.click(confirmButton);

    expect(
      await screen.findByText(
        /não foi possível confirmar o acordo\. tente novamente\./i,
      ),
    ).toBeInTheDocument();
  });
});