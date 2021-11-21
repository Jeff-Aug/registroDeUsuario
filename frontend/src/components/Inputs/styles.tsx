import styled, { css } from "styled-components";

import ToolTip from "../ToastContainer/Toast";

interface ContainerProps {
  IsFocused: boolean;
  IsFilled: boolean;
  isError: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  ${(props) =>
    props.isError &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.IsFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}
  ${(props) =>
    props.IsFilled &&
    css`
      color: #ff9000;
    `}
  input {
    flex: 1;
    background: transparent;
    color: white;
    border: 0;
    &::placeholder {
      color: white;
    }
    & + input {
      margin-top: 8px;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(ToolTip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    /* colore a flecha do balão */
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;