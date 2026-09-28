"use client";

import { useNegotiation } from "@/contexts/NegotiationContext";

export default function PaymentPage() {
  const { selectedOffer } = useNegotiation();

  return (
    <main>
      <h1>Pagamento</h1>

      <p>
        Oferta selecionada: {selectedOffer?.creditorName}
      </p>
    </main>
  );
}