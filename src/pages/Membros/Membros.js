import Navscreen from "../../components/homepage/Navscreen";
import styles from "./Membros.module.css";
import Usernav from "../../components/homepage/Usernav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, {
  getCompleteHeader,
  getSimpleHeader,
  DAMA_URL,
} from "../../components/axios/axiosLaravelConfig";
import { FiSearch } from "react-icons/fi";
import Popup from "../../components/Poupup";
import localImagem from "../../assets/local.png";
import ModalComponent from "../../components/Moldal/ModalComponent";
import Header from "../../components/Header/index2";
import {
  StyledBtnGroup,
  StyledFormGroup,
  StyledUniqueInput,
} from "../../components/StyledComponents/FormGroup.style";
import {
  StyledButtonOpen,
  StyledContainerTable,
  StyledFindItem,
  StyledSearch,
  StyledTableItens,
  StyledTableList,
} from "../../components/StyledComponents/TableList.style";

const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();

function Membros() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");


  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  useEffect(() => {
    axios
      .get(`${DAMA_URL}/api/user`, {
        headers: COMPLETE_HEADER,
      })
      .then((response) => {
        setUserData(response.data);
       // ////console.log(response.data);););
      })
      .catch((error) => {
        console.error(error);
      });
  }, [showPopup]);

  async function cadastrarUsers(e) {
    e.preventDefault();
    console.log(name);
    const role = "user";

    try {
      const response = await axios.post(
        "api/user",
        {
          name,
          email,
          role,
        },
        {
          headers: COMPLETE_HEADER,
        }
      );
      ////console.log(response.data);););
      setShowPopup(true);
      setPopupMessage("Colaborador cadastrado com sucesso");
      setPopupType("success");
      setEmail("");
      setName("");
      setTimeout(() => {
        setShowPopup(false);
      }, 1500);

      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          "Ocorreu um erro ao processar a requisição";
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error("Não foi possível conectar ao servidor");
      } else {
        throw new Error("Ocorreu um erro desconhecido");
      }
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

  return (
    <div className={styles.container}>
      <Navscreen />

      <div className={styles.containerinfo}>
        <Usernav pageBack={true} />
        {showPopup && <Popup message={popupMessage} type={popupType} />}

        <div className={styles.header}>
          <Header
            titulo="Colaboradores"
            texto="Convide seus colaboradores a se juntarem ao Dama"
            imagem={localImagem}
          />
        </div>

        <div className={styles.textContainer}>
          {modalOpen && (
            <ModalComponent
              isOpen={modalOpen}
              onClose={handleCloseModal}
              title={"Convidar Membros"}
            >
              <StyledFormGroup onSubmit={cadastrarUsers}>
                <StyledUniqueInput>
                  <p>Nome</p>
                  <input
                    type="text"
                    placeholder="Digite o nome..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </StyledUniqueInput>
                <StyledUniqueInput>
                  <p>Email</p>
                  <input
                    type="email"
                    placeholder="Digite o email...*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </StyledUniqueInput>

                <StyledBtnGroup>
                  <button
                    type="submit"
                    value="Cadastrar"
                    className={styles.btnCadastrar}
                  >
                    Adicionar membro
                  </button>
                </StyledBtnGroup>
              </StyledFormGroup>
            </ModalComponent>
          )}

          <StyledTableList>
            <StyledContainerTable>
              <StyledFindItem>
                <p>Tabela de Colaboradores</p>
                <StyledSearch>
                  <input
                    type="text"
                    placeholder="Buscar colaborador..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FiSearch/>
                </StyledSearch>
              </StyledFindItem>

                <StyledTableItens>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData ? (
                      userData
                        .filter((userData) =>
                          Object.values(userData).some((value) =>
                            String(value)
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                        )
                        .map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td title={user.name}>{user.name}</td>
                            <td title={user.email}>{user.email}</td>                            
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
                    className={styles.buttonVisible}
                    onClick={handleOpenModal}
                    title="Cadastrar Colaboradores"
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
export default Membros;
