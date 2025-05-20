import styles from "./Modal.module.css";
import { useState } from "react";
import axios, {
  getCompleteHeader,
  getSimpleHeader,
  DAMA_URL,
} from "../axios/axiosLaravelConfig";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { PiBuildingsBold } from "react-icons/pi";
import Popup from "../Poupup";

const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();

function Modal() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  async function cadastrarCompany(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "api/register/organization",
        {
          nome,
          cnpj,
          estado,
          cidade,
          endereco,
          numero,
          cep,
          telefone,
          email,
        },
        {
          headers: COMPLETE_HEADER,
        }
      );
      ///console.log(response);
      setPopupMessage("Cadastro Concluído!");
      setPopupType("success");
      setShowPopup(true);

      await verificationDocumentacao();
    } catch (error) {
      console.log(error);
      await verificationDocumentacao();
    }
  }

  async function verificationDocumentacao() {
    try {
      const response = await axios.get(`${DAMA_URL}/api/organization/about`, {
        headers: COMPLETE_HEADER,
      });

      const companyId = response.data.id;

      console.log(
        `http://localhost:8080/api/verificaDocumentacao/prestadora/${companyId}`
      );
      const responseDocumentacao = await axios.get(
        `${DAMA_URL}/api/verificaDocumentacao/prestadora/${companyId}`,
        {
          headers: SIMPLE_HEADER,
        }
      );

      console.log(
        "estou entrando em documentação contratante" + responseDocumentacao
      );
      const responseDocumentacaoC = await axios.get(
        `${DAMA_URL}/api/verificaDocumentacao/contratante/${companyId}`,
        {
          headers: SIMPLE_HEADER,
        }
      );

      navigate("/home");
      console.log(responseDocumentacaoC);

      if (responseDocumentacaoC || responseDocumentacao) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.containerModal}>
      <button onClick={handleOpenModal} className={styles.btnAbrirModal}>
        {" "}
        <PiBuildingsBold />
        Cadastrar empresa
      </button>
      {modalOpen && (
        <div className={styles.modal}>
          {showPopup && <Popup message={popupMessage} type={popupType} />}
          <div className={styles.modalContent}>
            <div className={styles.closed}>
              <p>Vincular empresa </p>
              <button onClick={handleCloseModal}>
                <AiOutlineClose />
              </button>
            </div>

            <form className={styles.formControl} onSubmit={cadastrarCompany}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nome*"
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  placeholder="Cnpj*"
                  onChange={(e) => setCnpj(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  placeholder="Estado*"
                  onChange={(e) => setEstado(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  placeholder="Cidade*"
                  onChange={(e) => setCidade(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  placeholder="Endereço*"
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="numero"
                  name="numero"
                  placeholder="Número*"
                  onChange={(e) => setNumero(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  placeholder="cep*"
                  onChange={(e) => setCep(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  placeholder="Telefone*"
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email*"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.btnGroup}>
                <input
                  type="submit"
                  value="Cadastrar"
                  className={styles.btnCadastrar}
                ></input>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
