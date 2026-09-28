import type { PaymentMethod } from "@/types/paymentMethod";

import styles from "./AgreementActions.module.css";

type AgreementActionsProps = {
  amount: number;
  paymentMethod: PaymentMethod;
  canConfirm: boolean;
  isPending: boolean;
  isError: boolean;
  onConfirm: () => void;
  onBack: () => void;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

export function AgreementActions({
  amount,
  paymentMethod,
  canConfirm,
  isPending,
  isError,
  onConfirm,
  onBack,
}: AgreementActionsProps) {
  return (
    <section
      className={styles.card}
      aria-label="Confirmar acordo"
    >
      <div className={styles.agreementValue}>
        <span>Valor do acordo</span>

        <strong>
          {currencyFormatter.format(amount)}
        </strong>
      </div>

      {isError && (
        <div
          className={styles.errorMessage}
          role="alert"
        >
          Não foi possível confirmar o acordo. Tente novamente.
        </div>
      )}

      <button
        type="button"
        className={styles.confirmButton}
        disabled={!canConfirm || isPending}
        onClick={onConfirm}
      >
        <span>
          {isPending
            ? "Confirmando..."
            : "Confirmar acordo"}
        </span>

        {!isPending && (
          <span aria-hidden="true">›</span>
        )}
      </button>

      <button
        type="button"
        className={styles.backButton}
        disabled={isPending}
        onClick={onBack}
      >
        Voltar
      </button>

      <div className={styles.paymentNotice}>
        <span
          className={styles.infoIcon}
          aria-hidden="true"
        >
          ⓘ
        </span>

        <p>
          {paymentMethod.type === "pix"
            ? "Após confirmar, geramos o QR Code e o Pix copia e cola."
            : `Após confirmar, geramos o boleto com vencimento em ${formatDate(
                paymentMethod.dueDate,
              )}.`}
        </p>
      </div>
    </section>
  );
}