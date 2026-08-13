import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import { api } from "../../services/api";
import styles from "./Login.module.css";

export function Login({ toggleTheme, isDark }) {
  const [login, setLogin] = useState(
    () => localStorage.getItem("@app:login") || "",
  );
  const [senha, setSenha] = useState(
    () => localStorage.getItem("@app:senha") || "",
  );
  const [gravarSenha, setGravarSenha] = useState(() => {
    return localStorage.getItem("@app:login") !== null;
  });

  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    try {
      const response = await api.post("/auth/login", { login, senha });

      const { token, id } = response.data;

      localStorage.setItem("@app:token", token);
      localStorage.setItem("@app:usuarioId", id);

      const nomeFormatado = login.includes("@") ? login.split("@")[0] : login;

      localStorage.setItem(
        "@app:user",
        JSON.stringify({ login: nomeFormatado }),
      );

      if (gravarSenha) {
        localStorage.setItem("@app:login", login);
        localStorage.setItem("@app:senha", senha);
      } else {
        localStorage.removeItem("@app:login");
        localStorage.removeItem("@app:senha");
      }

      navigate("/home");
    } catch (err) {
      setErro(err.response?.data?.message || "Login ou senha incorretos.");
    }
  }

  return (
    <div className={styles.container}>
      <AuthHeader toggleTheme={toggleTheme} isDark={isDark} />
      
      <div className={styles.card}>
        <h1 className={styles.title}>Entrar</h1>

        {erro && <p className={styles.messageError}>{erro}</p>}

        <form onSubmit={handleLogin}>
          <Input
            label="Login"
            placeholder="Digite seu usuário"
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

          <div className={styles.rememberContainer}>
            <input
              type="checkbox"
              id="gravarSenha"
              checked={gravarSenha}
              onChange={(e) => setGravarSenha(e.target.checked)}
            />
            <label htmlFor="gravarSenha">Gravar Senha</label>
          </div>

          <Button type="submit">Entrar</Button>
        </form>

        <div className={styles.footer}>
          <span>Não tem uma conta?</span>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => navigate("/cadastro")}
          >
            Cadastrar-se
          </button>
        </div>
      </div>
    </div>
  );
}