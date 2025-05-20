import { useState, useEffect } from "react";

import styles from "./DeashboardsAmostra.module.css";
import axios, {
  getCompleteHeader,
  DAMA_URL,
} from "../../../components/axios/axiosLaravelConfig";
import { useSelector } from "react-redux";
import Navscreen from "../../../components/homepage/Navscreen";
import Usernav from "../../../components/homepage/Usernav";
import AreaDash from "../../../components/Deashboards/AreaDash";
import BarDeash from "../../../components/Deashboards/BarDeash";
import PolarDash from "../../../components/Deashboards/PolarDash";
import MixDeash from "../../../components/Deashboards/MixDeash";
import BubleDash from "../../../components/Deashboards/BubleDash";
import Deash from "../../../components/Deashboards/Deash";

const ABOUT_ENDPOINT = `${DAMA_URL}/api/organization/about`;

const COMPLETE_HEADER = getCompleteHeader();

function DeashboardsAmostra() {
  const aboutUser = useSelector((state) => state.user.userData);
  const [show, setShow] = useState(false);

  const monitorName = JSON.parse(sessionStorage.getItem("select-monitoring"));
  console.log(monitorName.nome)

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
          <div className={styles.headerGraph}>
            <div className={styles.textContainer}>
              <div className={styles.Deash1}>
                <p>Quantidade de individuos / Total de individuos</p>
                <AreaDash />
                
              </div>
              <div className={styles.Deash1}>
              <p>Espécies mais relevantes</p>

                <BarDeash />
              </div>
              
              
            </div>

            <div className={styles.textContainer}>
              <div className={styles.Deash2}>
              <p>Animais por genêro</p>

                <BubleDash />
              </div>
              <div className={styles.Deash2}>
              <p>Dados gerais do monitoramento <span>{monitorName.nome} </span></p>

                <MixDeash />
              </div>
              <div className={styles.Deash2}>
              <p>Peso médio de cada espécie</p>
                <Deash />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default DeashboardsAmostra;
