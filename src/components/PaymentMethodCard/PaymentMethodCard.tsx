import type { PaymentMethod } from "@/types/paymentMethod";

import styles from "./PaymentMethodCard.module.css";

type PaymentMethodCardProps = {
  paymentMethod: PaymentMethod;
  isSelected: boolean;
  onSelect: (paymentMethod: PaymentMethod) => void;
};

function formatDueDate(dueDate: string) {
  const [year, month, day] = dueDate.split("-");

  return `${day}/${month}/${year}`;
}

export function PaymentMethodCard({
  paymentMethod,
  isSelected,
  onSelect,
}: PaymentMethodCardProps) {
  return (
    <label
      className={`${styles.card} ${
        isSelected ? styles.selected : ""
      }`}
    >
      <input
        className={styles.radio}
        type="radio"
        name="payment-method"
        value={paymentMethod.id}
        checked={isSelected}
        onChange={() => onSelect(paymentMethod)}
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <strong className={styles.label}>
            {paymentMethod.label}
          </strong>

          {paymentMethod.isFastest && (
            <span className={styles.fastest}>
              Mais rápido
            </span>
          )}
        </div>

        <p className={styles.description}>
          {paymentMethod.description}
        </p>

        {isSelected && paymentMethod.type === "pix" && (
          <div className={styles.details}>
            <p>
              Depois de confirmar o acordo, geramos o QR Code e o
              código Pix copia e cola.
            </p>

            <p>
              O pagamento é compensado em poucos minutos.
            </p>
          </div>
        )}

        {isSelected && paymentMethod.type === "boleto" && (
          <div className={styles.details}>
            <p>
              Vencimento em{" "}
              {formatDueDate(paymentMethod.dueDate)} (3 dias úteis).
            </p>

            <p>
              A compensação leva até{" "}
              {paymentMethod.clearingDays} dias úteis após o
              pagamento.
            </p>
          </div>
        )}
      </div>
    </label>
  );
}