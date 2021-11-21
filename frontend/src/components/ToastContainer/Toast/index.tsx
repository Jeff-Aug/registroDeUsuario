import React, { useEffect } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from "react-icons/fi";
import { clearTimeout, setTimeout } from "timers";
import { Container } from "./styles";
import { ToastMessage, useToast } from "../../../context/ToastContext";

interface ToastProps {
  msg: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  sucess: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};
const Toast: React.FC<ToastProps> = ({ msg, style }) => {
  const { RemoveToast } = useToast();
  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      RemoveToast(msg.id);
    }, 3000);
    // Se a pessoa fechar o toast antes do 3s, o timer será limpado e não executará o
    // removeToast, já que o Componente deixou de existir.
    // Logo no UseEffect, se o componente morrer, esse return que tem q ser uma função
    // será executado automaticamente.
    return () => {
      clearTimeout(timer);
    };
  }, [msg.id, RemoveToast]);
  return (
    <Container type={msg.type} hasDescription={!!msg.description} style={style}>
      {/* Escolhe o tipo, por padrão é o INFO!! */}
      {icons[msg.type || "info"]}
      <div>
        <strong>{msg.title}</strong>
        {msg.description && <p>{msg.description}</p>}
      </div>

      <button onClick={() => RemoveToast(msg.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};
export default Toast;