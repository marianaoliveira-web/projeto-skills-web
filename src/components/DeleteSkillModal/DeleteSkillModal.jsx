import { useState } from "react";
import { api } from "../../services/api";
import styles from "./DeleteSkillModal.module.css";

export function DeleteSkillModal({
  isOpen,
  skill,
  onClose,
  onSkillDeleted,
}) {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  if (!isOpen || !skill) {
    return null;
  }

  async function handleDelete() {
    try {
      setLoading(true);
      setErro("");

      const token = localStorage.getItem("@app:token");

      await api.delete(
        `/usuario-skills/deletar/${skill.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await onSkillDeleted();

      onClose();
    } catch (error) {
      console.error("Erro ao excluir skill:", error);

      setErro(
        error.response?.data?.message ||
          "Erro ao remover a skill. Tente novamente.",
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
            <h2 className={styles.title}>
              Excluir Skill
            </h2>

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

        <p className={styles.message}>
          Tem certeza que deseja remover esta skill do
          seu perfil?
        </p>

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
            className={styles.btnDelete}
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}