import styles from "./Abiotica.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, {
  DAMA_URL,
  getCompleteHeader,
  getSimpleHeader,
} from "../../../axios/axiosLaravelConfig";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../../Moldal/ModalComponent";
import { IoMdAdd } from "react-icons/io";
import {
  StyledBtnGroup,
  StyledDoubleInput,
  StyledFirstInput,
  StyledFormGroup,
  StyledSecondInput,
} from "../../../StyledComponents/FormGroup.style";

const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();

function Abiotica() {
  const [temperatura, setTemperatura] = useState("");
  const [salinidade, setSalinidade] = useState("");
  const [oxigenio, setOxigenio] = useState("");
  const coleta_id = sessionStorage.getItem("coletaData");

  function cadastrarAbiotica() {
    console.log("temperatura::", temperatura);
    console.log("salinidade::", salinidade);
    console.log("oxigenio::", oxigenio);
    console.log("coletaid", coleta_id);

    axios
      .post(
        `${DAMA_URL}/api/abiotica-geral-amostra`,
        {
          temperatura,
          salinidade,
          oxigenio,
          descricao: "sem descrição",
          coleta_id,
        },
        {
          headers: COMPLETE_HEADER,
        }
      )
      .then(function (response) {
        ///console.log(response););
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (    
          <StyledFormGroup>
            <StyledDoubleInput>
              <StyledFirstInput>
                <p>Tipo de amostra</p>
                <input
                  type="text"
                  value="Abiótica"
                  className={styles.inputColor}
                />
              </StyledFirstInput>

              <StyledSecondInput>
                <p>Temperatura (°C)</p>
                <input
                  type="text"
                  placeholder="35°C"
                  onChange={(e) => setTemperatura(e.target.value)}
                />
              </StyledSecondInput>
            </StyledDoubleInput>

            <StyledDoubleInput>
              <StyledFirstInput>
                <p>Salinidade (mg/l)</p>
                <input
                  type="text"
                  placeholder="900mg"
                  onChange={(e) => setSalinidade(e.target.value)}
                />
              </StyledFirstInput>
              <StyledSecondInput>
                <p>Oxigenio (%)</p>
                <input
                  type="text"
                  placeholder="30%"
                  onChange={(e) => setOxigenio(e.target.value)}
                />
              </StyledSecondInput>
            </StyledDoubleInput>
            <StyledBtnGroup>
            <button
              type="button"
              value="Cadastrar"
              className={styles.btnCadastrar}
              onClick={cadastrarAbiotica}
            >
              Criar Abiotica
            </button>
            </StyledBtnGroup>
          </StyledFormGroup>
        
  );
}
export default Abiotica;

/*

<div className={styles.textContainer}>
      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.closed}>
              <button onClick={handleCloseModal}>
                {/*<AiOutlineClose />*/
/*}X
              </button>
            </div>
            <form className={styles.formGroup}>
              <div className={styles.local}>
                <div className={styles.especie}>
                  <p>Nome da Abiotica:</p>
                  <input
                    type="text"
                    id="local"
                    name="local"
                    placeholder="Lago norte..."
                    value={especie}
                    onChange={(e) => setEspecie(e.target.value)}
                  />
                </div>

                <div className={styles.especie}>
                  <p>Oxigênio(%)</p>
                  <input
                    type="text"
                    id="local"
                    name="local"
                    placeholder="21%"
                    value={especie}
                    onChange={(e) => setEspecie(e.target.value)}
                  />
                </div>

                <div className={styles.especie}>
                  <p>Salinidade(ppm):</p>
                  <input
                    type="text"
                    id="local"
                    name="local"
                    placeholder="35.000 ppm"
                    value={especie}
                    onChange={(e) => setEspecie(e.target.value)}
                  />
                </div>

                <div className={styles.especie}>
                  <label htmlFor="">Temperatura (°C):</label>
                  <input
                    type="text"
                    id="local"
                    name="local"
                    placeholder="26°C"
                    value={especie ? especie : ""}
                    onChange={(e) => setEspecie(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.obs}>
                <label htmlFor="">Observação:</label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  onChange={(e) => setObs(e.target.value)}
                />
              </div>
              <div className={styles.btnGroup}>
                <button
                  type="button"
                  value="Cadastrar"
                  className={styles.btnCadastrar}
                  onClick={cadastrarAbiotica}
                >
                  Criar Abiotica
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className={styles.btnGroup}>
        <BtnComponent value="Criar Abiótica" onClick={handleOpenModal}>
          Criar Abiótica
        </BtnComponent>
      </div>
    </div>
*/
