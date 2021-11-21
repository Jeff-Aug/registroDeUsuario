import React, { useContext, useCallback, createContext, useState } from "react";
import { uuid } from "uuidv4";
import ToastContainer from "../components/ToastContainer";

export interface ToastMessage {
    id: string;
    type?: "sucess" | "error" | "info";
    title: string;
    description?: string;
}

interface ToastContextData {
    // Esse omit diz: message tem todos atributos da ToastMessage , EXCETO o id.
    addToast(message: Omit<ToastMessage, "id">): void;
    RemoveToast(id: string): void;
}

const ToastContext = createContext({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
    const [message, setMessage] = useState<ToastMessage[]>([]);
    const addToast = useCallback(
        ({ type, title, description }: Omit<ToastMessage, "id">) => {
            const id = uuid();

            const toast = {
                id,
                title,
                type,
                description,
            };
            setMessage((oldState) => [...oldState, toast]);
        },
        []
    );

    const RemoveToast = useCallback((id: string) => {
        setMessage((oldState) => oldState.filter((_message) => _message.id !== id));
    }, []);
    return (
        <ToastContext.Provider value={{ addToast, RemoveToast }}>
            {children}
            <ToastContainer message={message} />
        </ToastContext.Provider>
    );
};

function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used within an ToastContextProvider.");
    }
    return context;
}
export { ToastProvider, useToast };