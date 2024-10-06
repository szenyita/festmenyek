"use client";

import { Felhasznalo } from "@prisma/client";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  contextFelhasznalo: Felhasznalo | null;
  setContextFelhasznalo: (felhasznalo: Felhasznalo | null) => void;
  contextToken: string | null;
  setContextToken: (token: string | null) => void;
} | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contextFelhasznalo, setContextFelhasznalo] =
    useState<Felhasznalo | null>(() => {
      if (typeof window !== "undefined") {
        const contextFelhasznalo = localStorage.getItem("contextFelhasznalo");
        return contextFelhasznalo ? JSON.parse(contextFelhasznalo) : [];
      }
      return null;
    });
  const [contextToken, setContextToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const contextToken = localStorage.getItem("contextToken");
      return contextToken ? JSON.parse(contextToken) : [];
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedFelhasznalo = localStorage.getItem("felhasznalo");

      if (storedToken && storedFelhasznalo) {
        setContextToken(storedToken);
        setContextFelhasznalo(JSON.parse(storedFelhasznalo));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "contextFelhasznalo",
        JSON.stringify(contextFelhasznalo)
      );
    }
  }, [contextFelhasznalo, setContextFelhasznalo]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("contextToken", JSON.stringify(contextToken));
    }
  }, [contextToken]);

  return (
    <AuthContext.Provider
      value={{
        contextFelhasznalo,
        setContextFelhasznalo,
        contextToken,
        setContextToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
