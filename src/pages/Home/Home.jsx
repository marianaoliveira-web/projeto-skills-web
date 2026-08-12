import { useState, useEffect, useCallback } from "react";
import { Header } from "../../components/Header/Header";
import { SkillCard } from "../../components/SkillCard/SkillCard";
import { AddSkillModal } from "../../components/AddSkillModal/AddSkillModal";
import { api } from "../../services/api";
import styles from "./Home.module.css";

export function Home() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const carregarSkills = useCallback(async () => {
    try {
      const token = localStorage.getItem("@app:token");

      const response = await api.get("/usuario-skills", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSkills(response.data);
    } catch (error) {
      console.error("Erro ao buscar as skills:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // <-- MUDANÇA: Retornando a função assíncrona 'load' para resolver o erro do ESLint (cascading renders)
    async function load() {
      await carregarSkills();
    }
    load();
  }, [carregarSkills]);

  function handleEdit(id) {
    console.log("Clicou para editar a skill com o id da associação:", id);
  }

  function handleDelete(id) {
    console.log("Clicou para apagar a skill com o id da associação:", id);
  }

  const existingSkillIds = skills.map((skill) => skill.skillId);

  return (
    <div className={styles.homeContainer}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.titleContainer}>
          <h2 className={styles.pageTitle}>As minhas Skills</h2>
          <button
            className={styles.btnAddSkill}
            onClick={() => setIsModalOpen(true)}
          >
            + Nova Skill
          </button>
        </div>

        {loading ? (
          <p className={styles.emptyMessage}>
            Carregando sua bateria de conhecimentos...
          </p>
        ) : skills.length === 0 ? (
          <p className={styles.emptyMessage}>
            Nenhuma skill cadastrada no seu perfil.
          </p>
        ) : (
          <div className={styles.skillsGrid}>
            {skills.map((item) => (
              <SkillCard
                key={item.id}
                skillNome={item.skillNome}
                skillImagem={item.skillImageUrl}
                level={item.level}
                onEdit={() => handleEdit(item.id)}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        )}
      </main>

      <AddSkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSkillAdded={carregarSkills}
        existingSkillIds={existingSkillIds}
      />
    </div>
  );
}