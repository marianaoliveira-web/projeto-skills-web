import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import styles from './AddSkillModal.module.css';

export function AddSkillModal({ isOpen, onClose, onSkillAdded, existingSkillIds = [] }) {
    const [availableSkills, setAvailableSkills] = useState([]);
    const [selectedSkillId, setSelectedSkillId] = useState('');
    const [level, setLevel] = useState(1);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() => {
        if (isOpen) {
            async function fetchCatalogSkills() {
                setErro('');
                setLevel(1);

                try {
                    const token = localStorage.getItem('@app:token');
                    
                    // Rota exata do SkillController.java (/skills)
                    const response = await api.get('/skills', {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    // Filtra tecnologias que o usuário já não possui
                    const filtered = response.data.filter(
                      (s) => !existingSkillIds.includes(s.id)
                    );
                    setAvailableSkills(filtered);

                    if (filtered.length > 0) {
                        setSelectedSkillId(filtered[0].id);
                    }
                } catch (err) {
                    console.error("Erro ao buscar catálogo de skills:", err);
                    setErro("Erro ao carregar lista de skills do sistema.");
                }
            }

            fetchCatalogSkills();
        }
    }, [isOpen, existingSkillIds]);

    if (!isOpen) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        if (!selectedSkillId) {
            setErro('Por favor, selecione uma skill.');
            return;
        }

        setLoading(true);
        setErro('');

        try {
            const token = localStorage.getItem('@app:token');
            const usuarioId = localStorage.getItem('@app:usuarioId');

            // POST exatamente para /usuario-skills/adicionar com o DTO esperado
            await api.post(
              '/usuario-skills/adicionar',
              {
                usuarioId: Number(usuarioId),
                skillId: Number(selectedSkillId),
                level: Number(level)
              },
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );

            onSkillAdded();
            onClose();
        } catch (err) {
            setErro(err.response?.data?.message || 'Erro ao adicionar skill. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    function getLevelClass(lvl) {
        if (level !== lvl) return '';
        if (lvl <= 2) return styles.levelBtnSelectedRed;
        if (lvl === 3) return styles.levelBtnSelectedYellow;
        return styles.levelBtnSelectedGreen;
    }

    function getLevelLabel(lvl) {
        if (lvl <= 2) return 'Iniciante / Básico';
        if (lvl === 3) return 'Intermediário';
        return 'Avançado / Especialista';
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Adicionar Nova Skill</h2>
                    <button onClick={onClose} className={styles.closeButton}>&times;</button>
                </div>

                {erro && <p className={styles.error}>{erro}</p>}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Selecione a Tecnologia</label>
                        {availableSkills.length === 0 ? (
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                Todas as skills do catálogo já foram adicionadas.
                            </p>
                        ) : (
                            <select
                                className={styles.select}
                                value={selectedSkillId}
                                onChange={(e) => setSelectedSkillId(e.target.value)}
                            >
                                {availableSkills.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.nome} {s.versao ? `(v${s.versao})` : ''}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Nível de Domínio (1 a 5)</label>
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
                            {getLevelLabel(level)}
                        </p>
                    </div>

                    <div className={styles.actions}>
                        <button
                             type="button"
                             onClick={onClose}
                             className={styles.btnCancel}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.btnSave}
                            disabled={loading || availableSkills.length === 0}
                        >
                            {loading ? 'Salvando...' : 'Adicionar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}