import styles from "./DetalheAmostra.module.css";
import { useEffect, useState, useRef } from "react";
import axios, {
  getSimpleHeader,
  getCompleteHeader,
  DAMA_URL,
} from "../../../../components/axios/axiosLaravelConfig";
import Popup from "../../../../components/Poupup";
import ModalComponent from "../../../../components/Moldal/ModalComponent";
import BtnComponent from "../../../../components/Button/BtnComponent";
import { Navigate, useNavigate } from "react-router-dom";
import {
  StyledBtnGroup,
  StyledDoubleInput,
  StyledFirstInput,
  StyledFormGroup,
  StyledSecondInput,
} from "../../../../components/StyledComponents/FormGroup.style";
import { StyledButtonOpen } from "../../../../components/StyledComponents/TableList.style";
const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();
const ESPECIE_URL = `${DAMA_URL}/api/especie/search`;

function DetalheAmostra({ typeSpecie, addDetail }) {
  const [isExpand, setIsExpand] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const bioticaData = JSON.parse(sessionStorage.getItem("bioticaSelect"));
  const bioticaID = bioticaData?.bioticaSelect?.id;
  const navigate = useNavigate();

  const [ct, setCt] = useState("");
  const [cp, setCp] = useState("");
  const [pt, setPt] = useState("");
  const [ic, setIc] = useState("");

  // Variáveis para crustáceo
  const [lc, setLc] = useState("");
  const [cc, setCc] = useState("");
  const [ca, setCa] = useState("");

  // Variáveis comuns
  const [genero, setGenero] = useState("");
  const [emg, setEmg] = useState("");
  const [gre, setGre] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [detailItens, setDetailItens] = useState("");

  useEffect(() => {
    if (typeSpecie) {
      console.log(" form é peixe");
    } else {
      console.log(" form é crustaceo");
    }
  }, [typeSpecie]);

  function cadastrarDetalhe(e) {
    e.preventDefault();
    console.log("gre", gre);
    console.log(genero);
    console.log("emg", emg);
    console.log("pt", pt);
    console.log("gre", ct);
    console.log("gre", cp);
    console.log("id", bioticaID);

    axios
      .post(
        `${DAMA_URL}/api/biotica-detalhe-amostra`,
        {
          pt_g: pt,
          ct_mm: ct,
          cp_mm: cp,
          lc_mm: lc,
          cc_mm: cc,
          ca_mm: ca,
          genero,
          emg,
          gre,
          descrição: "",
          biotica_geral_id: bioticaID,
        },
        {
          headers: COMPLETE_HEADER,
        }
      )
      .then(function (response) {
        //console.log(response.data);

        setPopupMessage("Detalhe Cadastrado!");
        setPopupType("success");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 1800);

        setCt("");
        setCp("");
        setPt("");
        setIc("");
        setLc("");
        setCc("");
        setCa("");
        setGenero("");
        setEmg("");
        setGre("");

        addDetail(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsExpand(false);
    // window.location.reload();
  };

  

  return (
    <div className={styles.container}>
      {showPopup && <Popup message={popupMessage} type={popupType} />}
      <ModalComponent
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title="Adicione detalhes"
      >
        <StyledFormGroup onSubmit={cadastrarDetalhe}>
          <StyledDoubleInput>
            <StyledFirstInput>
              <p>Sexo</p>
              <select
                id="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                required
              >
                <option disabled value="">
                  Selecione o Gênero:
                </option>
                <option value="macho">Macho</option>
                <option value="femea">Fêmea</option>
              </select>
            </StyledFirstInput>
            <StyledSecondInput>
              <p title="Grau de Repleção Estomacal">gre</p>
              <input
                type="text"
                placeholder="225..."
                onChange={(e) => setGre(e.target.value)}
                value={gre}
              />
            </StyledSecondInput>
          </StyledDoubleInput>
          <StyledDoubleInput>
            <StyledFirstInput>
              <p title="Estágio de Maturação Gonadal">emg</p>
              <input
                type="text"
                placeholder="200..."
                onChange={(e) => setEmg(e.target.value)}
                value={emg}
              />
            </StyledFirstInput>

            <StyledSecondInput>
              <p title="Peso Total (g)">pt_g</p>
              <input
                type="text"
                placeholder="202..."
                onChange={(e) => setPt(e.target.value)}
                value={pt}
              />
            </StyledSecondInput>
          </StyledDoubleInput>

          {typeSpecie ? (
            // Formulário para peixe
            <>
              <StyledDoubleInput>
                <StyledFirstInput>
                  <p title="Comprimento total">ct_mm</p>
                  <input
                    type="text"
                    placeholder="204..."
                    onChange={(e) => setCt(e.target.value)}
                    value={ct}
                  />
                </StyledFirstInput>
                <StyledSecondInput>
                  <p title="Comprimento padrão">cp_mm</p>
                  <input
                    type="text"
                    placeholder="245..."
                    onChange={(e) => setCp(e.target.value)}
                    value={cp}
                  />
                </StyledSecondInput>
              </StyledDoubleInput>
            </>
          ) : (
            // Formulário para crustáceo
            <>
              <StyledDoubleInput>
                <StyledFirstInput>
                  <p title="Largura de carapaça">lc_mm</p>
                  <input
                    type="text"
                    placeholder="208..."
                    onChange={(e) => setLc(e.target.value)}
                    value={lc}
                  />
                </StyledFirstInput>
                <StyledSecondInput>
                  <p title="Comprimento da carapaça">cc_mm</p>
                  <input
                    type="text"
                    placeholder="265..."
                    onChange={(e) => setCc(e.target.value)}
                    value={cc}
                  />
                </StyledSecondInput>
              </StyledDoubleInput>
              <StyledDoubleInput>
                <StyledFirstInput>
                  <p title="Comprimento de abdômen">ca_mm</p>
                  <input
                    type="text"
                    placeholder="254..."
                    onChange={(e) => setCa(e.target.value)}
                    value={ca}
                  />
                </StyledFirstInput>
              </StyledDoubleInput>
            </>
          )}

          <StyledBtnGroup>
            <button type="submit">Adicionar Detalhe</button>
          </StyledBtnGroup>
        </StyledFormGroup>
        {/*
        <form onSubmit={cadastrarDetalhe} className={styles.formContainer}>
          <div className={styles.detail}>
            <div className={styles.detailItens}>
              <div className={styles.groupDetail}>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                  <p>Sexo</p>
                    <select
                      id="genero"
                      value={genero}
                      onChange={(e) => setGenero(e.target.value)}
                      required
                    >
                      <option disabled value="">
                        Selecione o Gênero:
                      </option>
                      <option value="macho">Macho</option>
                      <option value="femea">Fêmea</option>
                    </select>
                  </div>
                  <div className={styles.detailItem}>
                    <p title="Grau de Repleção Estomacal">gre</p>
                    <input
                      type="text"
                      placeholder="225..."
                      onChange={(e) => setGre(e.target.value)}
                      value={gre}
                    />
                  </div>
                  <div className={styles.detailItem}>
                    <p title="Estágio de Maturação Gonadal">emg</p>
                    <input
                      type="text"
                      placeholder="200..."
                      onChange={(e) => setEmg(e.target.value)}
                      value={emg}
                    />
                  </div>
                  <div className={styles.detailItem}>
                    <p title="Peso Total (g)">pt_g</p>
                    <input
                      type="text"
                      placeholder="202..."
                      onChange={(e) => setPt(e.target.value)}
                      value={pt}
                    />
                  </div>

                  {typeSpecie ? (
                    // Formulário para peixe
                    <>
                      <div className={styles.detailItem}>
                        <p title="Comprimento total">ct_mm</p>
                        <input
                          type="text"
                          placeholder="204..."
                          onChange={(e) => setCt(e.target.value)}
                          value={ct}
                        />
                      </div>
                      <div className={styles.detailItem}>
                        <p title="Comprimento padrão">cp_mm</p>
                        <input
                          type="text"
                          placeholder="245..."
                          onChange={(e) => setCp(e.target.value)}
                          value={cp}
                        />
                      </div>
                    </>
                  ) : (
                    // Formulário para crustáceo
                    <>
                      <div className={styles.detailItem}>
                        <p title="Largura de carapaça">lc_mm</p>
                        <input
                          type="text"
                          placeholder="208..."
                          onChange={(e) => setLc(e.target.value)}
                          value={lc}
                        />
                      </div>
                      <div className={styles.detailItem}>
                        <p title="Comprimento da carapaça">cc_mm</p>
                        <input
                          type="text"
                          placeholder="265..."
                          onChange={(e) => setCc(e.target.value)}
                          value={cc}
                        />
                      </div>
                      <div className={styles.detailItem}>
                        <p title="Comprimento do abdômen">ca_mm</p>
                        <input
                          type="text"
                          placeholder="254..."
                          onChange={(e) => setCa(e.target.value)}
                          value={ca}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btnGroup}>
            <button type="submit" className={styles.btnCadastrar}>
              Adicionar Detalhe
            </button>
          </div>
        </form> */}
      </ModalComponent>

      <StyledButtonOpen>
        <button onClick={handleOpenModal}>+</button>
      </StyledButtonOpen>
    </div>
  );
}

export default DetalheAmostra;
