import Input from "./Input"
import styles from './CadastroPesquisador.module.css'
import { MdEmail, MdVpnKey,MdPhone,MdTextSnippet,MdPermIdentity } from "react-icons/md"
import Logo from './img/Logo.png'

function CadastroPesquisador() {
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
                    <h1>Cadastra-se!</h1>
                    <p>Você está cadastrando como Pesquisador!</p>



                    <MdPermIdentity className={styles.icon_teste}/>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Nome*"
                    />


                    <MdEmail className={styles.icon_teste} />
                    <Input
                        type="text"
                        name="email"
                        placeholder="Endereço de Email*"

                    />


                    <MdVpnKey className={styles.icon_teste} />

                    <Input className={styles.icon_teste}
                        type="password"
                        name="senha"
                        placeholder="senha*"

                    />
                        <MdTextSnippet className={styles.icon_teste}/>
                    <Input
                        type="text"
                        name="CPF"
                        placeholder="CPF*"

                    />
                    <MdPhone className={styles.icon_teste}/>
                    <Input
                        type="contact"
                        name="contato"
                        placeholder="Contato*"

                    />



                    <button className={styles.btn}>Entrar</button>
                    <button className={styles.btn}>Cadastrar-se</button>


                </div>


            </div>

        </form>




    )
}
export default CadastroPesquisador