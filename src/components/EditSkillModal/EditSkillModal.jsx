import { useState } from "react";
import { api } from "../../services/api";
import styles from "./EditSkillModal.module.css";

export function EditSkillModal({
  isOpen,
  skill,
  onClose,
  onSkillUpdated,
}) {
  const [level, setLevel] = useState(skill?.level ?? 1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  if (!isOpen || !skill) {
    return null;
  }

  function getLevelClass(lvl) {
    if (level !== lvl) {
      return "";
    }

    if (lvl <= 2) {
      return styles.levelBtnSelectedRed;
    }

    if (lvl === 3) {
      return styles.levelBtnSelectedYellow;
    }

    return styles.levelBtnSelectedGreen;
  }

  function getLevelLabel() {
    if (level <= 2) {
      return "Iniciante / Básico";
    }

    if (level === 3) {
      return "Intermediário";
    }

    return "Avançado / Especialista";
  }

  async function handleSave() {
    try {
      setLoading(true);
      setErro("");

      const token = localStorage.getItem("@app:token");

      await api.put(
        `/usuario-skills/atualizar/${skill.id}`,
        {
          level,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await onSkillUpdated();

      onClose();
    } catch (error) {
      console.error("Erro ao atualizar a skill:", error);

      setErro(
        error.response?.data?.message ||
          "Erro ao atualizar a skill. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Editar Skill</h2>

            <p className={styles.skillName}>
              {skill.skillNome}
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {erro && (
          <p className={styles.error}>
            {erro}
          </p>
        )}

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Nível de Domínio
          </label>

          <div className={styles.levelSelector}>
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                type="button"
                key={lvl}
                className={`${styles.levelBtn} ${getLevelClass(lvl)}`}
                onClick={() => setLevel(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>

          <p className={styles.levelDescription}>
            {getLevelLabel()}
          </p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            type="button"
            className={styles.btnSave}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}