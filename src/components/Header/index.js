import React from "react";
import styles from "./style.module.css";

function Header({ titulo, texto, referencia, description, imagem }) {
  const backgroundImageStyle = {
    backgroundImage: `url(${imagem})`,
  };
  return (
    <div className={styles.welcomeTeams}>
      <div className={styles.allcontainer}>
        <div className={styles.dataMonitoramento}>
          <h1>{titulo}</h1>
          <h2 className={styles.texto}>{texto}</h2>
        </div>
        <div className={styles.dataProject}>
          <h2>{description}</h2>
          {(referencia && <span>{referencia}</span>) || ""}
        </div>
      </div>
      <div className={styles.ilustration}>
        <div className={styles.projectImg} style={backgroundImageStyle} />
      </div>
    </div>
  );
}

export default Header;
