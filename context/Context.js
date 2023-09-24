"use client";
import { createContext, useState} from "react";
export const Context = createContext();
export const ContextProvider = ({ children }) => {
  //user
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([])

  // Delet button component confirm popup
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        errors,
        setErrors,
        isConfirmOpen,
        setIsConfirmOpen
      }}>
      {children}
    </Context.Provider>
  );
};
