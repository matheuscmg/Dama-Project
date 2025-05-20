import styles from "./Modalinvite.module.css";
import { useState } from "react";
import axios, {
  getSimpleHeader,
  getCompleteHeader,
} from "../axios/axiosLaravelConfig";
import Popup from "../Poupup";
import BtnComponent from "../Button/BtnComponent";
import {
  StyledBtnGroup,
  StyledFormGroup,
  StyledUniqueInput,
} from "../../components/StyledComponents/FormGroup.style";

const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();

function Modalinvite() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

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
      //console.log(response.data);
      setShowPopup(true);
      setPopupMessage("Colaborador cadastrado com sucesso");
      setPopupType("success");
      setTimeout(() => {
        setShowPopup(false);

        window.location.reload();
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

  return (
    <StyledFormGroup>
      {showPopup && <Popup message={popupMessage} type={popupType} />}

      <p>Cadastrar Novo Colaborador</p>
      {showPopup && <Popup message={popupMessage} type={popupType} />}
      <StyledUniqueInput>
        <p>Nome</p>
        <input
          type="text"
          placeholder="Digite o nome..."
          onChange={(e) => setName(e.target.value)}
        />
      </StyledUniqueInput>
      <StyledUniqueInput>
        <p>Email do membro</p>
        <input
          type="email"
          placeholder="Digite o email...*"
          onChange={(e) => setEmail(e.target.value)}
        />
      </StyledUniqueInput>

      <StyledBtnGroup>
        <BtnComponent value="Cadastrar" onClick={cadastrarUsers}>
          Cadastrar
        </BtnComponent>
      </StyledBtnGroup>
    </StyledFormGroup>
  );
}

export default Modalinvite;
