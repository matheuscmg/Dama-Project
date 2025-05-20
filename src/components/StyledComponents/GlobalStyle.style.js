import { createGlobalStyle } from 'styled-components';

// Definindo cores e tamanhos comuns como variáveis
export const colors = {
  primary: '#ff491f',
  secondary: '#333333',
  lightBackground: '#fff',
  darkText: '#343a40',
  lightText: '#ffffff',
  container:'#edeff1',
  purple:'#391497',
  borderColor: '#33333323',
  borderColorHover: '#3333336e',
  borderColorFocus: '#ff481fce',
  btnformhover:'#ff5c38',
  btnDelete:'#e63757',
};

export const sizes = {
  borderRadius: '10px',
  
};

export const fonts = {
  normalweight:600,
  regularweight: 600,
  boldweight:'bold',
}

export const GlobalStyle = createGlobalStyle`
  /* Reset básico para alguns estilos padrão */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Estilos gerais */
  .container, .containerinfo {
    height: 100vh;
    width: 100vw;
    display: flex;
  }

  .container {
    background-color: rgba(245, 249, 252, 1);
    box-sizing: border-box;
  }

  .containerInfo {
    flex-direction: column;
  }

.header {
  width: 100%;
  height: 30%;
}

.textContainer {
  display: flex;
  justify-content: start;
  width: 100%;
  height: 90%;
  min-width: 750px;
  animation: moveLeft 1s ease-in-out;
}

  @keyframes moveLeft {
    0% {
      transform: translateX(60%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .textContainer{
        animation: moveLeft 1s ease-in-out;
  }

  /* Estilos para botões e inputs */
  .btnGroup button, .formGroup input {
    border-radius: ${sizes.borderRadius};
    font-weight: 600;
  }

  .formGroup input {
    border: 1px solid ${colors.borderColor};
    &:focus {
      border: 1px solid ${colors.borderColorFocus};
    }
    &:hover {
      border: 1px solid ${colors.borderColorHover};
    }
  }

  .btnGroup button {
    background-color: ${colors.primary};
    color: ${colors.lightText};
    &:hover {
      background-color: #ff5c38; /* Considerar criar uma variável para esta cor */
    }
  }

  /* Outros estilos específicos... */

  /* Estilos responsivos */
  @media (max-width: 1260px) {
    .welcomeTeams {
      flex-direction: column;
    }
    /* Outros estilos responsivos... */
  }
`;


