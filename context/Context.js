"use client";
import { createContext, useState} from "react";
export const Context = createContext();
export const ContextProvider = ({ children }) => {
  //user
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([])

  // check for lexical to see if the user is inside a list
  const [userInsideList, setUserInsideList] = useState(false)
  // check current lexical editor format
  const [currentEditorFormat, setCurrentEditorFormat] = useState()
  
  
// SERVER BLOGS FOR USERBLOGLIST
const [serverBlogs, setServerBlogs] = useState([])

// Editor State

const [editorState, setEditorState] = useState()

// Detect changes from the editor
const [changesDetected, setChangesDetected] = useState(false)

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
        setIsConfirmOpen,
        serverBlogs,
        setServerBlogs,
        userInsideList,
        setUserInsideList,
        currentEditorFormat,
        setCurrentEditorFormat,
        editorState,
        setEditorState,
        changesDetected,
        setChangesDetected

      }}>
      {children}
    </Context.Provider>
  );
};
