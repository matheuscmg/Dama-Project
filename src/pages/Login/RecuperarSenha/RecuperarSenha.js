import { useState } from "react";
import styles from "./RecuperaSenha.module.css"
import { MdOutlineEmail } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios, { DAMA_URL } from "../../../components/axios/axiosLaravelConfig";
import { useNavigate } from "react-router-dom";

function RecuperarSenha() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  function recoverPassword() {
    axios
      .post(
        `${DAMA_URL}/api/forgot-password`,
        {
          email,
        },
        {
          headers: {
            "Content-type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      )
      .then(function (response) {
        ////console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleToBackPage() {
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.recoverContainer}>
        <div className={styles.backPage}>
          <p title="Voltar" onClick={handleToBackPage}>
            <IoMdArrowRoundBack />
          </p>
          <div className={styles.logo} />
        </div>
        <div className={styles.formRecover}>
          <h1>Recuperar senha</h1>
          <p>
            Para recuperar seu acesso preencha o campo abaixo com o e-mail
            cadastrado em sua conta do Dama
          </p>
          <span>E-mail</span>
          <div className={styles.ipt}>
            <div className={styles.iconStart}>
                <MdOutlineEmail />
            </div>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <button className={styles.btnConfirm} onClick={recoverPassword}>
            Confirmar e-mail
          </button>
        </div>
      </div>

      <div className={styles.ilustationContainer}>
        <div className={styles.ilustration} />
      </div>
    </div>
  );
}

export default RecuperarSenha;
