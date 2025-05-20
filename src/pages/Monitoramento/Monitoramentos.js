import Navscreen from "../../components/homepage/Navscreen";
import styles from "./Monitoramentos.module.css";
import Usernav from "../../components/homepage/Usernav";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import BtnComponent from "../../components/Button/BtnComponent";
import MonitoramentoTable from "../../components/monitoramentos/monitorcomponentes/monitoramentoTable";
import { useNavigate } from "react-router-dom";
import axios, {
  getCompleteHeader,
  getSimpleHeader,
  DAMA_URL,
} from "../../components/axios/axiosLaravelConfig";
import { useSelector } from "react-redux";
import Popup from "../../components/Poupup";
import ModalComponent from "../../components/Moldal/ModalComponent";
import waterIcon from "../../assets/sea.png";
import forestIcon from "../../assets/jungle.png";
import cloudIcon from "../../assets/clouds.png";
import {
  StyledDoubleInput,
  StyledFirstInput,
  StyledFormGroup,
  StyledInputFoto,
  StyledSecondInput,
  StyledTripleInputFoto,
  StyledUniqueInput,
  StyledUniqueSelect,
} from "../../components/StyledComponents/FormGroup.style";
import Header from "../../components/Header/index2";
import localImagem from"../../assets/moitordfn.png"
import {
  StyledButtonOpen,
  StyledContainerTable,
  StyledFindItem,
  StyledSearch,
  StyledTableList,
} from "../../components/StyledComponents/TableList.style";

const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();

function Monitoramentos() {
  const [dataTeams, setDataTeams] = useState([]);
  const [monitoramentos, setMonitoramentos] = useState([]);
  const [monitoramentoData, setMonitoramentoData] = useState([]);
  const [nome, setNome] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [projetoSelecionado, setprojetoSelecionado] = useState("");
  const [categorias, setCategorias] = useState("");
  const [subCategorias, setSubCategorias] = useState("");
  const [equipeSelecionada, setEquipeSelecionada] = useState("");
  const [meioSelecionado, setMeioSelecionado] = useState("");
  const [projectListado, setProjectListado] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  const navigate = useNavigate();
  const projectData = useSelector((state) => state.project.projectData);

  async function projectList() {
    try {
      const response = await axios.get(`${DAMA_URL}/api/project`, {
        headers: SIMPLE_HEADER,
      });

      const projectAll = response.data;
      //console.log(response.data);
      const projectAllString = JSON.stringify(projectAll);
      sessionStorage.setItem("ProjectList", projectAllString);
      setProjectListado(projectAll); // Atualize o estado aqui
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!projectData) {
      console.log("vou chamar projetos");
      projectList();
    } else {
      console.log("ja tenho projetos");

      const projectListObject = JSON.parse(
        sessionStorage.getItem("ProjectList")
      );
      setProjectListado(projectListObject || []);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${DAMA_URL}/api/equip`, {
        headers: SIMPLE_HEADER,
      })
      .then((response) => {
       ///console.log(response);
        setDataTeams(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [showPopup]);

  useEffect(() => {
    axios
      .get(`${DAMA_URL}/api/monitoring`, {
        headers: SIMPLE_HEADER,
      })
      .then((response) => {
        //console.log(response.data);
        const monitoramentosFormatados = response.data.map((monitoramento) => ({
          ...monitoramento,
          inicio: formaterDate(monitoramento.inicio),
          fim: formaterDate(monitoramento.fim),
        }));
        setMonitoramentos(monitoramentosFormatados);
        const monitorList = JSON.stringify(monitoramentosFormatados);
        sessionStorage.setItem("MonitorList", monitorList);
        console.log(
          "o que seria object.value:::",
          Object.values(monitoramentosFormatados)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [showPopup]);

  function handleSelecionarMeio(meio) {
    setMeioSelecionado(meio);
  }

  const formaterDate = (dataAmericana) => {
    const [ano, mes, dia] = dataAmericana.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  function cadastrarMonitoramento(e) {
    const idProject = projectData ? projectData.id : projetoSelecionado;
    const dataInicialFormatada = formaterDate(dataInicial);
    const dataFinalFormatada = formaterDate(dataFinal);
    console.log(nome);
    e.preventDefault();

    axios
      .post(
        `${DAMA_URL}/api/monitoring`,
        {
          nome,
          descricao: "",
          inicio: dataInicialFormatada,
          fim: dataFinalFormatada,
          projeto_id: idProject,
          meio: meioSelecionado,
          categoria: categorias,
          subcategoria: subCategorias,
        },
        {
          headers: COMPLETE_HEADER,
        }
      )
      .then(function (response) {
        //console.log(response);
        equipeMonitoramento(response.data.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function removeMonitoramento(id) {
    const removeRoute = `${DAMA_URL}/api/monitoring/${id}`;
    try {
      await axios.delete(removeRoute, {
        headers: SIMPLE_HEADER,
      });
      setPopupMessage("Monitoramento deletado!");
      setPopupType("success");
      setShowPopup(true);
      setMonitoramentos((prevMonitoramentos) =>
        prevMonitoramentos.filter((item) => item.id !== id)
      );
      setTimeout(() => {
        setShowPopup(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }

  function equipeMonitoramento(monitoramentoId) {
    console.log(equipeSelecionada);
    axios
      .post(
        `${DAMA_URL}/api/monitoring-equip`,
        {
          organizacao_equipe_id: equipeSelecionada,
          monitoramento_id: monitoramentoId,
        },
        {
          headers: COMPLETE_HEADER,
        }
      )
      .then(function (response) {
        //console.log(response);
        setPopupMessage("Monitoramento criado com sucesso!");
        setPopupType("success");
        setShowPopup(true);
        setDataFinal("");
        setNome("");
        setDataInicial("");
        setMeioSelecionado("");
        setCategorias("");
        setSubCategorias("");
        setEquipeSelecionada("");

        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleLocalRef(monitor) {
    sessionStorage.setItem(
      "select-monitoring",
      JSON.stringify({ id: monitor.id, nome: monitor.nome })
    );
    navigate("/local-referencia");
  }

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
    /*if (projetoSelecionado) {
      setTimeout(() => {
        setModalOpen(true);
      }, 150);
    } else {
      setPopupMessage("Selecione um Projeto");
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }*/
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Navscreen />

      <div className={styles.containerinfo}>
        <Usernav pageBack={true} />      
        <div className={styles.header}>
          <Header
          
            titulo="Monitoramentos"
            texto="Visualize dados de seus monitoramentos!"
            referencia=""
            description="Busque as espécies de interesse!"
            imagem={localImagem}
          />
        </div>
        {showPopup && <Popup message={popupMessage} type={popupType} />}
        <div className={styles.textContainer}>
          {modalOpen && (
            <ModalComponent
              isOpen={modalOpen}
              onClose={handleCloseModal}
              title="Criar novo Monitoramento"
            >
              <StyledFormGroup>
                <StyledUniqueSelect>
                  <p>Selecione o projeto</p>
              <select
              id="projectSelect"
              name="projectSelect"
              value={projetoSelecionado}
              onChange={(e) => setprojetoSelecionado(e.target.value)}
            >
              <option disabled value="">
                {projectListado ? "Selecione um projeto:" : "Carregando..."}
              </option>
              {projectListado?.map((projeto) => (
                <option key={projeto.id} value={projeto.id}>
                  {projeto.nome}
                </option>
              ))}
            </select>
            </StyledUniqueSelect>
                <StyledUniqueInput>
                  
                  <p>Nome do Monitoramento</p>
                  <input
                    type="text"
                    id="project"
                    name="project"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </StyledUniqueInput>

                <StyledDoubleInput>
                  <StyledFirstInput>
                    <p>Data inicial</p>
                    <input
                      type="date"
                      id="dataInicial"
                      name="dataInicial"
                      value={dataInicial}
                      onChange={(e) => setDataInicial(e.target.value)}
                    />
                  </StyledFirstInput>
                  <StyledSecondInput>
                    <p>Data final:</p>
                    <input
                      type="date"
                      id="dataFinal"
                      name="dataFinal"
                      value={dataFinal}
                      onChange={(e) => setDataFinal(e.target.value)}
                    />
                  </StyledSecondInput>
                </StyledDoubleInput>

                <StyledUniqueSelect>
                  <p>Selecione a equipe</p>

                  <select
                    className={styles.selectProject}
                    name="select"
                    value={equipeSelecionada}
                    onChange={(e) => setEquipeSelecionada(e.target.value)}
                  >
                    <option disabled value="">
                      Selecione uma opção:
                    </option>

                    {dataTeams?.map((equipe) => (
                      <option key={equipe.id} value={equipe.id}>
                        {equipe.nome}
                      </option>
                    ))}
                  </select>
                </StyledUniqueSelect>

                <p className="textMonitor">Meio do monitoramento</p>
                <StyledTripleInputFoto>
                  <StyledInputFoto
                    className={`${
                      meioSelecionado === "aquatico" ? styles.selecionado : ""
                    }`}
                  >
                    <img src={waterIcon} />
                    <p>Aquático</p>
                  </StyledInputFoto>

                  <StyledInputFoto
                    className={`${
                      meioSelecionado === "terreste" ? styles.selecionado : ""
                    }`}
                  >
                    <img src={forestIcon} />
                    <p>Terrestre</p>
                  </StyledInputFoto>

                  <StyledInputFoto
                    className={` ${
                      meioSelecionado === "aero" ? styles.selecionado : ""
                    }`}
                    onClick={() => handleSelecionarMeio("aero")}
                  >
                    <img src={cloudIcon} />
                    <p>Aéreo</p>
                  </StyledInputFoto>
                </StyledTripleInputFoto>

                <StyledDoubleInput>
                  <StyledFirstInput>
                    <p>Selecione a categoria</p>

                    <select
                      className={styles.selectProject}
                      name="select"
                      value={categorias}
                      onChange={(e) => setCategorias(e.target.value)}
                    >
                      <option disabled value="">
                        Selecione uma opção:
                      </option>

                      <option>Bentos</option>
                      <option>Baleias</option>
                      <option>Golfinhos</option>
                    </select>
                  </StyledFirstInput>

                  <StyledSecondInput>
                    <p>Selecione a subcategoria</p>

                    <select
                      className={styles.selectProject}
                      name="select"
                      value={subCategorias}
                      onChange={(e) => setSubCategorias(e.target.value)}
                    >
                      <option disabled value="">
                        Selecione uma opção:
                      </option>

                      <option>Orcas</option>
                      <option>Golfinho comum</option>
                      <option>Baleia</option>
                    </select>
                  </StyledSecondInput>
                </StyledDoubleInput>

                <div className={styles.btnGroup}>
                  <BtnComponent
                    value="Cadastrar Monitoramento"
                    onClick={cadastrarMonitoramento}
                  >
                    Criar Monitoramento
                  </BtnComponent>
                </div>
              </StyledFormGroup>
            </ModalComponent>
          )}
         <StyledTableList>
            <StyledContainerTable>
              <StyledFindItem>
                <p>Tabela de Monitoramentos</p>
                <StyledSearch>
                <input
                  type="text"
                  placeholder="Buscar Monitoramento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className={styles.iconBuscar} />
                </StyledSearch>
              </StyledFindItem>

              <MonitoramentoTable
                monitoramentos={monitoramentos.filter((monitoramento) =>
                  Object.keys(monitoramento).some((key) =>
                    String(monitoramento[key])
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                )}
                searchTerm={searchTerm}
                handleLocalRef={handleLocalRef}
                removeMonitoramento={removeMonitoramento}
              />
              <StyledButtonOpen>

              <button
                  value="Cadastrar Monitoramento"
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
export default Monitoramentos;
