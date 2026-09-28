"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AppHeader } from "@/components/AppHeader/AppHeader";
import { ProgressSteps } from "@/components/ProgressSteps/ProgressSteps";
import { PaymentMethodCard } from "@/components/PaymentMethodCard/PaymentMethodCard";
import { useNegotiation } from "@/contexts/NegotiationContext";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";
import type { PaymentMethod } from "@/types/paymentMethod";

import styles from "./page.module.css";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function PaymentPage() {
  const router = useRouter();

  const { selectedOffer, selectedPaymentMethod, selectPaymentMethod } =
    useNegotiation();

  const { data: paymentMethods, isLoading, isError } = usePaymentMethods();

  useEffect(() => {
    if (!selectedOffer) {
      router.replace("/");
    }
  }, [selectedOffer, router]);

  if (!selectedOffer) {
    return null;
  }

  function handleSelectPaymentMethod(paymentMethod: PaymentMethod) {
    selectPaymentMethod(paymentMethod);
  }

  function handleContinue() {
    if (!selectedPaymentMethod) {
      return;
    }

    router.push("/review");
  }

  function handleChangeOffer() {
    router.push("/");
  }

  function handleBack() {
    router.push("/");
  }

  if (isLoading) {
    return (
      <main className={styles.container}>
        <p>Carregando formas de pagamento...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className={styles.container}>
        <p>Não foi possível carregar as formas de pagamento.</p>
      </main>
    );
  }

  const creditorInitials = selectedOffer.creditorName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <>
      <AppHeader onBack={handleBack} />
      <main className={styles.container}>
        <div className={styles.progressContainer}>
          <ProgressSteps currentStep="payment" />
        </div>
        <header className={styles.pageHeader}>
          <h1>Como você quer pagar?</h1>

          <p>Escolha a forma de pagamento do seu acordo.</p>
        </header>

        <div className={styles.content}>
          <section
            className={styles.methods}
            aria-labelledby="payment-methods-title"
          >
            <h2 id="payment-methods-title" className={styles.visuallyHidden}>
              Formas de pagamento
            </h2>

            <div className={styles.methodsList}>
              {paymentMethods?.map((paymentMethod) => (
                <PaymentMethodCard
                  key={paymentMethod.id}
                  paymentMethod={paymentMethod}
                  isSelected={selectedPaymentMethod?.id === paymentMethod.id}
                  onSelect={handleSelectPaymentMethod}
                />
              ))}
            </div>
          </section>

          <section
            className={styles.offerSummary}
            aria-label="Oferta selecionada"
          >
            <div className={styles.offerInfo}>
              <div className={styles.creditorInitials} aria-hidden="true">
                {creditorInitials}
              </div>

              <div className={styles.offerDetails}>
                <strong>{selectedOffer.creditorName}</strong>

                <span className={styles.offerValue}>
                  {currencyFormatter.format(selectedOffer.negotiatedAmount)} à
                  vista
                </span>

                <span className={styles.originalValue}>
                  {currencyFormatter.format(selectedOffer.originalAmount)}
                </span>
              </div>

              <span className={styles.discountBadge}>
                -{selectedOffer.discountPercentage}%
              </span>
            </div>

            <button
              type="button"
              className={styles.changeOfferButton}
              onClick={handleChangeOffer}
            >
              Trocar oferta
              <span aria-hidden="true">›</span>
            </button>
          </section>

          <section
            className={styles.checkoutSummary}
            aria-label="Resumo do acordo"
          >
            <div className={styles.agreementValue}>
              <span>Valor do acordo</span>

              <strong>
                {currencyFormatter.format(selectedOffer.negotiatedAmount)}
              </strong>
            </div>

            <button
              type="button"
              className={styles.continueButton}
              disabled={!selectedPaymentMethod}
              onClick={handleContinue}
            >
              Ir para revisão
              <span aria-hidden="true">›</span>
            </button>

            <button
              type="button"
              className={styles.backButton}
              onClick={handleBack}
            >
              Voltar
            </button>
          </section>
        </div>
      </main>
    </>
  );
}
