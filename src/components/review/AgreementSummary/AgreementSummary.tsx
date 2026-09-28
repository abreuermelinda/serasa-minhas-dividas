import type { Offer } from "@/types/offer";
import type { PaymentMethod } from "@/types/paymentMethod";

import styles from "./AgreementSummary.module.css";

type AgreementSummaryProps = {
  offer: Offer;
  paymentMethod: PaymentMethod;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

function formatDebtSince(debtSince: string) {
  const [year, month] = debtSince.split("-");

  const date = new Date(Number(year), Number(month) - 1);

  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace(".", "");
}

function formatPaymentCondition(
  condition: Offer["paymentCondition"],
) {
  if (condition.type === "cash") {
    return "À vista";
  }

  return `Entrada de ${currencyFormatter.format(
    condition.downPayment,
  )} + ${condition.installments}x de ${currencyFormatter.format(
    condition.installmentAmount,
  )}`;
}

function getTodayFormatted() {
  return new Intl.DateTimeFormat("pt-BR").format(new Date());
}

export function AgreementSummary({
  offer,
  paymentMethod,
}: AgreementSummaryProps) {
  const discountAmount =
    offer.originalAmount - offer.negotiatedAmount;

  const creditorInitials = offer.creditorName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <section
      className={styles.card}
      aria-labelledby="summary-title"
    >
      <h2 id="summary-title">Resumo do acordo</h2>

      <div className={styles.creditorHeader}>
        <div
          className={styles.creditorAvatar}
          aria-hidden="true"
        >
          {creditorInitials}
        </div>

        <div className={styles.creditorInfo}>
          <strong>{offer.creditorName}</strong>

          <span>
            {offer.debtType} · desde{" "}
            {formatDebtSince(offer.debtSince)}
          </span>
        </div>
      </div>

      <dl className={styles.summaryList}>
        <div className={styles.summaryRow}>
          <dt>Valor original</dt>

          <dd className={styles.originalAmount}>
            {currencyFormatter.format(offer.originalAmount)}
          </dd>
        </div>

        <div className={styles.summaryRow}>
          <dt>Desconto</dt>

          <dd className={styles.discountAmount}>
            - {currencyFormatter.format(discountAmount)} (
            {offer.discountPercentage}%)
          </dd>
        </div>

        <div className={styles.summaryRow}>
          <dt>Condição</dt>

          <dd>
            {formatPaymentCondition(offer.paymentCondition)}
          </dd>
        </div>

        <div className={styles.summaryRow}>
          <dt>Forma de pagamento</dt>
          <dd>{paymentMethod.label}</dd>
        </div>

        <div className={styles.summaryRow}>
          <dt>Vencimento</dt>

          <dd>
            {paymentMethod.type === "boleto"
              ? `Até ${formatDate(paymentMethod.dueDate)}`
              : `Hoje, ${getTodayFormatted()}`}
          </dd>
        </div>

        <div
          className={`${styles.summaryRow} ${styles.negotiatedRow}`}
        >
          <dt>Valor negociado</dt>

          <dd>
            {currencyFormatter.format(offer.negotiatedAmount)}
          </dd>
        </div>
      </dl>
    </section>
  );
}