import { useCallback, useState } from "react";

import { AddSkillModal } from "../../components/AddSkillModal/AddSkillModal";
import { DeleteSkillModal } from "../../components/DeleteSkillModal/DeleteSkillModal";
import { EditSkillModal } from "../../components/EditSkillModal/EditSkillModal";
import { Header } from "../../components/Header/Header";
import { SkillCard } from "../../components/SkillCard/SkillCard";

import { api } from "../../services/api";

import styles from "./Home.module.css";

export function Home() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState(null);

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

  useState(() => {
    carregarSkills();

    return true;
  });

  function handleEdit(skill) {
    setSelectedSkill(skill);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedSkill(null);
  }

  function handleDelete(skill) {
    setSelectedSkill(skill);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setSelectedSkill(null);
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
            onClick={() => setIsAddModalOpen(true)}
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
                skillDescricao={item.skillDescricao}
                level={item.level}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item)}
              />
            ))}
          </div>
        )}
      </main>

      <AddSkillModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSkillAdded={carregarSkills}
        existingSkillIds={existingSkillIds}
      />

      <EditSkillModal
        key={selectedSkill ? `edit-${selectedSkill.id}` : "edit-empty"}
        isOpen={isEditModalOpen}
        skill={selectedSkill}
        onClose={handleCloseEditModal}
        onSkillUpdated={carregarSkills}
      />

      <DeleteSkillModal
        isOpen={isDeleteModalOpen}
        skill={selectedSkill}
        onClose={handleCloseDeleteModal}
        onSkillDeleted={carregarSkills}
      />
    </div>
  );
}
