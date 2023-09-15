"use client";
import {$createTextNode, $getRoot, $getSelection, $isRangeSelection} from 'lexical';
import {useEffect, useState} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HeadingNode, $createHeadingNode} from "@lexical/rich-text"
import {$setBlocksType} from "@lexical/selection"
const theme = {
  ltr: "text-left",
  text: {
    bold: "font-boldest",
    italic: "italic"
  },
  heading: {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-semibold",
    h3: "text-xl"
  }
    // Theme styling goes here
  }
const MyAutoFocusPlugin = () => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
      }, [editor]);
    
      return null
    }
const MyHeaderPlugin = () => {
  const [editor] = useLexicalComposerContext();

  function onClick(tag) {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag))
      }
    })


  }
  return  <div>{["h1","h2", "h3"].map((tag) => {
    return (<button key={`header-button-${tag}`} className='px-1 mx-4' onClick={() => {onClick(tag)}}>Add {tag}</button>)
  })}</div>
}



    // Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
    console.error(error);
  }
  
  function Editor() {
    const [editorState, setEditorState] = useState();
    const initialConfig = {
      namespace: 'MyEditor',
      theme,
      nodes: [HeadingNode],
      onError,
    };
    function handleSubmit() {
      console.log("Submitting...")
      console.log("EditorState:", editorState)
    }

    return (
        <LexicalComposer initialConfig={initialConfig} className={'relative'}>
          <MyHeaderPlugin />
          <RichTextPlugin
            contentEditable={<ContentEditable className='p-4 w-5/6 h-[500px] bg-black text-lime-400  mx-auto rounded border-gray-600 border-[35px] relative text-left overflow-y-scroll' />}
            placeholder={<div className="rounded text-fuchsia-100 absolute top-40 left-0 right-0">Start Typing...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MyAutoFocusPlugin />
          <OnChangePlugin onChange={(lexState) => { setEditorState(lexState)}}/>
        
          <button onClick={handleSubmit}>SUBMIT</button>
        </LexicalComposer>
      );
    }




export default Editor