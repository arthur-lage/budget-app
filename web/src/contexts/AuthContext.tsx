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
  isEmailVerified: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderType = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderType) {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

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
  }

  useEffect(() => {
    if (localStorage.getItem("money-management:token") !== null) {
      setToken(
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

        if (res.data.user.isEmailVerified) {
          setIsEmailVerified(true);
        }
      })
      .catch((err) => {
        console.error(err);
        handleSetCurrentUser(null);
        setToken(null);
      });
  }, [token]);

  function updateUserBalance(newBalance: number) {
    const newUser = {
      id: String(currentUser?.id),
      name: String(currentUser?.name),
      email: String(currentUser?.email),
      balance: Number(newBalance),
    };

    handleSetCurrentUser(newUser);
  }

  useEffect(() => {
    if (!currentUser) {
      return navigate("/login");
    }

    if (!isEmailVerified) {
      return navigate("/not-verified");
    }

    if (location.pathname === "/login" || location.pathname === "/register") {
      return navigate("/");
    }
  }, [currentUser, isEmailVerified]);

  const value = {
    token,
    handleSetToken,
    currentUser,
    handleSetCurrentUser,
    logout,
    updateUserBalance,
    isEmailVerified,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
