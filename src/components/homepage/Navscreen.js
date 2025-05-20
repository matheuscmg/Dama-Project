import { useState } from "react";
import styles from "./Navscreen.module.css";
import axios, {
  getCompleteHeader,
  DAMA_URL,
} from "../axios/axiosLaravelConfig";
import { FaUserPlus, FaUsers, FaChartBar, FaPowerOff } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineEventNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbMicroscope } from "react-icons/tb";
import { clearToken } from "../store/reducers/authReducer";

const COMPLETE_HEADER = getCompleteHeader();

function Navscreen() {
  const aboutUser = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  function logoff() {
    axios
      .post(
        `${DAMA_URL}/api/logout`,
        {},
        {
          headers: COMPLETE_HEADER,
        }
      )
      .then((response) => {
        dispatch(clearToken());
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      })
      .catch((error) => {
        console.error(error);
        dispatch(clearToken());
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      });
  }

  function handleEquipestoClick() {
    navigate("/equipes");
  }

  function handleHomepagetoClick() {
    navigate("/home");
  }

  function handleProjectClick() {
    /* if (aboutUser.userData.type === "prestadora") {
      navigate("/projetos-prestadora");
    } else {*/
    navigate("/projetos");
    // }
  }
  function handleColabodartoClick() {
    navigate("/colaboradores");
  }

  function handleMonitoramentoClick() {
    navigate("/monitoramentos");
  }

  function handleEspecies() {
    navigate("/especies");
  }
  function handleDash() {
    navigate("/dashboards");
  }

  return (
    <div className={styles.containerFundo}>
      <div
        className={`${isExpanded ? styles["containerFull"] : ""} `}
        onClick={handleExpand}
      >
        <div
          className={`${styles.container} ${
            isExpanded ? styles["container-expanded"] : ""
          }`}
          onClick={handleExpand}
        >
          <div className={styles.navFull}>
            <div
              className={`${styles.logoDama} ${
                isExpanded ? styles.expandedLogo : ""
              }`}
            >
              {isExpanded && (
                <span
                  className={styles.logoExpand}
                  onClick={handleHomepagetoClick}
                ></span>
              )}
            </div>
            <div className={styles.groupBar} onClick={handleExpand}>
              <div
                className={`${isExpanded ? styles["iconContainer"] : ""} `}
                onClick={handleExpand}
              >
                <AiFillHome onClick={handleExpand} />
                {isExpanded && (
                  <span
                    className={styles.iconText}
                    onClick={handleHomepagetoClick}
                  >
                    Home
                  </span>
                )}
              </div>
              <div
                className={`${isExpanded ? styles["iconContainer"] : ""} `}
                onClick={handleExpand}
              >
                <FaUserPlus onClick={handleExpand} />
                {isExpanded && (
                  <span
                    className={styles.iconText}
                    onClick={handleColabodartoClick}
                  >
                    Colaboradores
                  </span>
                )}
              </div>

              <div
                className={`${isExpanded ? styles["iconContainer"] : ""} `}
                onClick={handleExpand}
              >
                <FaUsers onClick={handleExpand} />
                {isExpanded && (
                  <span
                    className={styles.iconText}
                    onClick={handleEquipestoClick}
                  >
                    Equipes
                  </span>
                )}
              </div>
              <div
                className={`${isExpanded ? styles["iconContainer"] : ""} `}
                onClick={handleExpand}
              >
                <MdOutlineEventNote onClick={handleExpand} />
                {isExpanded && (
                  <span
                    className={styles.iconText}
                    onClick={handleProjectClick}
                  >
                    Projetos
                  </span>
                )}
              </div>
              <div
                className={`${isExpanded ? styles["iconContainer"] : ""} `}
                onClick={handleExpand}
              >
                <TbMicroscope onClick={handleExpand} />
                {isExpanded && (
                  <span className={styles.iconText} onClick={handleEspecies}>
                    Espécies
                  </span>
                )}
              </div>
              <div
                className={`${isExpanded ? styles["iconContainer"] : ""} `}
                onClick={handleExpand}
              >
                <FaChartBar onClick={handleExpand} />
                {isExpanded && (
                  <span
                    className={styles.iconText}
                    onClick={handleMonitoramentoClick}
                  >
                    Monitoramentos
                  </span>
                )}
              </div>
              {/*<div
                className={`${isExpanded ? styles["iconContainer"] : ""} `}
                onClick={handleExpand}
              >
               
                            <MdDashboardCustomize onClick={handleExpand} />
                            {isExpanded && <span className={styles.iconText} onClick={handleDash}>Dashboard</span>}
                           
                </div>
                */}
            </div>

            <div
              className={`${isExpanded ? styles["iconContainer"] : ""} `}
              onClick={handleExpand}
            >
              <FaPowerOff />
              {isExpanded && (
                <span className={styles.iconText} onClick={logoff}>
                  Logout
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navscreen;

/*<div className={`${isExpanded ? styles['iconContainer'] : ''} `} onClick={handleExpand}>
                            <MdHomeRepairService onClick={handleExpand} />
                            {isExpanded && <span className={styles.iconText} onClick={handleServiceClick}>Serviços</span>}
                        </div> */
