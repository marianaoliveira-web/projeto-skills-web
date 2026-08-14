import styles from "./SkillCard.module.css";

export function SkillCard({
  skillNome,
  skillImagem,
  skillDescricao,
  level,
  onEdit,
  onDelete,
}) {
  function getBatteryStyle(currentLevel) {
    if (currentLevel <= 2) {
      return {
        colorClass: styles.activeRed,
        badgeClass: styles.badgeRed,
        label: `Nível ${currentLevel}/5 (Básico)`,
      };
    }

    if (currentLevel === 3) {
      return {
        colorClass: styles.activeYellow,
        badgeClass: styles.badgeYellow,
        label: `Nível 3/5 (Médio)`,
      };
    }

    return {
      colorClass: styles.activeGreen,
      badgeClass: styles.badgeGreen,
      label: `Nível ${currentLevel}/5 (Avançado)`,
    };
  }

  const { colorClass, badgeClass, label } = getBatteryStyle(level);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={skillImagem || "https://via.placeholder.com/80"}
          alt={`Logo ${skillNome}`}
          className={styles.skillImage}
        />
      </div>

      <h3 className={styles.skillName}>{skillNome}</h3>

      {skillDescricao && (
        <p className={styles.skillDescription}>{skillDescricao}</p>
      )}

      <span className={`${styles.levelBadge} ${badgeClass}`}>
        {label}
      </span>

      <div className={styles.batteryContainer}>
        <div className={styles.batteryBody}>
          {[1, 2, 3, 4, 5].map((segmento) => (
            <div
              key={segmento}
              className={`${styles.segment} ${
                segmento <= level ? colorClass : ""
              }`}
            />
          ))}
        </div>

        <div className={styles.batteryNub} />
      </div>

      <div className={styles.actions}>
        <button onClick={onEdit} className={styles.btnEdit}>
          Editar
        </button>

        <button onClick={onDelete} className={styles.btnDelete}>
          Excluir
        </button>
      </div>
    </div>
  );
}