import Navscreen from "../../../components/homepage/Navscreen";
import styles from "./LocalReferencia.module.css";
import Usernav from "../../../components/homepage/Usernav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, {
  getCompleteHeader,
  getSimpleHeader,
  DAMA_URL,
} from "./../../../components/axios/axiosLaravelConfig";
import { FiSearch } from "react-icons/fi";

import Popup from "../../../components/Poupup";
import localImagem from "../../../assets/local.png";
import Header from "../../../components/Header/index2";
import ModalComponent from "../../../components/Moldal/ModalComponent";
import { TbTrashXFilled } from "react-icons/tb";

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
import {
  StyledBtnGroup,
  StyledDoubleInput,
  StyledFirstInput,
  StyledFormGroup,
  StyledSecondInput,
  StyledUniqueInput,
} from "../../../components/StyledComponents/FormGroup.style";

const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();

function LocalReferencia() {
  const [searchTerm, setSearchTerm] = useState("");
  const [localReferencia, setLocalReferencia] = useState("");
  const [localNome, setLocalNome] = useState("");
  const [log, setLog] = useState("");
  const [lat, setLat] = useState("");
  const [obs, setObs] = useState("");
  const monitoramentoData = JSON.parse(
    sessionStorage.getItem("select-monitoring")
  );
  const [referenceLocal, setReferenceLocal] = useState([]);
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  useEffect(() => {
    axios
      .get(
        `${DAMA_URL}/api/local-referencia/monitoring/${monitoramentoData.id}`,
        {
          headers: SIMPLE_HEADER,
        }
      )
      .then((response) => {
        console.log("estou aqui esse é o dados", response.data);
        setReferenceLocal(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [showPopup]);

  function cadastrarLocalReferencia(e) {
    // console.log('local Referencia:', localReferencia);
    // console.log('lat log:', latLog);
    // console.log('UTM:', utm);
    // console.log('Zona:', zona);
    // console.log('obs:', obs);
    // console.log('id monitoramento', monitoramentoData.id)
    e.preventDefault();

    axios
      .post(
        `${DAMA_URL}/api/local-referencia`,
        {
          nome: localReferencia,
          local: localNome,
          lat,
          log,
          monitoramento_id: monitoramentoData.id,
          descricao: obs,
        },
        {
          headers: COMPLETE_HEADER,
        }
      )
      .then(function (response) {
        //console.log(response);
        setShowPopup(true);
        setPopupMessage("local criado com sucesso!");
        setPopupType("success");
        setLocalReferencia("");
        setLocalNome("");
        setLat("");
        setLog("");
        setObs("");
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function removeReferencia(id) {
    const removeRoute = `${DAMA_URL}/api/local-referencia/${id}`;
    console.log("remove route:", removeRoute);
    try {
      await axios.delete(removeRoute, {
        headers: SIMPLE_HEADER,
      });

      setPopupMessage("Local de referencia deletado!");
      setPopupType("success");
      setShowPopup(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  function handleToColeta(item) {
    console.log("nome item", item.nome);
    console.log("id do item:", item.id);
    sessionStorage.setItem(
      "reference-Id",
      JSON.stringify({ id: item.id, nome: item.nome })
    );
    navigate("/ponto-coleta");
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
    //window.location.reload();
  };

  return (
    <div className={styles.container}>
      <Navscreen />

      <div className={styles.containerinfo}>
        <Usernav pageBack={true} />
        {showPopup && <Popup message={popupMessage} type={popupType} />}

        <div className={styles.header}>
          <Header
            titulo="local de referência"
            texto="Otimize seus monitoramentos
                     com informações de cada local de referência."
            referencia={monitoramentoData.nome}
            description="Crie local de referência para"
            imagem={localImagem}
          />
        </div>

        <div className={styles.textContainer}>
          {modalOpen && (
            <ModalComponent
              isOpen={modalOpen}
              onClose={handleCloseModal}
              title={"Criar local de referência"}
            >
              <StyledFormGroup onSubmit={cadastrarLocalReferencia}>
                <StyledDoubleInput>
                  <StyledFirstInput>
                    <p>Nome de referência:</p>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="BT10.."
                      value={localReferencia}
                      onChange={(e) => setLocalReferencia(e.target.value)}
                    />
                  </StyledFirstInput>
                  <StyledSecondInput>
                    <p>Nome do local:</p>
                    <input
                      type="text"
                      id="local"
                      name="local"
                      placeholder="Santos..."
                      value={localNome}
                      onChange={(e) => setLocalNome(e.target.value)}
                    />
                  </StyledSecondInput>
                </StyledDoubleInput>

                <StyledDoubleInput>
                  <StyledFirstInput>
                    <p>Adicione a latitude:</p>
                    <input
                      type="text"
                      placeholder="-23.944841 "
                      onChange={(e) => setLat(e.target.value)}
                      value={lat}
                    />
                  </StyledFirstInput>
                  <StyledSecondInput>
                    <p>Adicione a longitude:</p>
                    <input
                      type="text"
                      placeholder="-46.330376"
                      onChange={(e) => setLog(e.target.value)}
                      value={log}
                    />
                  </StyledSecondInput>
                </StyledDoubleInput>

                <StyledUniqueInput>
                  <p>Observação:</p>
                  <input
                    type="text"
                    placeholder="Digite aqui..."
                    onChange={(e) => setObs(e.target.value)}
                    value={obs}
                  />
                </StyledUniqueInput>
                <StyledBtnGroup>
                  <button
                    type="button"
                    value="Cadastrar"
                    className={styles.btnCadastrar}
                    onClick={cadastrarLocalReferencia}
                  >
                    Criar Referência
                  </button>
                </StyledBtnGroup>
              </StyledFormGroup>
            </ModalComponent>
          )}

          <StyledTableList>
            <StyledContainerTable>
              <StyledFindItem>
                <p>Tabela de Locais de Refência</p>
                <StyledSearch>
                  <input
                    type="text"
                    placeholder="Buscar local referência..."
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
                      <th>Nome</th>
                      <th>Projeto</th>
                      <th>Local</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referenceLocal
                      .filter((referenceLocal) =>
                        Object.values(referenceLocal).some((value) =>
                          String(value)
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                      )
                      .map((item, index) => (
                        <tr>
                          <td title={index + 1}>{index + 1}</td>
                          <td title={item.nome}>{item.nome}</td>
                          <td title={item.projeto_nome}>{item.projeto_nome}</td>
                          <td title={item.local}>{item.local}</td>
                          <td title={item.lat}>{item.lat}</td>
                          <td title={item.log}>{item.log}</td>

                          <td>
                            <StyledButtonArea>
                              <StyledAddButton
                                title="Criar Ponto de Coleta"
                                onClick={() => handleToColeta(item)}
                              >
                                +
                              </StyledAddButton>
                              <StyledDeleteButton
                                title="Excluir Ponto de Coleta"
                                onClick={() => removeReferencia(item.id)}
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
                <button value="Criar Referência" onClick={handleOpenModal}>
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
export default LocalReferencia;
