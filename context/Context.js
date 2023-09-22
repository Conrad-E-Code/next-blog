"use client";
import { createContext, useState} from "react";
export const Context = createContext();
export const ContextProvider = ({ children }) => {
  //user
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([])
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        errors,
        setErrors
      }}>
      {children}
    </Context.Provider>
  );
};
