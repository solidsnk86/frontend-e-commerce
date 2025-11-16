import React, { createContext, useState, useContext, useEffect } from "react";
import { useCallback } from "react";
import { getLocation } from "../utils/getLocation";
import { showDialog } from "../components/common/Dialog";

const BACK_URL = import.meta.env.VITE_BACK_API_URL
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(""); // 'buyer' or 'seller' <- en la base ya se crea por default comprador o sea 'buyer'
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACK_URL}/api/user/profile`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok) setIsAuthenticated(false);
      if (response.status === 401) throw new Error("")
      
      setIsLoading(false);
      setUser(data.user);
      setIsAuthenticated(true);
      setUserRole(data.user?.role);
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
      setUser(null);
      setUserRole(null);
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    refreshUser()
  }, [refreshUser]);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(
        `${BACK_URL}/api/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      if (response.status === 403) throw new Error(data.message)

      setUser(data.user);
      setIsLoading(false)
      await refreshUser();
    } catch (err) {
      setError(err.message);
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  };

  const register = async (formData) => {
    try {
      setIsLoading(true)
      const { ip, city, country } = await getLocation()
      const response = await fetch(
        `${BACK_URL}/api/user/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({...formData, ip, city, country}),
        }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      if (response.status === 409) throw new Error(data.message)

      setIsLoading(false);
      showDialog({content: <div>{data.message}</div>})
      setUser(data);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setIsLoading(false)
    }
  };

  const logout = async () => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${BACK_URL}/api/user/logout`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    setIsLoading(false);
    setUser(null);
    setIsAuthenticated(false);
    setUserRole("");
    setError("");
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

  const value = {
    isAuthenticated,
    userRole,
    user,
    error,
    login,
    logout,
    register,
    isLoading, refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  const { isAuthenticated, userRole, user, error, login, logout, register, isLoading, refreshUser } = context
  return { isAuthenticated, userRole, user, error, login, logout, register, isLoading, refreshUser } ;
};
