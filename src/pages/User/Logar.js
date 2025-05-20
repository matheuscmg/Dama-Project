import { useState } from "react";
import styles from "./Logar.module.css";
import { MdOutlineEmail, MdLockOutline, MdRemoveRedEye } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "../../components/axios/axiosLaravelConfig"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, clearToken } from "../../components/store/reducers/authReducer";

function Logar() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logaUser() {
    sessionStorage.removeItem("session-token");

    const token = sessionStorage.getItem("session-token");
    console.log(` o que há em token:${token}`);
    axios
      .get("/sanctum/csrf-cookie")
      .then((response) => {
        axios
          .post("api/login", {
            email: name,
            password: password,
          })
          .then(function (response) {
            //console.log(response);
            if (response.data.token) {
              sessionStorage.setItem(
                "session-token",
                "Bearer " + response.data.token
              );
              dispatch(setToken("Bearer " + response.data.token));
              navigate("/home");
              window.location.reload()
            } else {
              console.log("Token inválido ou expirado");
              dispatch(clearToken());
              navigate("/login");
            }
          })
          .catch(function (error) {
            setName("");
            setPassword("");
            console.log(error);
            const errorMessage =
              error.response?.data?.error || "Ocorreu um erro inesperado.";
            if (errorMessage.toLowerCase().includes("credentials not found.")) {
              console.log("Email ou senha incorretos.");
              setAuthError("Email ou senha incorretos.");
            } else {
              setAuthError("Estamos fora do ar");
            }
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

function handleToRecover (){
  navigate('/recuperar-senha')
}


  function showHide(id) {
    const passwordInput = document.getElementById(id);

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      setTimeout(function () {
        passwordInput.type = "password";
      }, 1000);
    }
  }

  function handleInfo(e) {
    e.preventDefault();
    if (password && name) {
      logaUser();
    } else {
      setAuthError("Email ou senha incorretos.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoGrad}>
        <div className={styles.logIlustration}></div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.damaLogo}/>

        <form className={styles.formControl}>
          
            <h1>Login</h1>
          
          <div className={styles.formGroup}>
   
            <input
              type="email"
              id="name"
              name="name"
              placeholder="e-mail"
              autoComplete="username"
              onChange={(e) => setName(e.target.value)}
            />
            <div className={styles.iconStart}>
              <MdOutlineEmail />
            </div>
          </div>

          <div className={styles.formGroup}>
        
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className={styles.iconEnd}>
              <MdRemoveRedEye onClick={() => showHide("password")} />
            </div>

            <div className={styles.iconStart}>
              <MdLockOutline />
            </div>
          </div>

          {authError && (
            <div className={styles.error}>
              <div className={styles.errorIcon}>
                <AiFillCloseCircle />
              </div>
              <p>{authError}</p>
            </div>
          )}

          <div className={styles.btnGroup}>
            <button onClick={handleInfo}>
              Entrar
            </button>
          </div>
        </form>

        <div className={styles.noFind}>
          <div className={styles.cadastroUser}>
            <p>Não tem uma conta?</p>
            <a href="./escolher-empresa">Cadastre-se</a>
          </div>

          <div className={styles.enterHref}></div>

          <div className={styles.noPass}>
            <p>Esqueceu sua senha?</p>
            <a onClick={handleToRecover}>Recuperar senha</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logar;
