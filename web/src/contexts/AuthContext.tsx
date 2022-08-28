import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IUser } from "../interfaces/IUser";
import { api } from "../services/api";

type AuthContextType = {
  token: string | null;
  handleSetToken: (newToken: string | null) => void;
  currentUser: IUser | null;
  handleSetCurrentUser: (newUser: IUser | null) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderType = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderType) {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  function handleSetToken(newToken: string | null) {
    localStorage.setItem("money-management:token", JSON.stringify(newToken))
    setToken(newToken);
  }

  function handleSetCurrentUser(newUser: IUser | null) {
    setCurrentUser(newUser);
  }

  function logout() {
    handleSetCurrentUser(null);
    handleSetToken(null);
    localStorage.setItem("money-management:token", JSON.stringify(null));
  }

  useEffect(() => {
    if (localStorage.getItem("money-management:token") !== null) {
      setToken(
        JSON.parse(localStorage.getItem("money-management:token") as string)
      );
    }

    if (!token) {
      return
    }

    //@ts-ignore
    api.defaults.headers.authorization = `Bearer ${token}`;

    api
      .get("/users/auth")
      .then((res) => handleSetCurrentUser(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  useEffect(() => {
    if (!currentUser) {
      return navigate("/login");
    }
    
    return navigate("/");
  }, [currentUser]);

  const value = {
    token,
    handleSetToken,
    currentUser,
    handleSetCurrentUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
