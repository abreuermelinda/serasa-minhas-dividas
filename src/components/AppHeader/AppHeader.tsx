import styles from "./AppHeader.module.css";

type AppHeaderProps = {
  userName?: string;
};

export function AppHeader({
  userName = "Maria",
}: AppHeaderProps) {
  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <span className={styles.mobileBack} aria-hidden="true">
          ‹
        </span>

        <strong className={styles.title}>
          Minhas Dívidas
        </strong>

        <div className={styles.user}>
          <span className={styles.greeting}>
            Olá, {userName}
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