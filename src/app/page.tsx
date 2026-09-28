"use client";

import { useRouter } from "next/navigation";

import { OfferCard } from "@/components/OfferCard/OfferCard";
import { useNegotiation } from "@/contexts/NegotiationContext";
import { useOffers } from "@/hooks/useOffers";
import type { Offer } from "@/types/offer";

import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const {
    data: offers,
    isLoading,
    isError,
  } = useOffers();

  const { selectOffer } = useNegotiation();

  function handleSelectOffer(offer: Offer) {
    selectOffer(offer);
    router.push("/payment");
  }

  if (isLoading) {
    return (
      <main className={styles.container}>
        <p>Carregando ofertas...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className={styles.container}>
        <p>Não foi possível carregar as ofertas.</p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Escolha como quitar sua dívida</h1>
        <p>
          Ofertas para limpar seu nome. Os valores já incluem os descontos.
        </p>
      </header>

      <section
        className={styles.offersGrid}
        aria-label="Ofertas disponíveis"
      >
        {offers?.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onSelect={handleSelectOffer}
          />
        ))}
      </section>
    </main>
  );
}