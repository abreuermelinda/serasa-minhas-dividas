"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Offer } from "@/types/offer";
import type { PaymentMethod } from "@/types/paymentMethod";

type NegotiationContextValue = {
  selectedOffer: Offer | null;
  selectedPaymentMethod: PaymentMethod | null;
  selectOffer: (offer: Offer) => void;
  selectPaymentMethod: (paymentMethod: PaymentMethod) => void;
  resetNegotiation: () => void;
};

const NegotiationContext =
  createContext<NegotiationContextValue | null>(null);

type NegotiationProviderProps = {
  children: ReactNode;
};

export function NegotiationProvider({
  children,
}: NegotiationProviderProps) {
  const [selectedOffer, setSelectedOffer] =
    useState<Offer | null>(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  function selectOffer(offer: Offer) {
    setSelectedOffer(offer);

    // Se o usuário trocar de oferta, uma forma de pagamento
    // escolhida anteriormente não deve continuar selecionada.
    setSelectedPaymentMethod(null);
  }

  function selectPaymentMethod(paymentMethod: PaymentMethod) {
    setSelectedPaymentMethod(paymentMethod);
  }

  function resetNegotiation() {
    setSelectedOffer(null);
    setSelectedPaymentMethod(null);
  }

  return (
    <NegotiationContext.Provider
      value={{
        selectedOffer,
        selectedPaymentMethod,
        selectOffer,
        selectPaymentMethod,
        resetNegotiation,
      }}
    >
      {children}
    </NegotiationContext.Provider>
  );
}

export function useNegotiation() {
  const context = useContext(NegotiationContext);

  if (!context) {
    throw new Error(
      "useNegotiation deve ser utilizado dentro de NegotiationProvider",
    );
  }

  return context;
}