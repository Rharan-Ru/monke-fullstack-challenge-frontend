"use client";

import { createContext, useEffect, useState } from "react";
import instance from "@/config/api";
import { toast } from "react-toastify";

export interface AuthContextProps {
  children: React.ReactNode;
}

export interface AuthContextValue {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuth: false,
  setIsAuth: () => {},
});

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  instance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response.status === 401 &&
        window.location.pathname !== "/signin"
      ) {
        toast.error("Sessão expirada, redirecionando para a página de login");
        setTimeout(() => {
          setIsAuth(false);
          localStorage.removeItem("token");
          window.location.href = "/signin";
        }, 2000);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const returnValues: AuthContextValue = {
    isAuth,
    setIsAuth,
  };

  return (
    <AuthContext.Provider value={{ ...returnValues }}>
      {children}
    </AuthContext.Provider>
  );
};
