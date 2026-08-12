import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { api } from '../../services/api';
import styles from './Cadastro.module.css';

export function Cadastro() {
    const [login, setLogin] = useState('');
    const [senha,setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate();

    async function handleCadastro(e) {
        e.preventDefault();
        setErro('');
        setSucesso('');

        if (senha !== confirmarSenha) {
            setErro('As senhas não coincidem. Por favor, verifique.');
            return;
        }

        try {
            await api.post('/usuario/cadastrar', { login, senha });

            setSucesso('Cadastro realizado com sucesso! Redirecionando...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setErro(err.response?.data?.message || 'Erro ao realizar cadastro. Por favor, tente novamente.');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Criar Conta</h1>

                {erro && <p className={styles.messageError}>{erro}</p>}
                {sucesso && <p className={styles.messageSucess}>{sucesso}</p>}

                <form onSubmit={handleCadastro}>
                    <Input
                        label="Login"
                        placeholder="Escolha seu usuário"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />

                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                    <Input
                        label="Confirmar Senha"
                        type="password"
                        placeholder="Confirme sua senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        required
                    />

                    <Button type="submit">Salvar</Button>
                </form>

                <div className={styles.footer}>
                    <span>Já possui uma conta?</span>
                    <button
                        type="button"
                        className={styles.linkButton}
                        onClick={() => navigate('/login')}
                    >
                        Voltar para Login
                    </button>
                </div>
            </div>
        </div>
    );
}