"use client";

import { useNegotiation } from "@/contexts/NegotiationContext";

export default function ReviewPage() {
  const {
    selectedOffer,
    selectedPaymentMethod,
  } = useNegotiation();

  return (
    <main>
      <h1>Revisão</h1>

      <p>
        Oferta: {selectedOffer?.creditorName}
      </p>

      <p>
        Pagamento: {selectedPaymentMethod?.label}
      </p>
    </main>
  );
}