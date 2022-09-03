import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IUser } from "../interfaces/IUser";
import { api } from "../services/api";

type AuthContextType = {
  token: string | null;
  handleSetToken: (newToken: string | null) => void;
  currentUser: IUser | null;
  handleSetCurrentUser: (newUser: IUser | null) => void;
  logout: () => void;
  updateUserBalance: (newBalance: number) => void;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderType = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderType) {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  function handleSetToken(newToken: string | null) {
    localStorage.setItem("money-management:token", JSON.stringify(newToken));
    setToken(newToken);
  }

  function handleSetCurrentUser(newUser: IUser | null) {
    setCurrentUser(newUser);
  }

  function logout() {
    handleSetCurrentUser(null);
    handleSetToken(null);
    localStorage.setItem("money-management:token", JSON.stringify(null));
    window.location.href = "/login";
  }

  useEffect(() => {
    if (localStorage.getItem("money-management:token") !== null) {
      handleSetToken(
        JSON.parse(localStorage.getItem("money-management:token") as string)
      );
    }

    if (!token) {
      return;
    }

    //@ts-ignore
    api.defaults.headers.authorization = `Bearer ${token}`;
    
    api
      .get("/users/auth")
      .then((res) => {
        handleSetCurrentUser(res.data.user);
      })
      .catch((err) => {
        console.error(err);
        handleSetCurrentUser(null);
        setToken(null);
        localStorage.setItem("money-management:token", JSON.stringify(null));
      });
  }, [token]);

  function updateUserBalance(newBalance: number) {
    const newUser = {
      id: String(currentUser?.id),
      name: String(currentUser?.name),
      email: String(currentUser?.email),
      balance: Number(newBalance),
      isEmailVerified: Boolean(currentUser?.isEmailVerified),
    };

    handleSetCurrentUser(newUser);
  }

  useEffect(() => {
    if (!currentUser && location.pathname != "/verify") {
      return navigate("/login");
    }
  }, []);

  const value = {
    token,
    handleSetToken,
    currentUser,
    handleSetCurrentUser,
    logout,
    updateUserBalance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
