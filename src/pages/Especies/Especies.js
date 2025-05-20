import Navscreen from "../../components/homepage/Navscreen";
import styles from "./Especies.module.css";
import Usernav from "../../components/homepage/Usernav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, {
  getCompleteHeader,
  getSimpleHeader,
  DAMA_URL,
} from "../../components/axios/axiosLaravelConfig";
import { TbTrashXFilled } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import Popup from "../../components/Poupup";
import localImagem from "../../assets/local.png";
import Header from "../../components/Header/index2";
import {
  StyledButtonArea,
  StyledButtonOpen,
  StyledContainerTable,
  StyledFindItem,
  StyledSearch,
  StyledTableItens,
  StyledTableList,
  StyledDeleteButton,
  StyledExpandButton,
} from "../../components/StyledComponents/TableList.style";
import informationIcon from "../../assets/information-348.svg";
import EspecieComponent from "../../components/Especie/EspecieComponent";

const SIMPLE_HEADER = getSimpleHeader();
const ESPECIE_URL = `${DAMA_URL}/api/especie`;

function Especies() {
  const [searchTerm, setSearchTerm] = useState("");

  const [especie, setEspecie] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEspecieComponentOpen, setIsEspecieComponentOpen] = useState(false);

  /*
  useEffect(() => {
    axios
      .get(
        `${DAMA_URL}/api/local-referencia/monitoring/${monitoramentoData.id}`,
        {
          headers: SIMPLE_HEADER,
        }
      )
      .then((response) => {
        setReferenceLocal(response.data);
        //console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);*/

  const getHeaders = () => {
    const SIMPLE_HEADER = getSimpleHeader();
    const COMPLETE_HEADER = getCompleteHeader();
    return { SIMPLE_HEADER, COMPLETE_HEADER };
  };

  function buscarEspeciePesquisador() {
    const { SIMPLE_HEADER } = getHeaders();
    axios
      .get(ESPECIE_URL, {
        headers: SIMPLE_HEADER,
      })
      .then(function (response) {
        //console.log(response.data);
        setLoading(false);
        setEspecie(response.data);
        const data = JSON.stringify(response.data);
        sessionStorage.setItem("especieData", data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function removeEspecie(id) {
    const rout = `${ESPECIE_URL}/${id}`;
    console.log("id:", id, "url:", rout);
    axios
      .delete(rout, {
        headers: SIMPLE_HEADER,
      })
      .then(function (response) {
        //console.log(response);

        const indexToRemove = especie.findIndex((item) => item.id === id);

        if (indexToRemove !== -1) {
          const updatedEspecie = [
            ...especie.slice(0, indexToRemove),
            ...especie.slice(indexToRemove + 1),
          ];
          setEspecie(updatedEspecie);
        }
        setPopupMessage("Especie Deletada");
        setPopupType("success");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    buscarEspeciePesquisador();
  }, []);

  const handleOpenEspecieComponent = () => {
    setIsEspecieComponentOpen(true);
  };

  const handleCloseEspecieComponent = () => {
    setIsEspecieComponentOpen(false);
  };

  const [expandedItens, setExpandedItens] = useState(false);

  const toggleExpansion = () => {
    setExpandedItens(!expandedItens);
  };

  return (
    <div className={styles.container}>
    
      <Navscreen />

      <div className={styles.containerinfo}>
        <Usernav pageBack={true} />
        {showPopup && <Popup message={popupMessage} type={popupType} />}

        <div className={styles.header}>
          <Header
            titulo="Espécies"
            texto="Analise as espécies disponiveis na platadorma"
            referencia=""
            description="Busque as espécies de interesse!"
            imagem={localImagem}
          />
        </div>

        <div className={styles.textContainer}>
          <StyledTableList>
            <StyledContainerTable>
              <StyledFindItem>
                <p>Tabela de Espécie</p>
                <StyledSearch>
                  <input
                    type="text"
                    placeholder="Buscar Espécie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FiSearch className={styles.iconBuscar} />
                </StyledSearch>
              </StyledFindItem>

              <StyledTableItens>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Espécie</th>
                      <th>Família</th>
                      <th>Ordem</th>
                      <th>Classe</th>
                      <th>Filo</th>
                      <th>Reino</th>
                      <th>Ações</th>
                      {expandedItens && (
                        <>
                          <th>Sub-Ordem</th>
                          <th>Sub-Classe</th>
                          <th>Super-Classe</th>
                          <th>Sub-Filo</th>
                          <th>Sub-reino</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {especie

                      .filter((item) =>
                        Object.values(item).some((value) =>
                          String(value)
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                      )
                      .map((item, index) => (
                        <tr className={styles.infoEquipe} key={item.id}>
                          <td>{index + 1}</td>
                          <td title={item.species}>{item.species}</td>
                          <td title={item.family}>{item.family}</td>
                          <td title={item.order}>{item.order}</td>
                          <td title={item.class}>{item.class}</td>
                          <td title={item.phylum}>{item.phylum}</td>
                          <td title={item.kingdom}>{item.kingdom}</td>
                          <td>
                            <StyledButtonArea>
                              <StyledExpandButton
                                title="Ver novos detalhes"
                                onClick={() => toggleExpansion()}
                              >
                                <img src={informationIcon} />
                              </StyledExpandButton>

                              <StyledDeleteButton
                                className={styles.icon2}
                                title="Excluir especie"
                                onClick={() => removeEspecie(item.id)}
                              >
                                <TbTrashXFilled />
                              </StyledDeleteButton>
                            </StyledButtonArea>
                          </td>
                          {expandedItens && (
                            <>
                              <td title={item.suborder}>{item.suborder}</td>
                              <td title={item.subclass}>{item.subclass}</td>
                              <td title={item.superclass}>{item.superclass}</td>
                              <td title={item.subphylum}>{item.subphylum}</td>
                              <td title={item.subkingdom}>{item.subkingdom}</td>
                            </>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </StyledTableItens>

              <StyledButtonOpen>
                <button
                  title="Adicionar espécie"
                  onClick={handleOpenEspecieComponent}
                >
                  +
                </button>
              </StyledButtonOpen>
              <EspecieComponent
                isOpen={isEspecieComponentOpen}
                onClose={handleCloseEspecieComponent}
              />
            </StyledContainerTable>
          </StyledTableList>
        </div>
      </div>
    </div>
  );
}
export default Especies;
