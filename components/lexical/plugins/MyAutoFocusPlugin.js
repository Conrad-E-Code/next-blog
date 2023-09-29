"use client";
import { useContext } from "react";
import { Context } from "@/context/Context";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
const MyAutoFocusPlugin = ({ editorState, setEditorState }) => {
  const [pageLoaded, setPageLoaded] = useState(false)
  const {
    userInsideList,
    setUserInsideList,
    currentEditorFormat,
    setCurrentEditorFormat,
    setChangesDetected, changesDetected
  } = useContext(Context);

  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (sessionStorage.getItem("autosave")) {
    editor.update(()=>{
      editor.setEditorState(editor.parseEditorState(sessionStorage.getItem("autosave")))
    })}
    // Focus the editor when the effect fires!
    editor.focus();
    setPageLoaded(true)
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

  function handleAutoSaveDelay() {
    console.log("SAVING IN 15 seconds...")
    setTimeout(() => {
      sessionStorage.setItem("autosave", JSON.stringify(editor.getEditorState().toJSON()))
      setChangesDetected(prev => prev = false)
      console.log("SAVED")
    }, "15000")

  }

  return (
    <OnChangePlugin
      onChange={(lexState) => {
        console.log(JSON.stringify(lexState));
        parentIsListOrItem(lexState._selection);
        setEditorState( prev => prev = JSON.stringify(lexState.toJSON()));
        setCurrentEditorFormat(lexState?._selection?.format);
        if (!changesDetected && JSON.stringify(lexState.toJSON()) !== editorState && pageLoaded) {
        setChangesDetected(prev => prev = true)
        handleAutoSaveDelay()}
      }}
    />
  );
};

export default MyAutoFocusPlugin;
