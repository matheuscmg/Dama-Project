import Navscreen from "../../../components/homepage/Navscreen";
import styles from "./Amostra.module.css";
import Usernav from "../../../components/homepage/Usernav";
import { useEffect, useState } from "react";

import Popup from "../../../components/Poupup";
import localImagem from "../../../assets/monitor00.png";
import Header from "../../../components/Header/index2";
import { FiSearch } from "react-icons/fi";
import { TbTrashXFilled } from "react-icons/tb";

import Abiotica from "../../../components/monitoramentos/AmostraComponent/Abiótica/Abiotica";
import Biotica from "../../../components/monitoramentos/AmostraComponent/Biótica/Biotica";
import axios, {
  DAMA_URL,
  getSimpleHeader,
} from "../../../components/axios/axiosLaravelConfig";
import { useNavigate } from "react-router-dom";
import {
  StyledAddButton,
  StyledButtonArea,
  StyledButtonOpen,
  StyledContainerTable,
  StyledDeleteButton,
  StyledFindItem,
  StyledSearch,
  StyledTableItens,
  StyledTableItens1,
  StyledTableList,
  StyledTextContainer,
} from "../../../components/StyledComponents/TableList.style";
import ModalComponent from "../../../components/Moldal/ModalComponent";

const SIMPLE_HEADER = getSimpleHeader();

function Amostra() {
  const [searchTerm, setSearchTerm] = useState("");
  const [amostra, setAmostra] = useState([""]);
  const [biotica, setBiotica] = useState([]);
  const [abiotica, setAbiotica] = useState([]);
  const coletaID = JSON.parse(sessionStorage.getItem("coletaData"));
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenAbiotica, setModalOpenAbiotica] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const navigate = useNavigate();

  const fetchAmostras = () => {
    axios
      .get(`${DAMA_URL}/api/biotica-geral-amostra`, {
        headers: SIMPLE_HEADER,
      })
      .then(function (response) {
        //console.log(response.data);
        const filteredData = response.data.filter(
          (item) => item.coleta_id === coletaID
        );
        setBiotica(filteredData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAmostras();
  }, [updateTrigger]);

  useEffect(() => {
    axios
      .get(`${DAMA_URL}/api/abiotica-geral-amostra`, {
        headers: SIMPLE_HEADER,
      })
      .then(function (response) {
        //console.log(response.data);
        const filteredData = response.data.filter(
          (item) => item.coleta_id === coletaID
        );
        setAbiotica(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  async function removeBiotica(biotica_id) {
    const removeRoute = `${DAMA_URL}/api/biotica-geral-amostra/${biotica_id}`;
    console.log("removendo biotica:", removeRoute);
    try {
      const response = await axios.delete(removeRoute, {
        headers: SIMPLE_HEADER,
      });
      console.log("Resposta:", response);

      setShowPopup(true);
      setPopupMessage("Amostra Deletada");
      setPopupType("success");
      setTimeout(() => {
        setShowPopup(false);
      }, 1500);
      setBiotica((prevItens) =>
        prevItens.filter((item) => item.id !== biotica_id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function removeAbiotica(abiotica_id) {
    const routeRemove = `${DAMA_URL}/api/abiotica-geral-amostra/${abiotica_id}`;
    console.log("removendo abiotica:", abiotica_id);
    try {
      const response = await axios.delete(routeRemove, {
        headers: SIMPLE_HEADER,
      });

      console.log("Resposta:", response);

      setShowPopup(true);
      setPopupMessage("Amostra Deletada");
      setPopupType("success");
      setAbiotica((prevItens) =>
        prevItens.filter((item) => item.id !== abiotica_id)
      );
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  function handleToDetail(item) {
    const bioticaSelect = item;
    sessionStorage.setItem("bioticaSelect", JSON.stringify({ bioticaSelect }));
    console.log("id amostra", item);
    navigate("/detalhes");
  }

  const handleOpenModalAbiotica = () => {
    setModalOpenAbiotica(true);
  };
  const handleCloseModalAbiotica = () => {
    setModalOpenAbiotica(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Navscreen />
      <div className={styles.containerinfo}>
        <Usernav pageBack={true} />
        {showPopup && <Popup message={popupMessage} type={popupType} />}
        <div className={styles.header}>
          <Header
            titulo="Amostra"
            texto="Otimize seus monitoramentos com a coleta de amostras."

            imagem={localImagem}
          />
        </div>

        <StyledTextContainer>
          <StyledTableList>
            <StyledContainerTable>
              <StyledFindItem>
                <p>Tabela de Amostras</p>
                <StyledSearch>
                  <input
                    type="text"
                    placeholder="Buscar Amostra..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FiSearch className={styles.iconBuscar} />
                </StyledSearch>
              </StyledFindItem>

              <StyledTableItens1>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Temperatura(°C)</th>
                      <th>Oxigênio(%)</th>
                      <th>Salinidade(mg/l)</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {abiotica.length > 0 ? (
                      abiotica.map((item, index) => (
                        <tr className={styles.infoEquipe} key={item.id}>
                          <td>{index + 1}</td>
                          <td title={item.temperatura}>{item.temperatura}</td>
                          <td title={item.oxigenio}>{item.oxigenio}</td>
                          <td title={item.salinidade}>{item.salinidade}</td>
                          <td>
                            <StyledButtonArea>
                              <StyledDeleteButton
                                title="Excluir abiótica"
                                onClick={() => removeAbiotica(item.id)}
                              >
                                <TbTrashXFilled />
                              </StyledDeleteButton>
                            </StyledButtonArea>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>
                          <StyledButtonArea>
                            <StyledAddButton
                              className={styles.icon}
                              title="Criar dashboard"
                              onClick={() => handleOpenModalAbiotica()}
                            >
                              +
                            </StyledAddButton>
                          </StyledButtonArea>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

              </StyledTableItens1>

              <StyledTableItens>
                <table>
                  <thead className={styles.stickyHeader}>
                    <tr>
                      <th>#</th>
                      <th>Espécie</th>
                      <th> Quantidade </th>
                      <th>Peso ( g )</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {biotica
                      ?.filter((biotica) =>
                        Object.values(biotica).some((value) =>
                          String(value)
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                      )
                      .map((item, index) => (
                        <tr className={styles.infoEquipe} key={item.id}>
                          <td>{index + 1}</td>
                          <td title={item.especie_name}>
                            {item.especie.species}
                          </td>
                          <td title={item.quantidade}>{item.quantidade}</td>
                          <td title={item.peso}>{item.peso}</td>

                          <td>
                            <StyledButtonArea>
                              {/*<DetalheAmostra />*/}

                              <StyledAddButton
                                title="Adicionar Detalhes"
                                onClick={() => handleToDetail(item)}
                              >
                                +
                              </StyledAddButton>

                              <StyledDeleteButton
                                title="Excluir abiotica"
                                onClick={() => removeBiotica(item.id)}
                              >
                                <TbTrashXFilled />
                              </StyledDeleteButton>
                            </StyledButtonArea>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </StyledTableItens>
              {/*
              <StyledButtonOpen>
                <button value="Criar Referência" >
                  +
                </button>
                      </StyledButtonOpen>*/}
              {/*}
              
              <div className={styles.btnOpen}>
                <button value="Criar Abiótica" onClick={handleOpenModal}>
                  Criar Biótica
                </button>
              </div>

              <div className={styles.btnOpen}>
                {abiotica && abiotica.length < 0 && (
                  <>
                    <div className={styles.btnAbiotica}>
                      <Abiotica />
                    </div>
                  </>
                )}
                <div className={styles.btnAbiotica}>
                  <ModalComponent
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    title="Criar Amostra Biótica"
                  >
                    <Biotica
                      updateTrigger={updateTrigger}
                      setUpdateTrigger={setUpdateTrigger}
                    />
                  </ModalComponent>
                </div>
              </div>
              */}

              <StyledButtonOpen>
                <button value="Criar Referência" onClick={handleOpenModal}>
                  +
                </button>
              </StyledButtonOpen>
              <ModalComponent
                isOpen={modalOpen}
                onClose={handleCloseModal}
                title="Criar Amostra Biótica"
              >
                <Biotica
                  updateTrigger={updateTrigger}
                  setUpdateTrigger={setUpdateTrigger}
                />
              </ModalComponent>
              <ModalComponent
                isOpen={modalOpenAbiotica}
                onClose={handleCloseModalAbiotica}
                title="Criar Amostra Biótica"
              >
                <Abiotica />

              </ModalComponent>
            </StyledContainerTable>
          </StyledTableList>
        </StyledTextContainer>
      </div>
    </div>
  );
}

export default Amostra;
