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
      const usuarioId = localStorage.getItem("@app:usuarioId");

      const response = await api.get(`/usuario-skills/usuario/${usuarioId}`, {
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
    async function load() {
      await carregarSkills();
    }
    load();
  }, [carregarSkills]);

  async function handleEdit(id) {
    const novoLevelStr = window.prompt("Digite o novo nível da sua Skill (1 a 5):");
    
    if (!novoLevelStr) return; 

    const novoLevel = Number(novoLevelStr);
    
    if (isNaN(novoLevel) || novoLevel < 1 || novoLevel > 5) {
      alert("Nível inválido! Por favor, digite um número entre 1 e 5.");
      return;
    }

    try {
      const token = localStorage.getItem("@app:token");
      
      await api.put(`/usuario-skills/atualizar/${id}`, 
        { level: novoLevel },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      await carregarSkills();
    } catch (error) {
      console.error("Erro ao atualizar a skill:", error);
      alert("Erro ao atualizar a skill. Tente novamente.");
    }
  }

  async function handleDelete(id) {
    const confirmacao = window.confirm("Tem certeza que deseja remover esta skill do seu perfil?");
    
    if (!confirmacao) return;

    try {
      const token = localStorage.getItem("@app:token");
      
      await api.delete(`/usuario-skills/deletar/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      await carregarSkills();
    } catch (error) {
      console.error("Erro ao deletar a skill:", error);
      alert("Erro ao remover a skill. Tente novamente.");
    }
  }

  const existingSkillIds = skills.map((skill) => skill.skillId);

  return (
    <div className={styles.homeContainer}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.titleContainer}>
          <h2 className={styles.pageTitle}>Minhas Skills</h2>
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