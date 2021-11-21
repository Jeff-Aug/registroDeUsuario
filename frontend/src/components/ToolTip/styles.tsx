import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    /* Esconde o span de Erro */
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    /* Centralizando o balão de erro no centro do input*/
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;
    /* Criando a flecha pra baixo pelo CSS */
    &::before {
      content: "";
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  /* Exibe o balão de Erro ao passar o mouse em cima */
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;