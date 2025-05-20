import styles from "./Detalhe.module.css";
import { useEffect, useState, useRef } from "react";
import axios, {
  getSimpleHeader,
  getCompleteHeader,
  DAMA_URL,
} from "../../../../components/axios/axiosLaravelConfig";
import { FiSearch } from "react-icons/fi";
import { TbTrashXFilled } from "react-icons/tb";
import Navscreen from "../../../../components/homepage/Navscreen";
import Usernav from "../../../../components/homepage/Usernav";
import Popup from "../../../../components/Poupup";
import Header from "../../../../components/Header";
import localImagem from "../../../../assets/iai.png";

import DetalheAmostra from "./DetalheAmostra";
import {
  StyledButtonArea,
  StyledContainerTable,
  StyledDeleteButton,
  StyledFindItem,
  StyledSearch,
  StyledTableItens,
  StyledTableList,
  StyledUniqueDeleteButton,
} from "../../../../components/StyledComponents/TableList.style";
const AMOSTRA_LIST = `${DAMA_URL}/api/biotica-detalhe-amostra/biotica-geral-amostra/`;
const AMOSTRA_GERAL = `${DAMA_URL}/api/biotica-detalhe-amostra/`;

const SIMPLE_HEADER = getSimpleHeader();
const COMPLETE_HEADER = getCompleteHeader();

function Detalhe() {
  const [searchTerm, setSearchTerm] = useState("");
  const typeFish = ["Actinopterygii", "Chondrichthyes"];
  const typeCrustacean = ["Crustacea"];
  const [isFish, setIsFish] = useState(false);
  const [isCrustacea, setIsCrustacea] = useState(false);

  const bioticaData = JSON.parse(sessionStorage.getItem("bioticaSelect"));

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [detailItens, setDetailItens] = useState("");

  const bioticaID = bioticaData?.bioticaSelect?.id;
  console.log("dados da especie::::", bioticaData);

  const superClass = bioticaData?.bioticaSelect?.especie?.superclass;
  const subPhylum = bioticaData?.bioticaSelect?.especie?.subphylum;
  const especie = bioticaData?.bioticaSelect?.especie?.species;

  useEffect(() => {
    axios
      .get(`${AMOSTRA_LIST}${bioticaID}`, {
        headers: SIMPLE_HEADER,
      })
      .then(function (response) {
        ////console.log(response.data);
        setDetailItens(response.data);
      })
      .catch(function (error) {
        //console.log(error);
      });
  }, []);

  

  useEffect(() => {
    if (typeFish.includes(superClass)) {
      console.log(superClass);
      console.log("é peixe");
      setIsFish(true);
    } else if (typeCrustacean.includes(subPhylum)) {
      console.log(subPhylum);
      console.log("é um crustáceo");
      setIsCrustacea(true);
    }
  }, []);

  async function removeDetail(id) {
    try {
      const response = await axios.delete(`${AMOSTRA_GERAL}${id}`, {
        headers: SIMPLE_HEADER,
      });
      //console.log(response.data);
      setPopupMessage("Dados deletados!");
      setPopupType("success");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);

      setDetailItens((prevItens) => prevItens.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const adicionarDetalheALista = (DetalheCadastrado) => {
    setDetailItens((prevDetailItens) => [
      ...prevDetailItens,
      DetalheCadastrado,
    ]);
  };

  return (
    <div className={styles.container}>
      <Navscreen />

      <div className={styles.containerinfo}>
        <Usernav pageBack={true} />
        {showPopup && <Popup message={popupMessage} type={popupType} />}

        <div className={styles.header}>
          <Header
            titulo="Detalhe Amostra"
            texto="Adicione dados extra a sua amostra!"
            referencia={especie}
            description="Complemente os dados de "
            imagem={localImagem}
          />
        </div>

        <div className={styles.textContainer}>
          <StyledTableList>
            <StyledContainerTable>
              <StyledFindItem>
                <p>Tabela de Detalhes</p>
                <StyledSearch>
                  <input
                    type="text"
                    placeholder="Buscar Amostra..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FiSearch className={styles.iconBuscar} />
                </StyledSearch>
              </StyledFindItem>

              <StyledTableItens>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Especie</th>
                      <th>gênero</th>
                      <th title="Peso Total (g)">pt_g</th>
                      <th title="Estágio de Maturação Gonadal">emg</th>
                      <th title="Grau de Repleção Estomacal">gre</th>
                      {isCrustacea && (
                        <>
                          <th title="Comprimento do abdômen">ca_mm</th>
                          <th title="Comprimento da carapaça">cc_mm</th>
                          <th title="Largura de carapaça">lc_mm</th>
                        </>
                      )}
                      {isFish && (
                        <>
                          <th title="Comprimento padrão">cp_mm</th>
                          <th title="Comprimento total">ct_mm</th>
                        </>
                      )}

                      <th title="">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailItens ? (
                      detailItens
                        .filter((detailItens) =>
                          Object.values(detailItens).some((value) =>
                            String(value)
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                        )
                        .map((item, index) => (
                          <tr className={styles.infoEquipe} key={item.id}>
                            <td title={index + 1}>{index + 1}</td>
                            <td title={especie}>{especie}</td>
                            <td title={item.genero}>{item.genero}</td>
                            <td title={item.pt_g}>
                              {item.pt_g ? item.pt_g : "-"}
                            </td>
                            <td title={item.emg}>
                              {item.emg ? item.emg : "-"}
                            </td>
                            <td title={item.gre}>
                              {item.gre ? item.gre : "-"}
                            </td>
                            {isCrustacea && (
                              <>
                                <td title={item.ca_mm}>
                                  {item.ca_mm ? item.ca_mm : "-"}
                                </td>
                                <td title={item.cc_mm}>
                                  {item.cc_mm ? item.cc_mm : "-"}
                                </td>
                                <td title={item.lc_mm}>
                                  {item.lc_mm ? item.lc_mm : "-"}
                                </td>
                              </>
                            )}
                            {isFish && (
                              <>
                                <td title={item.cp_mm}>
                                  {item.cp_mm ? item.cp_mm : "-"}
                                </td>
                                <td title={item.ct_mm}>
                                  {item.ct_mm ? item.ct_mm : "-"}
                                </td>
                              </>
                            )}
                            <td>
                              <StyledButtonArea>
                                <StyledDeleteButton
                                  title="Excluir Ponto de Coleta"
                                  onClick={() => removeDetail(item.id)}
                                >
                                  <TbTrashXFilled />
                                </StyledDeleteButton>
                              </StyledButtonArea>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="2">Carregando...</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </StyledTableItens>

                
              <DetalheAmostra
                  typeSpecie={isFish}
                  addDetail={adicionarDetalheALista}
                />
            </StyledContainerTable>
            
          </StyledTableList>
          
        </div>
      </div>
    </div>
  );
}
export default Detalhe;
