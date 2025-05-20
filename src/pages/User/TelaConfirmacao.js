import styles from "./TelaConfirmacao.module.css";
import { useLocation } from 'react-router-dom';



function TelaConfirmacao() {
    const location = useLocation();
    const email = location.state;
    //console.log(email)
    return (
      <div className={styles.container}>
        <div className={styles.aside}>
          <div className={styles['footer-aside']}></div>
        </div>
  
        <div className={styles['info-container']}>
          <div className={styles.center}>
            <div className={styles['img-voltar']}>
              <a href="/login">Voltar</a>
            </div>
  
            <div className={styles.infos}>
              <div className={styles.sucesso}>
                <h1>Obrigado por se cadastrar na nossa plataforma! </h1>
              </div>
  
              <div className={styles['infos-adicionais']}>
                <p>
                  Enviamos um e-mail de confirmação para o endereço "{email}". Por favor, verifique sua caixa de entrada
                  e caixa de span, siga as instruções para confirmar seu e-mail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default TelaConfirmacao;