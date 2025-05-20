import styles from "./Landingpage.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import damalogo from "../../assets/logo_DAMA__cor-original .png";
import itislogo from "../../assets/itis.png";
import figura1 from "../../assets/DAMAIlustr.png";
import gerenciar from "../../assets/gerenciar.jpg";
import logoParceiro1 from "../../assets/conexaoF.png";
import logoParceiro2 from "../../assets/instituto.png";
import logoParceiro3 from "../../assets/puclogo.png";
import { IoLogoInstagram,IoLogoFacebook,IoLogoLinkedin } from "react-icons/io5";


import { FaLink } from "react-icons/fa";

function Landingpage() {
  const navigate = useNavigate();

  function handleToEnter() {
    navigate("./login");
  }

  function handleToCadastro() {
    navigate("./cadastro-prestadora");
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <img src={damalogo} />
          <nav>
            <a href="#home">Home</a>
            <a href="#sobre">Sobre</a>
            <a href="#parceiros">Parceiros</a>
            <a href="#contato">Contato</a>
          </nav>
          <button onClick={handleToEnter}>Entrar</button>
        </div>

        <div id="home" className={styles.mainContent2}>
          <div className={styles.mainContent}>
            <h2>Bem vindo ao Dama!</h2>
            <h3>Uma plataforma voltada para pesquisa e monitoramentos!</h3>
            <p>
              Desenvolva seus monitoramentos <span>onde e quando quiser.</span>
            </p>
            <button onClick={handleToCadastro}>Cadastrar-se</button>
          </div>
          <div className={styles.figura1}>
            <img src={figura1}></img>
          </div>
        </div>

        <section id="sobre" className={styles.aboutSection}>
          <div className={styles.aboutContent}>
            <h2>Sobre o DAMA</h2>
            <p>
              O DAMA é uma plataforma inovadora focada em pesquisa e
              monitoramento ambiental. Nosso objetivo é facilitar o acesso a
              dados e ferramentas de pesquisa para profissionais e entusiastas
              do meio ambiente, oferecendo uma interface amigável e recursos
              avançados para a realização de estudos e monitoramentos
              eficientes.
            </p>
            {/* Adicione mais conteúdo sobre como, por exemplo, missão, visão, valores, história, equipe, etc. */}
          </div>

          <div className={styles.featuresSection}>
            <h2>O que você pode fazer</h2>
            <div className={styles.features}>
              <div className={styles.featureItem}>
                <img src={gerenciar} alt="Gerencie suas equipes" />
                <h3>Gerencie suas equipes</h3>
              </div>
              <div className={styles.featureItem}>
                <img src={gerenciar} alt="Crie seus projetos" />
                <h3>Crie seus projetos</h3>
              </div>
              <div className={styles.featureItem}>
                <img src={gerenciar} alt="Acompanhe os seus monitoramentos" />
                <h3>Acompanhe o seus monitoramentos</h3>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className={styles.customerFeedbackSection}>
          <div className={styles.customerText}>
            <h2>Conexão a base de dados do ITIS</h2>
            <p>
              O Dama integra-se ao Sistema de Informações Taxonômicas Integradas
              (ITIS), proporcionando acesso imediato a uma vasta base de dados
              de espécies. Explore, pesquise e contribua para o vasto mundo da
              biodiversidade com ferramentas precisas e atualizadas.
            </p>
          </div>

          <div className={styles.feedbackCard}>
            <div className={styles.itisLogo}>
              <img src={itislogo} />
            </div>
            <div className={styles.itisContainer}>
              <div className={styles.cardHeader}>
                <h3>Benefícios e Características</h3>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    <strong>Dados Confiáveis:</strong> Obtenha informações
                    validadas cientificamente e reconhecidas mundialmente.
                  </li>
                  <li>
                    <strong>Atualização Constante:</strong> Sincronização com
                    ITIS assegura dados sempre atualizados.
                  </li>
                  <li>
                    <strong>Pesquisa Aprofundada:</strong> Filtragem avançada
                    para estudos detalhados e monitoramento ambiental.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="parceiros" className={styles.partnerSection}>
          <h2>PARCEIROS DO PROJETO DAMA</h2>
          <p>
            Conheça os parceiros que contribuem para o sucesso do nosso projeto:
          </p>
          <div className={styles.partnerLogos}>
            <div className={styles.partner}>
              <a
                href="https://conexaof.fundepag.br/"
                className={styles.partnerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink />
              </a>
              <div className={styles.parceiroBorder}>
                <div className={styles.parceiroimg}>
                  <img src={logoParceiro1} alt="Logo do Parceiro 2" />
                </div>
              </div>
              <p>
                Uma spin-off da Fundepag, uma Fundação de Direito Privado que
                atua há 44 anos com P,D&I no Agronegócio e Meio ambiente.
              </p>
            </div>
            <div className={styles.partner}>
              <a
                href="https://www.pesca.sp.gov.br/"
                className={styles.partnerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink />
              </a>
              <div className={styles.parceiroBorder}>
                <div
                  className={styles.parceiroimg}
                  href="https://www.puc-campinas.edu.br/"
                >
                  <img src={logoParceiro2} alt="Logo do Parceiro 2" />
                </div>
              </div>

              <p>
                O Instituto de Pesca é um órgão de pesquisa científica e
                tecnológica da Secretaria de Agricultura e Abastecimento do
                Estado de São Paulo
              </p>
            </div>
            <div className={styles.partner}>
              <a
                href="https://www.puc-campinas.edu.br/"
                className={styles.partnerLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Visite o site"
              >
                <FaLink />
              </a>
              <div className={styles.parceiroBorder}>
                <div className={styles.parceiroimg}>
                  <img src={logoParceiro3} alt="Logo do Parceiro 2" />
                </div>
              </div>

              <p>
                Pontifícia Universidade Católica de Campinas, uma das melhores
                instituições de ensino do país.
              </p>
            </div>
            {/* Adicione mais parceiros conforme necessário */}
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <h2>DAMA</h2>
              <p>A melhor maneira de monitorar e pesquisar.</p>
              {/* Ícones das redes sociais, substitua # pelo link correspondente */}
              <div className={styles.socialMedia}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                
                <IoLogoLinkedin />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                <IoLogoFacebook />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                <IoLogoInstagram />
                </a>
              </div>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.linkColumn}>
                <h4>PRODUTOS</h4>
                <a href="#">Gerenciamento de Equipes</a>
                <a href="#">Criação de Projetos</a>
                <a href="#">Monitoramento</a>
              </div>
              <div className={styles.linkColumn}>
                <h4>SERVIÇOS</h4>
                <a href="#">Documentação</a>
                <a href="#">Changelog</a>
                <a href="#">Suporte</a>
              </div>
              <div className={styles.linkColumn}>
                <h4>CONEXÃO</h4>
                <a href="#">Parceiros</a>
                <a href="#">API</a>
                <a href="#">Integrações</a>
              </div>
              <div className={styles.linkColumn}>
                <h4>LEGAL</h4>
                <a href="#">Termos de Serviço</a>
                <a href="#">Política de Privacidade</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default Landingpage;

//background-image: url(../../assets/Design_sem_nome__1_-removebg-preview.png);
