import React from "react";

import { useTransition } from "react-spring";
import { Container } from "./styles";
import { ToastMessage } from "../../context/ToastContext";
import Toast from "./Toast";

interface ToastContainerProps {
  message: ToastMessage[];
}
const ToastContainer: React.FC<ToastContainerProps> = ({ message }) => {

  const MessagesWithTransictions = useTransition(
    message,
    (msg) => msg?.id, // recebe uma função que pega a key da mensagem(ID) daquele item
    {
      // Toast vem GIRANDO, para remover isso, só tirar o Transform.
      from: { right: "-120%", opacity: 0, transform: "rotateZ(0deg)" },
      enter: { right: "0%", opacity: 1, transform: "rotateZ(360deg)" },
      leave: { right: "-120%", opacity: 0, transform: "rotateZ(0deg)" },
    }

    //A codigo comentado no fim do arquivo vem aqui
  );

  return (
    <Container>
      {MessagesWithTransictions.map(({ key, item, props }) => (
        <Toast key={key} style={props} msg={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;


