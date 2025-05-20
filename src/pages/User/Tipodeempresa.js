import styles from './Tipodeempresa.module.css'
import { useNavigate } from 'react-router-dom';



function Tipodeempresa() {

    const navigate = useNavigate()

    function handleCompanyP() {
        setTimeout(function () {
            navigate('/cadastro-prestadora');
        }, 800); 
    }

    function handleCompanyC() {
        setTimeout(function () {
            navigate('/cadastro-contratante');
        }, 800); 
    }

    return (
        <div className={styles.container}>


            <div className={styles.containerCompany}>

                <div className={styles.damaLogo} />
                <div className={styles.typeCompany}>

                    <div className={styles.companyPrestadora}>
                        <h4>Estou prestando um serviço</h4>
                        <a className={styles.imgP}></a>
                        <div className={styles.Conteudo}>
                            <li>Criar Monitoramentos</li>
                            <li>Criar equipes</li>
                            <li>Criar Projetos</li>
                        </div>

                        <button onClick={handleCompanyP}>Cadastre-se</button>
                    </div>

                    <div className={styles.companyContratante}>
                        <h4>Estou contratando serviços</h4>
                        <a className={styles.imgC}></a>
                        <div className={styles.Conteudo}>
                            <li>Criar Monitoramentos</li>
                            <li>Criar equipes</li>
                            <li>Criar Projetos</li>
                        </div>

                        <button onClick={handleCompanyC}>Cadastre-se</button>

                    </div>
                </div>
                <div className={styles.LogarUser}>
                    <p>Já tem uma conta?</p>
                    <a href='./login'>Entrar</a>
                </div>
            </div>
        </div>
    );
}

export default Tipodeempresa;