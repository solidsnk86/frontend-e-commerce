/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useState } from "react";
import { showDialog } from "../components/common/Dialog";
import { useAuth } from "./AuthContext";

const BACK_URL = import.meta.env.VITE_BACK_API_URL
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth()

  const getUserById = async (id) => {
    return user ? user.user_id === id : null
  };

  const updateUser = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BACK_URL}/api/user/update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData)
        }
      );
      const updatedUser = await response.json();

      showDialog({ content: <div>{updatedUser.message}</div> })
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BACK_URL}/api/user/delete`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const deletedUser = await response.json();
  
      showDialog({ content: <div>{deletedUser.message}</div> })
      window.open("/", "_self")
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      setError("");
    }
  };

  const values = { error, isLoading, deleteUser, updateUser, getUserById };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("El contexto debe se usado fuera del Provider")
  }
  const { error, isLoading, deleteUser, updateUser, getUserById } = context;
  return { error, isLoading, deleteUser, updateUser, getUserById };
};
