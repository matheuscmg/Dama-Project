import styles from "./EditEquipe.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, {
  getCompleteHeader,
  getSimpleHeader,
  DAMA_URL,
} from "../../components/axios/axiosLaravelConfig";
import { FiSearch } from "react-icons/fi";
import { TbTrashXFilled } from "react-icons/tb";
import Popup from "../../components/Poupup";
import localImagem from "../../assets/services.png";
import Navscreen from "../../components/homepage/Navscreen";
import Usernav from "../../components/homepage/Usernav";
import Header from "../../components/Header/index2";
import ModalComponent from "../../components/Moldal/ModalComponent";
import BtnComponent from "../../components/Button/BtnComponent";
import {
  StyledBtnGroup,
  StyledFormGroup,
} from "../../components/StyledComponents/FormGroup.style";
import {
  StyledButtonOpen,
  StyledContainerTable,
  StyledFindItem,
  StyledSearch,
  StyledTableItens,
  StyledTableList,
  StyledUniqueDeleteButton,
} from "../../components/StyledComponents/TableList.style";

const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();

function EditEquipe() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [equipeData, setEquipeData] = useState("");
  const [membros, setMembros] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [memberAdd, setMemberAdd] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  useEffect(() => {
    const equipeSelect = JSON.parse(sessionStorage.getItem("dataequipe"));
    setEquipeData(equipeSelect);
    //console.log("dataequipe", equipeSelect);
    if (!equipeSelect) {
      navigate("/equipe");
    } else {
      axios
        .get(`${DAMA_URL}/api/equip-member-filter/${equipeSelect.id}`, {
          headers: SIMPLE_HEADER,
        })
        .then((response) => {
          ////console.log(response.data);
          setMembros(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate, memberAdd]);

  useEffect(() => {
    axios
      .get(`${DAMA_URL}/api/user`, {
        headers: SIMPLE_HEADER,
      })
      .then((response) => {
       // //console.log(response.data);
        setUsersData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function cadastrarEquipeMember(idMembro) {
    //console.log('estou aqui', idMembro)
    axios
      .post(
        `${DAMA_URL}/api/equip-member`,
        {
          organizacao_equipe_id: equipeData.id,
          organizacao_colaborador_id: idMembro,
        },
        {
          headers: COMPLETE_HEADER,
        }
      )
      .then(function (response) {
        ///console.log(response););
        //setMembros(prevMembros => [...prevMembros, response.data]);

        // Remover o usuário recém-adicionado de filteredUsers
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.filter((user) => user.id !== idMembro)
        );

        setMemberAdd(true);

        setMembros((prevMembro) => [...prevMembro, response.data]);
        setShowPopup(true);
        setPopupMessage("Membro adicionado!");
        setPopupType("success");
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function removeEquipeMember(id) {
    const removeRoute = `${DAMA_URL}/api/equip-member/${id}`;

    try {
      await axios.delete(removeRoute, {
        headers: SIMPLE_HEADER,
      });
      setMembros((prevMonitoramentos) =>
        prevMonitoramentos.filter((item) => item.id !== id)
      );
      setPopupMessage("Membro Deletado");
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
    if (filteredUsers.length === 0) {
      setPopupMessage("Membros já adicionados");
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else {
      // Existem membros disponíveis, abra o modal
      setModalOpen(true);
     /* setTimeout(() => {
        setShowPopup(false);
      }, 3000);*/
    }
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    //window.location.reload();
  };

  const adicionarMembros = () => {
    selectedMembers.forEach((idMembro) => {
      setTimeout(() => {
        cadastrarEquipeMember(idMembro);
      }, 500);
     
    });
    
    if (selectedMembers.length <= filteredUsers.length) {
      setModalOpen(false);
    }
  };

  const handleCheckboxChange = (e, memberId) => {
    if (e.target.checked) {
      setSelectedMembers((prev) => [...prev, memberId]);
    } else {
      setSelectedMembers((prev) => prev.filter((id) => id !== memberId));
    }
  };

  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const newFilteredUsers = usersData.filter(
      (user) =>
        !membros.some((member) => member.organizacao_colaborador_id === user.id)
    );
    setFilteredUsers(newFilteredUsers);
  }, [usersData, membros]);

  return (
    <div className={styles.container}>
      <Navscreen />

      <div className={styles.containerinfo}>
        <Usernav pageBack={true} />
        {showPopup && <Popup message={popupMessage} type={popupType} />}

        <div className={styles.header}>
          <Header
            titulo="Membros"
            texto="Membros da equipe DAMA"
            referencia={equipeData.nome}
            description={"Adicione membros a"}
            imagem={localImagem}
          />
        </div>

        <div className={styles.textContainer}>
          {modalOpen && (
            <ModalComponent
              isOpen={modalOpen}
              onClose={handleCloseModal}
              title={"Adicione a equipe"}
            >
              {filteredUsers.length != 0 ? (
                <StyledFormGroup>
                  <div className={styles.StyledTableItens}>
                    <table>
                      <thead className={styles.stickyHeader}>
                        <tr>
                          <th>#</th>
                          <th>nome</th>
                          <th>email</th>
                          <th>Adicionar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(usersData) &&
                          filteredUsers.map((item, index) => (
                            <tr className={styles.list} key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>
                                <input
                                  type="checkbox"
                                  value={item.id}
                                  onChange={(e) =>
                                    handleCheckboxChange(e, item.id)
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <StyledBtnGroup>
                    <button
                      type="button"
                      className={styles.btnCadastrar}
                      onClick={adicionarMembros}
                    >
                      Adicionar Membros
                    </button>
                  </StyledBtnGroup>
                </StyledFormGroup>
              ) : (
                <></>
              )}
              
            </ModalComponent>
          )}

          <StyledTableList>
            <StyledContainerTable>
              <StyledFindItem>
                <p>Tabela de membros</p>
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
                    {membros && membros.length > 0 ? (
                      membros
                        .filter(
                          (item) => item && item.organizacao_colaborador_nome
                        ) // Certifique-se de que item e nome estão definidos
                        .filter((item) =>
                          item.organizacao_colaborador_nome
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.organizacao_colaborador_nome}</td>
                            <td>
                              <StyledUniqueDeleteButton
                                onClick={() => removeEquipeMember(item.id)}
                                title="Excluir da Equipe"
                              >
                                <TbTrashXFilled />
                              </StyledUniqueDeleteButton>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="3">
                          Nenhum membro encontrado ou carregando...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </StyledTableItens>

              <StyledButtonOpen>
                <button onClick={handleOpenModal}>+</button>
              </StyledButtonOpen>
            </StyledContainerTable>
          </StyledTableList>
        </div>
      </div>
    </div>
  );
}
export default EditEquipe;
