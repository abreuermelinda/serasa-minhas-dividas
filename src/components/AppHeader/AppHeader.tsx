import styles from "./AppHeader.module.css";

type AppHeaderProps = {
  userName?: string;
  onBack?: () => void;
};

export function AppHeader({
  userName = "Maria Silva",
  onBack,
}: AppHeaderProps) {
  const names = userName.trim().split(/\s+/);

  const firstName = names[0];

  const initials =
    names.length > 1
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : names[0][0].toUpperCase();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        {onBack && (
          <button
            type="button"
            className={styles.mobileBack}
            onClick={onBack}
            aria-label="Voltar para a etapa anterior"
          >
            <span aria-hidden="true">‹</span>
          </button>
        )}

        <strong className={styles.title}>
          Minhas Dívidas
        </strong>

        <div className={styles.user}>
          <span className={styles.greeting}>
            Olá, {firstName}
          </span>

          <div
            className={styles.avatar}
            aria-label={`Usuário ${userName}`}
          >
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}