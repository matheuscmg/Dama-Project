import styled from "styled-components";
import { colors, sizes, fonts } from "./GlobalStyle.style";

export const StyledTableList = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  background-color: #fff;
  min-width: 650px;
  max-height: 700px;
  width: 80%;
  height: 85%;
  padding: 0 20px;
  margin-left: 20px;
  box-shadow: 5px 5px 21px #d0d0d0, -5px -5px 21px #f0f0f0;
`;
export const StyledAbioticaTable = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  background-color: #fff;
  min-width: 650px;
  max-height: 700px;
  width: 80%;
  height: 85%;
  padding: 0 20px;
  margin-left: 20px;
  box-shadow: 5px 5px 21px #d0d0d0, -5px -5px 21px #f0f0f0;
`;
export const StyledContainerTable = styled.div`
  width: 100%;
  height: 95%;
  max-height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 10px;
`;

export const StyledFindItem = styled.div`
  display: flex;
  height: 15%;
  background-color: #391497;
  border-radius: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: -40px;

  p {
    margin-left: 10px;
    width: auto;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
  }
  input {
    width: 80%;
    height: 100%;
    border-top: 1px solid #33333323;
    border-bottom: 1px solid #33333323;
    border-left: 1px solid #33333323;
    padding: 0 10px;
    background-color: #fff;
    outline: none;
    caret-color: #333;
    border-radius: 10px 0 0 10px;
  }
  input::placeholder {
    font-weight: 500;
  }
`;

export const StyledSearch = styled.div`
  display: flex;
  width: 20%;
  height: 50%;
  margin-right: 10px;

  svg {
    color: #6c757d;
    font-size: 1.2rem;
    font-weight: 700;
    background-color: #fff;
    border-radius: 0 10px 10px 0;
    border-top: 1px solid #33333323;
    border-bottom: 1px solid #33333323;
    border-right: 1px solid #33333323;
    height: 100%;
    padding: 0 4px;
    width: 22px;
    cursor: pointer;
    caret-color: transparent;
  }
`;

export const StyledIconBuscar = styled.div`
  color: #6c757d;
  font-size: 1.2rem;
  font-weight: 700;
  background-color: #fff;
  border-radius: 0 10px 10px 0;
  border-top: 1px solid #33333323;
  border-bottom: 1px solid #33333323;
  border-right: 1px solid #33333323;
  height: 100%;
  padding: 0 4px;
  width: 22px;
  cursor: pointer;
  caret-color: transparent;
`;
export const StyledTextContainer = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: start;
  width: 100%;
  height: 90%;
  min-width: 750px;
  animation: moveLeft 1s ease-in-out;

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border: none;
  }
  th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
    text-align: left;
    padding: 12px 15px;
  }
  td {
    padding: 12px 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;

    line-height: 30px;
  }

  th:first-child {
    color: #ff491f;
  }
  tbody tr td:first-child {
    color: #ff491f; /* A cor que você escolher */
  }
  tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  tr:nth-child(even) {
    background-color: #fff;
  }
  tr:hover {
    background-color: #f1f1f1;
  }
`;

export const StyledTableItens1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 98%;
  min-width: 650px;
  height: 20%;
  max-height: calc(80% - 10px);
  margin-top: 15px;
  padding: 0 10px;
  font-size: 1rem;
  font-weight: 500;
  overflow: hidden;
  
  //border-bottom:1px solid #3914979a;
`;
export const StyledTableItens = styled.div`
  /*seusProjetos */
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 98%;
  min-width: 600px;
  height: 80%;
  max-height: calc(100% - 10px);
  margin-top: 15px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0 10px;
  font-size: 1rem;
  font-weight: 500;
  overflow: auto;

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border: none;
  }
  th {
    background-color: #f2f2f2;
    color: #222;
    font-weight: bold;
    text-align: left;
    padding: 12px 15px;
  }
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    line-height: 30px;
  }

  th:first-child {
    color: #ff491f;
  }
  tbody tr td:first-child {
    color: #ff491f; /* A cor que você escolher */
  }
  tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  tr:nth-child(even) {
    background-color: #fff;
  }
  tr:hover {
    background-color: #f1f1f1;
  }
`;
export const StyledButtonAction = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const StyledButtonArea = styled.div`
  //iconArea
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 100%;
`;

// Estilo específico para o botão de edição
export const StyledAddButton = styled.button`
  font-size: 1.3rem;
  font-weight: bold;
  align-items: center;
  margin-right: 10px;
  background-color: #17bba0;
  color: #fff;
  width: 40%;
  border-radius: 5rem;
  box-shadow: 0 0.05rem 0.2rem rgba(0, 0, 0, 0.05);
  cursor: pointer;
  &:hover {
    background-color: rgb(1, 141, 118);
  }
`;

// Estilo específico para o botão de excluir
export const StyledDeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42%;
  height: 30px;
  background-color: #d3314f;
  color: #f0f0f0;
  cursor: pointer;
  border-radius: 5rem;
  &:hover {
    background-color: rgb(216, 97, 93);
  }
  svg {
    width: 75%;
    height: 80%;
  }
`;
export const StyledExpandButton = styled.button`
  display: flex;
  justify-content: center;
  width: 45%;
  height: 30px;
  background-color: #ff6d24;
  color: #f0f0f0;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  padding: 0;
  &:hover {
    background-color: #cc6e3f;
  }

  img,
  svg {
    width: 70%;
    height: 75%;
  }
`;

export const StyledUniqueDeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 30px;
  background-color: #d3314f;
  color: #f0f0f0;
  cursor: pointer;
  border-radius: 5rem;
  &:hover {
    background-color: rgb(216, 97, 93);
  }
  svg {
    width: 75%;
    height: 80%;
  }
`;

export const StyledButtonOpen = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 10%;

  
  button {
    background-color: #ff491f;
    color: #fff;
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 50%;
    font-size: 2rem;
    cursor: pointer;
  }
  button:hover {
    background-color: #ff5c38;
  }
`;
