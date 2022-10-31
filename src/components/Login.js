import Input from "./Input"
import styles from './Login.module.css'
import { MdEmail, MdVpnKey} from "react-icons/md";
import Logo from './img/Logo.png'

function Login() {
  return (

    <form >

      <div className={styles.superdiv}>

        <section className={styles.login_section}>
        <img src={Logo}/>
          <h1>Projeto Dashboard
            de Monitoriamento
            Ambiental</h1>

        </section>

        
        
        <div className={styles.login_container}>
          <h1>Entrar na conta!</h1>

          
          <span className={styles.icon_teste}></span>
            <MdEmail className={styles.icon_teste}/>
          <Input
            type="text"
            name="name"
            placeholder="Endereço de email"

          />


          <MdVpnKey className={styles.icon_teste}/>

          <Input className={styles.icon_teste}
            type="password"
            name="description"
            placeholder="senha"

          />

          <p>Equeceu sua Senha ?</p>


   
        <button className={styles.btn}>Entrar</button>
        <button className={styles.btn}>Cadastrar-se</button>
      

        </div>


      </div>

    </form>




  )
}
export default Login