import type { Offer, PaymentCondition } from "@/types/offer";

import styles from "./OfferCard.module.css";

type OfferCardProps = {
  offer: Offer;
  onSelect: (offer: Offer) => void;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatDebtSince(debtSince: string) {
  const [year, month] = debtSince.split("-");

  const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    timeZone: "UTC",
  });

  const date = new Date(
    Date.UTC(Number(year), Number(month) - 1, 1),
  );

  const formattedMonth = monthFormatter
    .format(date)
    .replace(".", "");

  return `${formattedMonth}/${year}`;
}

function formatPaymentCondition(condition: PaymentCondition) {
  if (condition.type === "cash") {
    return "À vista · pagamento único";
  }

  return `Entrada de ${currencyFormatter.format(
    condition.downPayment,
  )} + ${condition.installments}x de ${currencyFormatter.format(
    condition.installmentAmount,
  )}`;
}

export function OfferCard({
  offer,
  onSelect,
}: OfferCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        {offer.isBestOffer && (
          <span className={styles.bestOffer}>
            Melhor oferta
          </span>
        )}

        <h2 className={styles.creditorName}>
          {offer.creditorName}
        </h2>

        <p className={styles.debtInfo}>
          {offer.debtType} · desde{" "}
          {formatDebtSince(offer.debtSince)}
        </p>

        <span
          className={styles.discount}
          aria-label={`${offer.discountPercentage}% de desconto`}
        >
          {offer.discountPercentage}% off
        </span>
      </div>

      <div className={styles.values}>
        <div className={styles.valueGroup}>
          <span className={styles.valueLabel}>De</span>

          <strong className={styles.originalAmount}>
            {currencyFormatter.format(offer.originalAmount)}
          </strong>
        </div>

        <div className={styles.valueGroup}>
          <span className={styles.valueLabel}>Oferta</span>

          <strong className={styles.negotiatedAmount}>
            {currencyFormatter.format(offer.negotiatedAmount)}
          </strong>
        </div>

        <p className={styles.paymentCondition}>
          {formatPaymentCondition(offer.paymentCondition)}
        </p>
      </div>

      <button
        className={styles.continueButton}
        type="button"
        onClick={() => onSelect(offer)}
      >
        Continuar
      </button>
    </article>
  );
}