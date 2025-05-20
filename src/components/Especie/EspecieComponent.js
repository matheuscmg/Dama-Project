import ModalComponent from "../Moldal/ModalComponent";
import BtnComponent from "../Button/BtnComponent";
import Popup from "../Poupup";
import styles from "./EspecieComponent.module.css";
import { useEffect, useState } from "react";
import axios, {
  getSimpleHeader,
  getCompleteHeader,
  DAMA_URL,
} from "../axios/axiosLaravelConfig";
import { StyledButtonOpen, StyledTableItens } from "../StyledComponents/TableList.style";
import {
  StyledBtnGroup,
  StyledFormGroup,
  StyledUniqueInput,
  StyledUniqueSelect,
} from "../StyledComponents/FormGroup.style";
const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();
const ESPECIE_URL = `${DAMA_URL}/api/especie/search`;
const CADASTRO_ESPECIE_URL = `${DAMA_URL}/api/especie`;

function EspecieComponent({ isOpen, onClose, onEspecieCadastro }) {
  const [especiesSelecionadas, setEspeciesSelecionadas] = useState([]);
  const [reinoSelecionado, setReinoSelecionado] = useState("");
  const [especie, setEspecie] = useState("");
  const [especieEncontradas, setEspecieEncontradas] = useState({});
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  const reinos = [
    { id: 1, nome: "Bacteria" },
    { id: 2, nome: "Protozoa" },
    { id: 3, nome: "Plantae" },
    { id: 4, nome: "Fungi" },
    { id: 5, nome: "Animalia" },
    { id: 6, nome: "Chromista" },
    { id: 7, nome: "Archaea" },
  ];

  function cadastrarEspecies(especies) {
    console.log("#11111",especies.species)
    axios
      .post(
        CADASTRO_ESPECIE_URL,
        {
          tsn: especies.tsn,
          species: especies.species,
          subgenus: especies.subgenus,
          genus: especies.genus,
          subtribe: especies.subtribe,
          tribe: especies.tribe,
          subfamily: especies.subfamily,
          family: especies.family,
          superfamily: especies.superfamily,
          subsection: especies.subsection,
          section: especies.section,
          infraorder: especies.infraorder,
          suborder: especies.suborder,
          order: especies.order,
          superorder: especies.superorder,
          infraclass: especies.infraclass,
          subclass: especies.subclass,
          class: especies.class,
          superclass: especies.superclass,
          infraphylum: especies.infraphylum,
          subphylum: especies.subphylum,
          phylum: especies.phylum,
          superphylum: especies.superphylum,
          infrakingdom: especies.infrakingdom,
          subkingdom: especies.subkingdom,
          kingdom: especies.kingdom,
          organizacao_id: especies.organizacao_id,
          updated_at: especies.updated_at,
          created_at: especies.created_at,
          id: especies.id,
        },
        {
          headers: COMPLETE_HEADER,
        }
      )
      .then(function (response) {
        //console.log(response.data);
        console.log('espeeecieee', especies.Species)
        if (response.data.tsn == "The tsn has already been taken.") {
          setPopupMessage(`Espécie ${especies.Species} já Cadastrada!`);
          setPopupType("error");
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 1500);
        }
        //setEspeciesSelecionadas([]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function buscarEspecie() {
    console.log(especie);
    console.log(reinoSelecionado);

    setLoading(true);

    axios
      .post(
        ESPECIE_URL,
        {
          especie,
          n_usage: "valid",
          kingdom_id: reinoSelecionado,
          strict: 1,
          fast: 1,
        },
        {
          headers: COMPLETE_HEADER,
        }
      )
      .then(function (response) {
        //console.log(response);
        console.log("resultado do data::", response.data);

        setEspecieEncontradas(response.data);
        setLoading(false);
        if (response.data.length != 0) {
          setShowData(true);
        } else {
          setPopupMessage("Espécies não encontradas!");
          setPopupType("error");
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function cadastrarEspeciesSelecionadas() {
    const selectedSpecies = especieEncontradas.filter(
      (_, index) => especiesSelecionadas[index]
    );

    if (selectedSpecies.length === 0) {
      setPopupMessage("Selecione uma especie");
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return;
    }
    
    for (const species of selectedSpecies) {
      console.log("especie:::",species.species)
      await cadastrarEspecies(species);
    }
    //cadastrarEspecie();

    setPopupMessage("Espécies Cadastradas");
    setPopupType("success");
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      //setShowData(false);
    }, 2000);

    setEspeciesSelecionadas([]);
  }

  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
    window.location.reload();
  };

  function handleCheckboxChange(index) {
    const selectedSpecies = [...especiesSelecionadas];
    selectedSpecies[index] = !selectedSpecies[index];
    setEspeciesSelecionadas(selectedSpecies);
  }


  return (
    <ModalComponent
      isOpen={isOpen || modalOpen}
      onClose={onClose || handleCloseModal}
      title="Criar Espécie"
    >
      {showPopup && <Popup message={popupMessage} type={popupType} />}

      <StyledFormGroup onSubmit={buscarEspecie}>
        <StyledUniqueSelect>
          <p>Nome do Reino</p>
          <select
            id="Reino"
            name="Reino"
            value={reinoSelecionado}
            onChange={(e) => setReinoSelecionado(e.target.value)}
            required
          >
            <option disabled value="">
              Selecione um Reino:
            </option>
            {reinos.map((reino) => (
              <option key={reino.id} value={reino.id}>
                {reino.nome}
              </option>
            ))}
          </select>
        </StyledUniqueSelect>
        <StyledUniqueInput>
          <p>Especie</p>
          <input
            type="text"
            placeholder="Peixe ..."
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            required
          />
        </StyledUniqueInput>
        <StyledBtnGroup>
          <button
            type="button"
            value="Cadastrar"
            className={styles.btnCadastrar}
            onClick={() => {
              if (reinoSelecionado && especie) {
                buscarEspecie();
              } else {
                setPopupMessage("Preencha todos os campos");
                setPopupType("error");
                setShowPopup(true);
                setTimeout(() => {
                  setShowPopup(false);
                }, 2000);
              }
            }}
          >
            Buscar Espécie
          </button>
        </StyledBtnGroup>
        <div className={styles.listaEspecie}>
          {loading ? (
            <div className={styles.loadingFull}>
              <p className={styles.loadingText}>Carregando</p>
            </div>
          ) : showData ? (
            <>
                <StyledTableItens>
                  <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Espécie</th>
                      <th>Genus</th>
                      <th>Classe</th>
                      {/*<th>Família</th>*/}
                      <th className={styles.checkbox}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(especieEncontradas) &&
                      especieEncontradas.map((especieData, index) => (
                        <tr className={styles.list} key={index}>
                          <td>{index+1}</td>
                          <td>{especieData.complete_name}</td>
                          <td>{especieData.genus}</td>
                          <td>{especieData.class}</td>
                          {/*<td>{especieData.family}</td>*/}
                          <td title={especieData.especies}>
                            <input
                              type="checkbox"
                              onChange={() => handleCheckboxChange(index)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                </StyledTableItens>
              <div className={styles.btnGroupCadastro}>
                <button
                  type="button"
                  value="Cadastrar"
                  className={styles.btnCadastrar}
                  onClick={cadastrarEspeciesSelecionadas}
                >
                  Adicionar
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </StyledFormGroup>
    </ModalComponent>
  );
}

export default EspecieComponent;
