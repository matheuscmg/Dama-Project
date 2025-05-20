import { useState, useEffect } from "react";
import Navscreen from "../../components/homepage/Navscreen";
import Usernav from "../../components/homepage/Usernav";
import styles from "./Dashboards.module.css";
import axios, {
  getCompleteHeader,
  DAMA_URL,
} from "../../components/axios/axiosLaravelConfig";
import { useDispatch, useSelector } from "react-redux";
import Deash from "../../components/Deashboards/Deash";
import BarDeash from "../../components/Deashboards/BarDeash";
import AreaDash from "../../components/Deashboards/AreaDash";
import BubleDash from "../../components/Deashboards/BubleDash";
import MixDeash from "../../components/Deashboards/MixDeash";
import PolarDash from "../../components/Deashboards/PolarDash";
const ABOUT_ENDPOINT = `${DAMA_URL}/api/organization/about`;

const COMPLETE_HEADER = getCompleteHeader();

function Dashboards() {
  const aboutUser = useSelector((state) => state.user.userData);
  const [show, setShow] = useState(false);

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
                <AreaDash />
              </div>
              <div className={styles.Deash1}>
                <BarDeash />
              </div>
              <div className={styles.Deash1}>
                <PolarDash />
              </div>
            </div>

            <div className={styles.textContainer}>
              <div className={styles.Deash2}>
                <BubleDash />
              </div>
              <div className={styles.Deash2}>
                <MixDeash />
              </div>
              <div className={styles.Deash2}>
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
export default Dashboards;
