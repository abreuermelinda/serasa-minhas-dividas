import styles from "./ProgressSteps.module.css";

export type ProgressStep =
  | "offers"
  | "payment"
  | "review";

type ProgressStepsProps = {
  currentStep: ProgressStep;
};

const steps: {
  id: ProgressStep;
  label: string;
}[] = [
  {
    id: "offers",
    label: "Ofertas",
  },
  {
    id: "payment",
    label: "Pagamento",
  },
  {
    id: "review",
    label: "Revisão",
  },
];

export function ProgressSteps({
  currentStep,
}: ProgressStepsProps) {
  const currentIndex = steps.findIndex(
    (step) => step.id === currentStep,
  );

  return (
    <nav
      className={styles.progress}
      aria-label="Etapas da negociação"
    >
      <ol className={styles.steps}>
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li
              key={step.id}
              className={`${styles.step} ${
                isCompleted ? styles.completed : ""
              } ${isCurrent ? styles.current : ""}`}
              aria-current={
                isCurrent ? "step" : undefined
              }
            >
              <div className={styles.bar} />

              <div className={styles.label}>
                {isCompleted && (
                  <span
                    className={styles.check}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}

                <span>{step.label}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}