import { useState, useEffect } from "react";
import Navscreen from "../../components/homepage/Navscreen";
import styles from "./HomePage.module.css";
import Usernav from "../../components/homepage/Usernav";
import axios, {
  getCompleteHeader,
  DAMA_URL,
} from "../../components/axios/axiosLaravelConfig";
import { aboutCompletCompany } from "../../components/store/reducers/companyReducer";
import { useDispatch, useSelector } from "react-redux";
import { GoProjectRoadmap } from "react-icons/go";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdPeopleOutline } from "react-icons/md";
import { FaBacterium } from "react-icons/fa";
import DashboardCard from "../../components/homepage/DashboardCard";
import { GlobalStyle } from "../../components/StyledComponents/GlobalStyle.style";

const ABOUT_ENDPOINT = `${DAMA_URL}/api/organization/about`;

const COMPLETE_HEADER = getCompleteHeader();

function HomePage() {
  const companyData = useSelector((state) => state.company.companyData);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  function dispatchCompanyData(data) {
    dispatch(aboutCompletCompany(data));
  }

  async function fetchCompanyData() {
    try {
      const response = await axios.get(ABOUT_ENDPOINT, {
        headers: COMPLETE_HEADER,
      });
      console.log("Dados da resposta:", response.data);
      dispatchCompanyData(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }
  useEffect(() => {
    if (!companyData) {
      fetchCompanyData();
    }
  }, [companyData]);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 150);
  });

  return (
    <div className={styles.container}>
      
      <Navscreen />

      <div className={styles.containerinfo}>
        <Usernav pageBack={true} />
        
        {show ? (
            <div className={styles.textContainer}>
             
              <DashboardCard
                title="Colaboradores"
                value="30"
                icon={<GoProjectRoadmap />} 
                color="#0080ff"
                change="+30%"
                since="no ultimo mês"
              />
              <DashboardCard
                title="Equipes"
                value="10"
                icon={<MdOutlineDashboardCustomize />}
                color="#00cc88"
                change="+25%"
                since="no ultimo mês"
              />
              <DashboardCard
                title="Projetos"
                value="20"
                icon={<MdPeopleOutline />}
                color="#fc2e76;"
                change="+10%"
                since="no ultimo mês"
              />
              <DashboardCard
                title="espécie"
                value="52"
                icon={<FaBacterium />} 
                color="#5C60F5"
                change="+20%"
                since="no ultimo mês"
              />
              
            
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default HomePage;

/*
<div className={styles.headerGraph}>
            <div className={styles.textContainer}>
              <div className={styles.conteudo}>
                <div className={styles.welcomeTeams}>
                  <h3>
                    Bem-vindo de volta, <span>{aboutUser?.name ?? ""}</span>
                  </h3>
                </div>
                <div className={styles.ilustration} />
              </div>            
              {aboutUser?.organizaçao === "" && <Modal />}
            </div>

          
          </div>
*/
