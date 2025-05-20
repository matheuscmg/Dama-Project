import styles from "./Project.module.css";
import Navscreen from "../../components/homepage/Navscreen";
import Usernav from "../../components/homepage/Usernav";
import { TbTrashXFilled } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, {
  getCompleteHeader,
  DAMA_URL,
  getSimpleHeader,
} from "../../components/axios/axiosLaravelConfig";
import { useDispatch } from "react-redux";
import { aboutProjecMoment } from "../../components/store/reducers/projectMomentReducer";
import { FiSearch } from "react-icons/fi";
import Popup from "../../components/Poupup";
import Header from "../../components/Header/index2";
import localImagem from "../../assets/projetoilustration.svg";
import ModalComponent from "../../components/Moldal/ModalComponent";

import {
  StyledBtnGroup,
  StyledFormGroup,
  StyledUniqueInput,
} from "../../components/StyledComponents/FormGroup.style";
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
} from "../../components/StyledComponents/TableList.style";

const COMPLETE_HEADER = getCompleteHeader();
const SIMPLE_HEADER = getSimpleHeader();

function Project() {
  const [inputValue, setInputValue] = useState("");
  const [projetos, setProjetos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  const navigate = useNavigate();

  async function cadastrarProjeto(e) {
    e.preventDefault();

    axios
      .post(
        `${DAMA_URL}/api/project`,
        {
          nome: inputValue,
          descricao: "",
        },
        { headers: COMPLETE_HEADER }
      )
      .then(function (response) {
        //console.log(response);
        setShowPopup(true);
        setPopupMessage("Projeto criado com sucesso!");
        setPopupType("success");
        //console.log(response.data.nome[0]);
        setProjetos((prevProjeto) => [...prevProjeto, response.data]);
        setTimeout(() => {
          setShowPopup(false);
        }, 1500);
      })
      .catch(function (error) {
        console.log(error);
        setShowPopup(true);
        setPopupMessage("Erro ao cadastrar projeto.");
        setPopupType("error");
      });

    setInputValue("");
  }

  useEffect(() => {
    axios
      .get(`${DAMA_URL}/api/project`, {
        headers: SIMPLE_HEADER,
      })
      .then((response) => {
        ////console.log(response.data);
        setProjetos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const dispatch = useDispatch();

  function EditProject(projeto) {
    //console.log("id do projeto", projeto.id);
    // console.log("Nome do projeto", projeto.nome);
    const dataProject = { id: projeto.id, nome: projeto.nome };
    //console.log("meu dataproject", dataProject);
    dispatch(aboutProjecMoment(dataProject));
    navigate("/monitoramento");
  }

  async function removeProject(projeto) {
    const removeRoute = `api/project/${projeto.id}`;
    //console.log(removeRoute);
    try {
      const response = await axios.delete(`api/project/${projeto}`, {
        headers: SIMPLE_HEADER,
      });

     // console.log("Resposta:", response);

      setShowPopup(true);
      setPopupMessage("Projeto Deletado");
      setPopupType("success");
      setProjetos((prevItens) =>
        prevItens.filter((item) => item.id !== projeto)
      );
      setTimeout(() => {
        setShowPopup(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }

  function handleRemove(id) {
    removeProject(id);
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
            titulo="Projetos"
            texto="Crie seus projetos, aloque suas equipes e alcance o sucesso!"
            imagem={localImagem}
          />
        </div>

        <div className={styles.textContainer}>
          {modalOpen && (
            <ModalComponent
              isOpen={modalOpen}
              onClose={handleCloseModal}
              title={"Criar Novo Projeto"}
            >
              <StyledFormGroup onSubmit={cadastrarProjeto}>
                <StyledUniqueInput>
                  <p>Nome</p>
                  <input
                    type="text"
                    placeholder="Projeto algas..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                  />
                </StyledUniqueInput>

                <StyledBtnGroup>
                  <button
                    type="submit"
                    value="Cadastrar"
                    className={styles.btnCadastrar}
                  >
                    Criar Projeto
                  </button>
                </StyledBtnGroup>
              </StyledFormGroup>
            </ModalComponent>
          )}

          <StyledTableList>
            <StyledContainerTable>
              <StyledFindItem>
                <p>Tabela de Projetos</p>
                <StyledSearch>
                  <input
                    type="text"
                    placeholder="Buscar Projetos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FiSearch />
                </StyledSearch>
              </StyledFindItem>

              <StyledTableItens>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Projetos</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projetos
                      ? projetos
                          .filter((projetos) =>
                            Object.values(projetos).some((value) =>
                              String(value)
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            )
                          )
                          .map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.nome}</td>
                              <td>
                                <StyledButtonArea>
                                  <StyledAddButton
                                    title="Criar Monitoramento"
                                    onClick={() => EditProject(item)}
                                  >
                                    +
                                  </StyledAddButton>
                                  <StyledDeleteButton
                                    title="Excluir Projeto"
                                    onClick={() => handleRemove(item.id)}
                                  >
                                    <TbTrashXFilled />
                                  </StyledDeleteButton>
                                </StyledButtonArea>
                              </td>
                            </tr>
                          ))
                      : ""}
                  </tbody>
                </table>
              </StyledTableItens>

              <StyledButtonOpen>
                <button title="Criar Projeto" onClick={handleOpenModal}>
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
export default Project;

//onClick={() => EditTeams(userData[index])}
