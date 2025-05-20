import Navscreen from "../homepage/Navscreen";
import styles from "./TodoCadastro.module.css"
import Usernav from "../homepage/Usernav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Popup from "../Poupup";

//status de senhas

function TodoCadastro() {

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');

  const token = `Bearer ${sessionStorage.getItem('session-token')}`;
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Navscreen />

      <div className={styles.containerinfo}>
        <Usernav pageBack={true} />
        {showPopup && <Popup message={popupMessage} type={popupType} />}
        <div className={styles.textContainer}>
        <div className={styles.noConteudo}>
          <div className={styles.info}>
          <h1>Conclua seu cadastro para ter acesso a todas funcionalidades</h1>
          </div>
        </div>



        </div>
      </div>



    </div>
  );
}
export default TodoCadastro;

