import styles from "./Equipe.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, {
  getCompleteHeader,
  getSimpleHeader,
  DAMA_URL,
} from "../../components/axios/axiosLaravelConfig";
import { FiSearch } from "react-icons/fi";

import Popup from "../../components/Poupup";
import localImagem from "../../assets/services.png";
import Navscreen from "../../components/homepage/Navscreen";
import Usernav from "../../components/homepage/Usernav";
import Header from "../../components/Header/index2";
import ModalComponent from "../../components/Moldal/ModalComponent";
import { TbTrashXFilled } from "react-icons/tb";
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

const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();

function Equipe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [nome, setNome] = useState("");
  const [dataEquipe, setDataEquipe] = useState("");
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  useEffect(() => {
    axios
      .get(`${DAMA_URL}/api/equip`, {
        headers: SIMPLE_HEADER,
      })
      .then((response) => {
        ///console.log(response);
        setDataEquipe(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function cadastrarEquipe() {
    axios
      .post(
        `${DAMA_URL}/api/equip`,
        {
          nome,
        },
        {
          headers: COMPLETE_HEADER,
        }
      )
      .then(function (response) {
        ///console.log(response);
        setShowPopup(true);
        setPopupMessage("Equipe Criada!");
        setPopupType("success");
        setNome("");

        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
        setDataEquipe((prevDataEquipe) => [...prevDataEquipe, response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function removeEquipe(id) {
    const removeRoute = `${DAMA_URL}/api/equip/${id}`;

    try {
      await axios.delete(removeRoute, {
        headers: SIMPLE_HEADER,
      });
      setDataEquipe((prevEquipe) =>
        prevEquipe.filter((item) => item.id !== id)
      );
      setPopupMessage("Equipe Deletada");
      setPopupType("success");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
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

  function handleToAddTeams(item) {
    const dataequipe = {
      id: item.id,
      nome: item.nome,
    };
    sessionStorage.setItem("dataequipe", JSON.stringify(dataequipe));
    console.log(item);
    navigate("/equipe-membros");
  }
  return (
    <div className={styles.container}>
      <Navscreen />

      <div className={styles.containerinfo}>
        <Usernav pageBack={true} />
        {showPopup && <Popup message={popupMessage} type={popupType} />}

        <div className={styles.header}>
          <Header
            titulo="Equipes"
            texto="Unifique seus talentos em um só lugar."
            imagem={localImagem}
          />
        </div>

        <div className={styles.textContainer}>
          {modalOpen && (
            <ModalComponent
              isOpen={modalOpen}
              onClose={handleCloseModal}
              title={"Criar Equipe"}
            >
              <StyledFormGroup>
                <StyledUniqueInput>
                  <p>Nome da equipe</p>
                  <input
                    type="text"
                    placeholder="Equipe dama.."
                    onChange={(e) => setNome(e.target.value)}
                    value={nome}
                  />
                </StyledUniqueInput>

                <StyledBtnGroup>
                  <button
                    type="button"
                    value="Cadastrar"
                    className={styles.btnCadastrar}
                    onClick={cadastrarEquipe}
                  >
                    Criar Equipe
                  </button>
                </StyledBtnGroup>
              </StyledFormGroup>
            </ModalComponent>
          )}

          <StyledTableList>
            <StyledContainerTable>
              <StyledFindItem>
                <p>Tabela de Equipes</p>
                <StyledSearch>
                  <input
                    type="text"
                    placeholder="Buscar equipe..."
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
                      <th>Nome</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataEquipe ? (
                      dataEquipe
                        .filter((dataEquipe) =>
                          Object.values(dataEquipe).some((value) =>
                            String(value)
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                        )
                        .map((item, index) => (
                          <tr className={styles.infoEquipe} key={item.id}>
                            <td title={index}>{index + 1}</td>
                            <td title={item.nome}>{item.nome}</td>

                            <td>
                              <StyledButtonArea>
                                <StyledAddButton
                                  title="Adicionar membros"
                                  onClick={() => handleToAddTeams(item)}
                                >
                                  +
                                </StyledAddButton>

                                <StyledDeleteButton
                                  title="Excluir Equipe"
                                  onClick={() => removeEquipe(item.id)}
                                >
                                  <TbTrashXFilled/>
                                </StyledDeleteButton>
                              </StyledButtonArea>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="5">Carregando...</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </StyledTableItens>

              <StyledButtonOpen>
                <button
                  value="Criar Equipe"
                  title="Criar Equipe"
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
export default Equipe;
