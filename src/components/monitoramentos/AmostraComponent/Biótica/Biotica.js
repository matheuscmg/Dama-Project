import styles from "./Biotica.module.css";
import { useState, useEffect, useRef } from "react";
import axios, {
  DAMA_URL,
  getCompleteHeader,
  getSimpleHeader,
} from "../../../axios/axiosLaravelConfig";
import ModalComponent from "../../../Moldal/ModalComponent";
import EspecieComponent from "../../../Especie/EspecieComponent";
import Popup from "../../../Poupup";

import {
  StyledBtnGroup,
  StyledDoubleInput,
  StyledFirstInput,
  StyledFormGroup,
  StyledSecondInput,
  StyledUniqueInput,
} from "../../../StyledComponents/FormGroup.style";

const ESPECIE_URL = `${DAMA_URL}/api/especie`;
const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();

function Biotica({ updateTrigger, setUpdateTrigger }) {
  const [idEspecie, setIdEspecie] = useState("");
  const [especieData, setEspecieData] = useState([]);
  const [peso, setPeso] = useState("");
  const [isExpand, setIsExpand] = useState(false);

  const especieStorage = JSON.parse(sessionStorage.getItem("especieData"));
  const [quantidade, setQuantidade] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);
  const [showEspecieComponent, setShowEspecieComponent] = useState(false);
  const coleta_id = JSON.parse(sessionStorage.getItem("coletaData"));

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  const especiesFiltradas = especieData.filter((especie) =>
    especie.species.toLowerCase().includes(filtroEspecie.toLowerCase())
  );

  useEffect(() => {
    if (especieStorage) {
      setEspecieData(especieStorage);
    } else {
      axios
        .get(ESPECIE_URL, {
          headers: SIMPLE_HEADER,
        })
        .then(function (response) {
          ////console.log(response.data);
          setEspecieData(response.data);
          const data = JSON.stringify(response.data);
          sessionStorage.setItem("especieData", data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  function cadastrarBiotica() {
    if (!especieStorage.find((item) => item.species === filtroEspecie)) {
      return;
    }
    console.log("especie filtradas:", filtroEspecie);
    console.log("peso:", peso);
    console.log("peso qtd:", filtroEspecie);
    console.log("id da coleta", coleta_id);
    console.log("id da especie", idEspecie);

    axios
      .post(
        `${DAMA_URL}/api/biotica-geral-amostra`,
        {
          quantidade,
          quantidade_unidade: "qty",
          peso,
          peso_unidade: "g",
          descricao: "sem descrição",
          coleta_id,
          especie_id: idEspecie,
        },
        {
          headers: COMPLETE_HEADER,
        }
      )
      .then(function (response) {
        ////console.log(response.data);
        setUpdateTrigger((prevState) => !prevState);

        setShowPopup(true);
        setPopupMessage("Espécie Adicionada");
        setPopupType("success");
        setTimeout(() => {
          setShowPopup(false);
        }, 1500);

        setQuantidade("");
        setFiltroEspecie("");
        setPeso("");
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const handleExpand = () => {
    if (isExpand) {
      setIsExpand(false);
    } else {
      setIsExpand(true);
    }
  };

  function handleToEspecie() {
    setShowEspecieComponent(true);
    setIsDropdownVisible(false);
  }
  const handleEspecieCadastro = () => {
    axios
      .get(ESPECIE_URL, {
        headers: SIMPLE_HEADER,
      })
      .then(function (response) {
        setEspecieData(response.data);
        const data = JSON.stringify(response.data);
        sessionStorage.setItem("especieData", data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
        <StyledFormGroup>
        {showPopup && <Popup message={popupMessage} type={popupType} />}
          <StyledUniqueInput ref={inputRef}>
            <p>
              Espécie <span onClick={handleToEspecie}>Adicionar especie</span>
            </p>
            {showEspecieComponent && (
              <EspecieComponent
                isOpen={showEspecieComponent}
                onClose={() => setShowEspecieComponent(false)}
                onEspecieCadastro={handleEspecieCadastro}
              />
            )}
            <input
              type="text"
              placeholder="Digite para filtrar espécies"
              value={filtroEspecie}
              onChange={(e) => setFiltroEspecie(e.target.value)}
              onClick={() => setIsDropdownVisible(true)}
            />

            <ul style={{ display: isDropdownVisible ? "block" : "none" }}>
              {especiesFiltradas.map((especie) => (
                <li
                  key={especie.id}
                  onClick={() => {
                    setFiltroEspecie(especie.species);
                    setIdEspecie(especie.id);
                    setIsDropdownVisible(false);
                  }}
                >
                  {especie.species}
                </li>
              ))}
            </ul>
          </StyledUniqueInput>

          <StyledDoubleInput>
            <StyledFirstInput>
              <p>Quantidade</p>
              <input
                type="text"
                placeholder="10"
                onChange={(e) => setQuantidade(e.target.value)}
                value={quantidade}
              />
            </StyledFirstInput>

            <StyledSecondInput>
              <p>Peso (g)</p>
              <input
                type="text"
                placeholder="800"
                onChange={(e) => setPeso(e.target.value)}
                value={peso}
              />
            </StyledSecondInput>
          </StyledDoubleInput>
          <StyledBtnGroup>
            <button
              type="button"
              value="Cadastrar"
              
              onClick={cadastrarBiotica}
            >
              Criar Biotica
            </button>
            </StyledBtnGroup>
        </StyledFormGroup>    
  );
}
export default Biotica;
