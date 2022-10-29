import Input from "./Input"
import styles from './CadastroEmpresa.module.css'
import { MdEmail, MdVpnKey,MdPhone,MdTextSnippet,MdPermIdentity } from "react-icons/md";

function CadastroEmpresa() {
    return (

        <form >

            <div className={styles.superdiv}>

                <section className={styles.login_section}>
                    <h1>Projeto Dashboard
                        de Monitoriamento
                        Ambiental</h1>

                </section>



                <div className={styles.login_container}>
                    <h1>Cadastrar Empresa!</h1>



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
                        placeholder="Endereço de email*"

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
                        name="cnpj"
                        placeholder="CNPJ*"

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
export default CadastroEmpresa