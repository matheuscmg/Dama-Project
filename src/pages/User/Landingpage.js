import { useLocation } from 'react-router-dom';
import styles from './Landingpage.module.css';

function Landingpage() {
  const state = useLocation()
 console.log(state)
  return (
    <body>
      <div className={styles.nav}>
        <ul>
          <li>Home</li>
          <li>Contato</li>
          <li>Sobre</li>
          <li><a href='/escolher-empresa'>Cadastro</a></li>
          <li><a href='/login'>Login</a></li>
        </ul>
      </div>

      <header className={styles.damaDescription}>
        <div className={styles.about}>
          <p className={styles.aboutDama}>
            Uma plataforma voltada para pesquisa e monitoramentos!
          </p>
          <p>
            Desenvolva seus monitoramentos<span> onde e quando quiser.</span>
          </p>
        </div>
      </header>

      
      <section className={styles.keyBenefits}>
        <h2>O que você pode fazer:</h2>
        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <div id={styles.benefit1} className={styles.benefitImg}></div>
            <p>Gerencie suas equipes</p>
          </div>
          <div className={styles.benefit}>
            <div id={styles.benefit2} className={styles.benefitImg}></div>
            <p>Crie seus projetos</p>
          </div>
          <div className={styles.benefit}>
            <div id={styles.benefit3} className={styles.benefitImg}></div>
            <p>Acompanhe os seus monitoramentos</p>
          </div>
        </div>
      </section>
    </body>
  );
}

export default Landingpage;
