import styled from "styled-components";
import { colors, sizes, fonts } from "./GlobalStyle.style";

export const StyledFormGroup = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${sizes.borderRadius};
  width: 95%;
  margin-top: 20px;

  input,
  select {
    border-radius: ${sizes.borderRadius};
    border: 1px solid #3333334b;
    font-size: 0.9rem;
    font-weight: ${fonts.normalweight};
    color: ${colors.darkText};
    background-color: transparent;
  }
  input:hover,
  input:focus,
  select:hover,
  select:focus {
    border-color: ${colors.borderColorFocus};
    color: ${colors.primary};
    outline: none;
  }

  ul {
    list-style: none;
    position: relative;
    width: 32%;
    padding: 0 3px;
    max-height: 200px;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 10px 10px;
    background-color: #fff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 22%;
    overflow-y: auto; /* Permite rolagem se a lista for muito longa */
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }

  ul::-webkit-scrollbar {
    width: 8px;
  }
  ul::-webkit-scrollbar {
    width: 8px;
  }

  ul::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  ul::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  ul {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  }
  li {
    padding: 10px;
    cursor: pointer;
  }

  li:hover {
    background-color: #f5f5f5;
  }

  .textMonitor {
    width: 85%;
    text-align: start;
    color: ${colors.darkText};
    font-weight: ${fonts.regularweight};
  }
`;

export const StyledUniqueSelect = styled.div`
  display: flex;
  position: relative;
  align-items: right;
  flex-direction: column;
  width: 85%;
  height: 15%;
  max-height: 80px;
  background-color: transparent;

  p {
    width: 95%;
    text-align: start;
    color: ${colors.darkText};
    font-weight: ${fonts.regularweight};
  }
  select {
    width: 100%;
    height: 50%;
    padding: 0 7px;
  }
`;

export const StyledUniqueInput = styled.div`
  display: flex;
  align-items: right;
  flex-direction: column;
  width: 85%;
  height: 15%;
  max-height: 80px;

  input {
    width: 97%;
    height: 50%;
    padding: 0 7px;
    border-radius: ${sizes.borderRadius};
    border: 1px solid #3333334b;
    font-size: 0.9rem;
    font-weight: ${fonts.normalweight};
  }

  p {
    width: 95%;
    text-align: start;
    color: ${colors.darkText};
    font-weight: ${fonts.regularweight};
  }

  a {
    width: 97%;
    height: 50%;
    input {
      width: 100%;
      height: 100%;
      padding: 0 7px;
      border-radius: ${sizes.borderRadius};
      border: 1px solid #3333334b;
      font-weight: bold;
      font-size: 0.9rem;
      color: ${colors.primary};
    }
  }
`;

export const StyledDoubleInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  height: 15%;
  max-height: 70px;
  p {
    width: 92%;
    color: ${colors.darkText};
    font-weight: ${fonts.regularweight};
  }
`;

export const StyledFirstInput = styled.div`
  width: 50%;

  input,
  select {
    padding: 0 7px;
    height: 55%;
    border-radius: ${sizes.borderRadius};
    border: 1px solid #3333334b;
    font-weight: ${fonts.normalweight};
  }
  select {
    width: 95%;
  }
  input {
    width: 90%;
  }
`;
export const StyledSecondInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  text-align: start;
  width: 50%;

  input,
  select {
    padding: 0 7px;
    height: 55%;
    border-radius: ${sizes.borderRadius};
    border: 1px solid #3333334b;
    font-weight: ${fonts.normalweight};
  }
  select {
    width: 92%;
  }
  input {
    width: 90%;
  }
  p {
    width: 95%;
    text-align: start;
    color: ${colors.darkText};
    font-weight: ${fonts.regularweight};
  }
`;

export const StyledTripleInputFoto = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  height: 35%;
  max-height: 120px;

  p {
    width: 92%;
    color: ${colors.darkText};
    font-weight: ${fonts.regularweight};
  }
`;

export const StyledInputFoto = styled.div`
  width: 31%;
  height: 80%;
  background-color: #fff;
  text-align: center;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  box-shadow: 5px 5px 21px #d0d0d0, -5px -5px 21px #f0f0f0;

  @keyframes figura {
    0% {
      transform: translateX(-5%);
    }

    50% {
      transform: translateY(5%);
    }

    100% {
      transform: translateX(-5%);
    }
  }
  &:hover {
    border: 3px solid #ff481f8a;
    animation-name: figura;
    animation-duration: 0.8s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
  .selecionado {
    border: 3px solid #ff481f8a;
    background-color: lightblue;
    background-color: yellow;
  }

  img {
    width: 65px;
    height: 65px;
  }
  p {
    text-align: center;
    width: 100%;
    min-height: 20px;
    font-weight: 600;
  }
`;

export const StyledBtnGroup = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  height: 20%;
  max-height: 80px;

  button {
    width: 50%;
    height: 50%;
    background-color: ${colors.primary};
    font-size: 1rem;
    color: ${colors.lightText};
    border-radius: ${sizes.borderRadius};
    font-weight: ${fonts.regularweight};
    cursor: pointer;
    text-align: center;

    &:hover {
      background-color: ${colors.btnformhover};
    }
  }
`;
