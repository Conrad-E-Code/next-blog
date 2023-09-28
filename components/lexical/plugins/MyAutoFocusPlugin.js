"use client";
import { useContext } from "react";
import { Context } from "@/context/Context";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
const MyAutoFocusPlugin = ({ editorState, setEditorState }) => {
  const {
    userInsideList,
    setUserInsideList,
    currentEditorFormat,
    setCurrentEditorFormat,
    changeCount,
    setChangeCount
  } = useContext(Context);

  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(()=>{
      editor.setEditorState(editor.parseEditorState(sessionStorage.getItem("autosave")))
    })
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  function parentIsListOrItem(selection) {
    const childKey = selection?.anchor?.key;
    const childElement = editor.getElementByKey(childKey);
    const tagCheck = childElement?.parentElement?.tagName;
    // console.log(tagCheck)
    if (
      tagCheck?.includes("UL") ||
      tagCheck?.includes("LI") ||
      tagCheck?.includes("OL")
    ) {
      // console.log(true)
      setUserInsideList(true);
      return true;
    } else {
      setUserInsideList(false);
      // console.log(false)
      return false;
    }
  }

  return (
    <OnChangePlugin
      onChange={(lexState) => {
        console.log(JSON.stringify(lexState));
        parentIsListOrItem(lexState._selection);
        setEditorState(JSON.stringify(lexState.toJSON()));
        setCurrentEditorFormat(lexState?._selection?.format);
        setChangeCount(prev => prev+=1)
        if (changeCount > 79) {
          sessionStorage.setItem("autosave", editorState)
          setChangeCount(0)
        }
        console.log(changeCount)
      }}
    />
  );
};

export default MyAutoFocusPlugin;
