import Navscreen from "../../../components/homepage/Navscreen";
import Usernav from "../../../components/homepage/Usernav";
import styles from "./PontoColeta.module.css";
import localImagem from "../../../assets/local.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../../../components/Poupup";
import { FiSearch } from "react-icons/fi";
import axios, {
  getCompleteHeader,
  getSimpleHeader,
  DAMA_URL,
} from "./../../../components/axios/axiosLaravelConfig";
import Header from "../../../components/Header/index2";
import ModalComponent from "../../../components/Moldal/ModalComponent";
import { TbTrashXFilled } from "react-icons/tb";

import {
  StyledBtnGroup,
  StyledDoubleInput,
  StyledFirstInput,
  StyledFormGroup,
  StyledSecondInput,
  StyledUniqueInput,
} from "../../../components/StyledComponents/FormGroup.style";
import {
  StyledButtonArea,
  StyledButtonOpen,
  StyledContainerTable,
  StyledFindItem,
  StyledSearch,
  StyledTableItens,
  StyledTableList,
  StyledAddButton,
  StyledDeleteButton,
} from "../../../components/StyledComponents/TableList.style";

const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();

function PontoColeta() {
  const [dataTeams, setDataTeams] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [log, setLog] = useState("");
  const [lat, setLat] = useState("");
  const [obs, setObs] = useState("");
  const refereceData = JSON.parse(sessionStorage.getItem("reference-Id"));
  const [coleta, setColeta] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  //console.log('id da referencia', referece.id)
  //console.log('nome da referencia', referece.nome)

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  useEffect(() => {
    axios
      .get(`${DAMA_URL}/api/coleta/local-referencia/${refereceData.id}`, {
        headers: SIMPLE_HEADER,
      })
      .then((response) => {
        //console.log(response);

        const coletaFormatados = response.data.map((coleta) => ({
          ...coleta,
          inicio: formaterDate(coleta.inicio),
          fim: formaterDate(coleta.fim),
        }));        
        setColeta(coletaFormatados);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [showPopup]);

  const formaterDate = (dataAmericana) => {
    const [ano, mes, dia] = dataAmericana.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  function cadastrarLocalReferencia() {
    console.log("lat", lat, "log:", log);
    const dataInicioFormatada = formaterDate(dataInicio);
    const dataFimFormatada = formaterDate(dataFim);

    axios
      .post(
        `${DAMA_URL}/api/coleta`,
        {
          lat,
          log,
          descricao: obs,
          inicio: dataInicioFormatada,
          fim: dataFimFormatada,
          local_referencia_id: refereceData.id,
        },
        {
          headers: COMPLETE_HEADER,
        }
      )
      .then(function (response) {
        //console.log(response);
        setLat("");
        setLog("");
        setObs("");
        setDataInicio("");
        setDataFim("");
        setShowPopup(true);
        setPopupMessage("Coleta criada com sucesso!");
        setPopupType("success");

        setTimeout(() => {
          //window.location.reload()
          setShowPopup(false);
        }, 1500);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function removeColeta(id) {
    const removeRoute = `${DAMA_URL}/api/coleta/${id}`;
    console.log("remove route:", removeRoute);
    try {
      await axios.delete(removeRoute, {
        headers: SIMPLE_HEADER,
      });

      setPopupMessage("Ponto de coleta deletado!");
      setPopupType("success");
      setShowPopup(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  function handleToAmostra(id) {
    console.log("id coleta", id);
    const data = JSON.stringify(id);
    sessionStorage.setItem("coletaData", data);

    setTimeout(() => {
      navigate("/amostra");
    }, 300);
    //
  }

  return (
    <div className={styles.container}>
      <Navscreen />

      <div className={styles.containerinfo}>
        <Usernav pageBack={true} />
        {showPopup && <Popup message={popupMessage} type={popupType} />}

        <div className={styles.header}>
          <Header
            titulo="Ponto de Coleta"
            texto="Especifique o local exatado de suas coletas."
            description="Crie ponto de coleta para"
            referencia={refereceData.nome}
            imagem={localImagem}
          />
        </div>

        <div className={styles.textContainer}>
          {modalOpen && (
            <ModalComponent
              isOpen={modalOpen}
              onClose={handleCloseModal}
              title={"Criar ponto de coleta"}
            >
              <StyledFormGroup>
                <StyledUniqueInput>
                  <p>Referência</p>
                  <a>
                    <input
                      type="text"
                      value={refereceData.nome}
                      onChange={(e) => setObs(e.target.value)}
                    />
                  </a>
                </StyledUniqueInput>

                <StyledDoubleInput>
                  <StyledFirstInput>
                    <p>Data incial</p>
                    <input
                      type="date"
                      id="DataI"
                      name="DataI"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                    />
                  </StyledFirstInput>
                  <StyledSecondInput>
                    <p>Data final</p>
                    <input
                      type="date"
                      id="DataF"
                      name="DataF"
                      value={dataFim}
                      onChange={(e) => setDataFim(e.target.value)}
                    />
                  </StyledSecondInput>
                </StyledDoubleInput>

                <StyledDoubleInput>
                  <StyledFirstInput>
                    <p>Adicione a latitude</p>
                    <input
                      type="text"
                      placeholder="-23.944841 "
                      value={lat}
                      onChange={(e) => setLat(e.target.value)}
                    />
                  </StyledFirstInput>
                  <StyledSecondInput>
                    <p>Adicione a longitude</p>
                    <input
                      type="text"
                      placeholder="-45.942841 "
                      value={log}
                      onChange={(e) => setLog(e.target.value)}
                    />
                  </StyledSecondInput>
                </StyledDoubleInput>

                <StyledUniqueInput>
                  <p>Observação:</p>
                  <input
                    type="text"
                    placeholder="Digite aqui..."
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}
                  />
                </StyledUniqueInput>

                <StyledBtnGroup>
                  <button
                    type="button"
                    value="Cadastrar"
                    className={styles.btnCadastrar}
                    onClick={cadastrarLocalReferencia}
                  >
                    Criar Coleta
                  </button>
                </StyledBtnGroup>
              </StyledFormGroup>
            </ModalComponent>
          )}

          <StyledTableList>
            <StyledContainerTable>
              <StyledFindItem>
                <p>Tabela de Pontos de Coleta</p>
                <StyledSearch>
                  <input
                    type="text"
                    placeholder="Buscar Ponto de Coleta..."
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
                      <th>Local Referência</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Data Inicial</th>
                      <th>Data Final</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coleta
                      .filter((coleta) =>
                        Object.values(coleta).some((value) =>
                          String(value)
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                      )
                      .map((item, index) => (
                        <tr >
                          <td title = {index+1}>{index+1}</td>
                          <td title={item.local_referencia_nome}>
                            {item.local_referencia_nome}
                          </td>
                          <td title={item.lat}>{item.lat}</td>
                          <td title={item.log}>{item.log}</td>
                          <td title={item.inicio}>{item.inicio}</td>
                          <td title={item.fim}>{item.fim}</td>
                          <td>
                            <StyledButtonArea>
                              <StyledAddButton
                                title="Criar Amostra"
                                onClick={() => handleToAmostra(item.id)}
                              >
                                +
                              </StyledAddButton>
                              <StyledDeleteButton
                                title="Excluir Ponto de Coleta"
                                onClick={() => removeColeta(item.id)}
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
              <StyledButtonOpen>
                <button
                  title="Criar Coleta"
                  value="Criar Coleta"
                  onClick={handleOpenModal}
                >
                  +
                </button>
              </StyledButtonOpen>
            </StyledContainerTable>
          </StyledTableList>
        </div>
      </div>
    </div>
  );
}
export default PontoColeta;
