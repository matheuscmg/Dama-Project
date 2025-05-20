import Navscreen from "../../../components/homepage/Navscreen";
import styles from "./../Monitoramentos.module.css";
import Usernav from "../../../components/homepage/Usernav";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios, {
  getCompleteHeader,
  getSimpleHeader,
  DAMA_URL,
} from "../../../components/axios/axiosLaravelConfig";
import BtnComponent from "../../../components/Button/BtnComponent";
import { useSelector } from "react-redux";
import Popup from "../../../components/Poupup";
import Header from "../../../components/Header";
import localImagem from "../../../assets/moitordfn.png";
import MonitoramentoTable from "../../../components/monitoramentos/monitorcomponentes/monitoramentoTable";
import ModalComponent from "../../../components/Moldal/ModalComponent";

const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();

function Monitoramento() {
  const [dataTeams, setDataTeams] = useState([]);
  const [monitoramentos, setMonitoramentos] = useState([]);
  const [nome, setome] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [categorias, setCategorias] = useState("");
  const [subCategorias, setSubCategorias] = useState("");
  const [equipeSelecionada, setEquipeSelecionada] = useState("");
  const [meioSelecionado, setMeioSelecionado] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  const navigate = useNavigate();

  const projectData = useSelector((state) => state.project.projectData);
  const monitorDataRoute = `${DAMA_URL}/api/monitoring/project/${projectData.id}`;
  console.log("meu project data:::", projectData);

  async function GetMonitorProject() {
    try {
      const response = await axios.get(monitorDataRoute, {
        headers: SIMPLE_HEADER,
      });
      //console.log(response.data);
      const monitoramentosFormatados = response.data.map((monitoramento) => ({
        ...monitoramento,
        inicio: formaterDate(monitoramento.inicio),
        fim: formaterDate(monitoramento.fim),
      }));

      setMonitoramentos(monitoramentosFormatados);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (projectData.id) {
      GetMonitorProject();
    }
  }, [showPopup]);

  useEffect(() => {
    axios
      .get(`${DAMA_URL}/api/equip`, {
        headers: SIMPLE_HEADER,
      })
      .then((response) => {
        //console.log(response);
        setDataTeams(response.data);
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
    const dataInicialFormatada = formaterDate(dataInicial);
    const dataFinalFormatada = formaterDate(dataFinal);
    e.preventDefault();

    axios
      .post(
        `${DAMA_URL}/api/monitoring`,
        {
          nome: nome,
          descricao: "",
          inicio: dataInicialFormatada,
          fim: dataFinalFormatada,
          projeto_id: projectData.id,
          meio: meioSelecionado,
          categoria: categorias,
          subcategoria: subCategorias,
        },
        { headers: COMPLETE_HEADER }
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
    console.log("remove route:", removeRoute);
    try {
      await axios.delete(removeRoute, {
        headers: SIMPLE_HEADER,
      });

      setPopupMessage("Monitoramento deletado!");
      setPopupType("success");
      setShowPopup(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
        setTimeout(() => {
          setShowPopup(false);
          window.location.reload();
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleLocalRef(monitor) {
    sessionStorage.setItem(
      "select-monitoring",
      JSON.stringify({ id: projectData.id, nome: projectData.nome })
    );
    navigate("/local-referencia");
  }
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

        <div className={styles.header}>
          <Header
            titulo="Monitoramento"
            texto="Visualize dados importantes e colabore em tempo real!"
            description="Crie Monitoramentos para"
            referencia={projectData?.nome}
            imagem={localImagem}
          />
        </div>

        {showPopup && <Popup message={popupMessage} type={popupType} />}
        <div className={styles.textContainer}>
          {modalOpen && (
            <div className={styles.modal}>
              <ModalComponent
                isOpen={modalOpen}
                onClose={handleCloseModal}
                title="Criar novo Monitoramento"
              >
                <form className={styles.formGroup}>
                  <label htmlFor="">Nome Do Monitoramento:</label>
                  <input
                    type="text"
                    id="project"
                    name="project"
                    value={nome}
                    onChange={(e) => setome(e.target.value)}
                  />

                  <div className={styles.data}>
                    <div className={styles.datainicio}>
                      <p>Data inicial:</p>
                      <input
                        type="date"
                        id="dataInicial"
                        name="dataInicial"
                        value={dataInicial}
                        onChange={(e) => setDataInicial(e.target.value)}
                      />
                    </div>
                    <div className={styles.datafim}>
                      <p>Data final:</p>
                      <input
                        type="date"
                        id="dataFinal"
                        name="dataFinal"
                        value={dataFinal}
                        onChange={(e) => setDataFinal(e.target.value)}
                      />
                    </div>
                  </div>

                  <label htmlFor="">Selecione a equipe</label>
                  <div className={styles.selectInfo}>
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
                  </div>

                  <label htmlFor="">Meio do monitoramento</label>
                  <div className={styles.meios}>
                    <div
                      className={`${styles.tipoMeio} ${
                        meioSelecionado === "aquatico" ? styles.selecionado : ""
                      }`}
                      onClick={() => handleSelecionarMeio("aquatico")}
                    >
                      <div className={styles.iconwater} />
                      <p>Aquático</p>
                    </div>

                    <div
                      className={`${styles.tipoMeio} ${
                        meioSelecionado === "terreste" ? styles.selecionado : ""
                      }`}
                      onClick={() => handleSelecionarMeio("terreste")}
                    >
                      <div className={styles.iconforest} />
                      <p>Terrestre</p>
                    </div>

                    <div
                      className={`${styles.tipoMeio} ${
                        meioSelecionado === "aero" ? styles.selecionado : ""
                      }`}
                      onClick={() => handleSelecionarMeio("aero")}
                    >
                      <div className={styles.iconcloud} />
                      <p>Aéreo</p>
                    </div>
                  </div>

                  <label htmlFor="">Selecione a categoria</label>
                  <div className={styles.selectInfo}>
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
                  </div>

                  <label htmlFor="">Selecione a subcategoria</label>
                  <div className={styles.selectInfo}>
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
                  </div>

                  <div className={styles.btnGroup}>
                    <BtnComponent
                      value="Cadastrar Monitoramento"
                      onClick={cadastrarMonitoramento}
                    >
                      Criar Monitoramento
                    </BtnComponent>
                  </div>
                </form>
              </ModalComponent>
            </div>
          )}
          <div className={styles.projectContainer}>
            <div className={styles.containterProject}>
              <div className={styles.busca}>
                <input
                  type="text"
                  placeholder="Buscar Monitoramento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className={styles.iconBuscar} />
              </div>

              <MonitoramentoTable
                monitoramentos={monitoramentos.filter((monitoramento) =>
                  monitoramento.nome
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )}
                searchTerm={searchTerm}
                handleLocalRef={handleLocalRef}
                removeMonitoramento={removeMonitoramento}
              />

              <div className={styles.btnOpen}>
                <BtnComponent
                  value="Cadastrar Monitoramento"
                  onClick={handleOpenModal}
                >
                  Criar Monitoramento
                </BtnComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Monitoramento;

// onClick={() => EditProject(userData[index])}
//onClick={() => handleRemove(userData[index])}
/*
{!projectData ? (
                <>
                  <label htmlFor="">Selecione um projeto:</label>
                  <div className={styles.selectInfo}>
                    <select
                      id="projectSelect"
                      name="projectSelect"
                      value={projetoSelecionado}
                      onChange={(e) => setprojetoSelecionado(e.target.value)}
                    >
                      <option disabled value="">
                        Selecione um projeto:
                      </option>
                      {projectListado?.map((projeto) => (
                        <option key={projeto.id} value={projeto.id}>
                          {projeto.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <label htmlFor="">Projeto Selecionado</label>
                  <input
                    type="text"
                    id="project"
                    name="project"
                    value={projectData?.nome || 'Nenhum projeto selecionado'}
                    className={styles.inptProject}
                  />
                </>
              )} */
