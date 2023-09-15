"use client";
import {$getRoot, $getSelection} from 'lexical';
import {useEffect, useState} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
const theme = {
  ltr: "text-left"
    // Theme styling goes here
  }
const MyLexicalComponent = () => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
      }, [editor]);
    
      return null;
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
      onError,
    };
    function handleSubmit() {
      console.log("Submitting...")
      console.log("EditorState:", editorState)
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={<ContentEditable className='p-4 w-5/6 h-[500px] bg-black text-lime-400 my-10 mx-auto rounded border-gray-600 border-[35px] relative text-left' />}
            placeholder={<div className="rounded text-fuchsia-100 absolute top-40 left-0 right-0">Start Typing...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MyLexicalComponent />
          <OnChangePlugin onChange={(lexState) => { setEditorState(lexState)}}/>
          <button onClick={handleSubmit}>Howdy</button>
        </LexicalComposer>
      );
    }




export default Editor