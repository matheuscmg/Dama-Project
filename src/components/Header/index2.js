import styles from "./style2.module.css";

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
       
      </div>
      <div className={styles.ilustration}>
        <div className={styles.projectImg} style={backgroundImageStyle} />
      </div>
    </div>
  );
}

export default Header;
