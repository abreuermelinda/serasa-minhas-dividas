"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useNegotiation } from "@/contexts/NegotiationContext";
import { useReview } from "@/hooks/useReview";

import { AgreementSummary } from "@/components/review/AgreementSummary/AgreementSummary";
import { AgreementTerms } from "@/components/review/AgreementTerms/AgreementTerms";
import { AgreementActions } from "@/components/review/AgreementActions/AgreementActions";

import styles from "./page.module.css";

function formatDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

export default function ReviewPage() {
  const router = useRouter();

  const { selectedOffer, selectedPaymentMethod, resetNegotiation } =
    useNegotiation();

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const reviewMutation = useReview();

  useEffect(() => {
    if (!selectedOffer) {
      router.replace("/");
      return;
    }

    if (!selectedPaymentMethod) {
      router.replace("/payment");
    }
  }, [selectedOffer, selectedPaymentMethod, router]);

  if (!selectedOffer || !selectedPaymentMethod) {
    return null;
  }

  function handleConfirmAgreement() {
    if (!acceptedTerms || !selectedOffer || !selectedPaymentMethod) {
      return;
    }

    reviewMutation.mutate({
      offerId: selectedOffer.id,
      paymentMethodId: selectedPaymentMethod.id,
    });
  }

  function handleBack() {
    router.push("/payment");
  }

  /*
   Possível tela e/ou feedback de sucesso de confirmação do acordo:
   */
  if (reviewMutation.isSuccess) {
    return (
      <main className={styles.page}>
        <section className={styles.successCard}>
          <h1>Acordo confirmado!</h1>

          {selectedPaymentMethod.type === "pix" ? (
            <p>
              Seu acordo foi confirmado. Agora você pode realizar o pagamento
              utilizando o QR Code ou o código Pix copia e cola.
            </p>
          ) : (
            <p>
              Seu acordo foi confirmado. O boleto está disponível para pagamento
              até {formatDate(selectedPaymentMethod.dueDate)}.
            </p>
          )}

          <button
            type="button"
            className={styles.confirmButton}
            onClick={() => {
              resetNegotiation();
              router.push("/");
            }}
          >
            Voltar para ofertas
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <header className={styles.pageHeader}>
          <h1>Revise seu acordo</h1>
          <p>Confira os dados antes de confirmar.</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.leftColumn}>
            <AgreementSummary
              offer={selectedOffer}
              paymentMethod={selectedPaymentMethod}
            />

            <AgreementTerms
              accepted={acceptedTerms}
              onAcceptedChange={setAcceptedTerms}
            />
          </div>

          <aside className={styles.actionColumn}>
            <AgreementActions
              amount={selectedOffer.negotiatedAmount}
              paymentMethod={selectedPaymentMethod}
              canConfirm={acceptedTerms}
              isPending={reviewMutation.isPending}
              isError={reviewMutation.isError}
              onConfirm={handleConfirmAgreement}
              onBack={handleBack}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
