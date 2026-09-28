import styles from "./AgreementTerms.module.css";

type AgreementTermsProps = {
  accepted: boolean;
  onAcceptedChange: (accepted: boolean) => void;
};

export function AgreementTerms({
  accepted,
  onAcceptedChange,
}: AgreementTermsProps) {
  return (
    <section
      className={styles.card}
      aria-labelledby="terms-title"
    >
      <h2 id="terms-title">Termos do acordo</h2>

      <ul className={styles.termsList}>
        <li>
          O desconto vale apenas com o pagamento até o vencimento.
        </li>

        <li>
          Sem pagamento, o acordo é cancelado e a dívida volta ao
          valor original.
        </li>

        <li>
          Após a compensação, o credor tem até 5 dias úteis para
          retirar a negativação.
        </li>
      </ul>

      <button
        type="button"
        className={styles.termsLink}
      >
        Ler termos completos
        <span aria-hidden="true">›</span>
      </button>

      <div className={styles.divider} />

      <label className={styles.acceptance}>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) =>
            onAcceptedChange(event.target.checked)
          }
        />

        <span>Li e aceito os termos do acordo</span>
      </label>
    </section>
  );
}