"use client";
import {$getRoot, $getSelection} from 'lexical';
import {useEffect, useState} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
const theme = {
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
          <PlainTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={<div className="rounded text-fuchsia-100">Enter some text...</div>}
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