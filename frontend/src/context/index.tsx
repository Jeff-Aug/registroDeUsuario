// Arquivo que contém todos os contextos, só para deixar mais compacto no App.tsx

import React from "react";

import { AuthProvider } from "./AuthContext";
import { ToastProvider } from "./ToastContext";

const ContextApp: React.FC = ({ children }) => {
    return (
        <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
    );
};
export default ContextApp;