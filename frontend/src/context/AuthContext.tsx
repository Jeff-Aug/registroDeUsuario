import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email?: string;
  pis?: string;
  cpf?: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

// burlando a tipagem do ts para permitir inicializar como objeto vazio
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [Data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@GoBarber:token");
    const user = localStorage.getItem("@GoBarber:user");

    if (user && token) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState; // Forçando uma tipagem para o typescript para interromper os erros de tipagem
  });
  const signIn = useCallback(async ({ email, cpf, pis, password }) => {
    const response = await api.post("/sessions", {
      email,
      cpf,
      pis,
      password,
    });

    const { token, user } = response.data;
    localStorage.setItem("@GoBarber:token", token);
    localStorage.setItem("@GoBarber:user", JSON.stringify(user));

    // Cookies.set('session_id', token, {expires: 1});

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@GoBarber:token");
    localStorage.removeItem("@GoBarber:user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: Data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    // Se o context não existe , dá erro, Logo para o usar o UseAuth, tem q ter <AuthProvider> por volta, para existir um contexto
    throw new Error("useAuth must used within an provider.");
  }
  return context;
}