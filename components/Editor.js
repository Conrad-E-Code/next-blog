"use client";
import {$createTextNode, $getRoot, $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, } from 'lexical';
import {useEffect, useState,} from 'react';
import {$generateHtmlFromNodes} from "@lexical/html"
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HeadingNode, $createHeadingNode} from "@lexical/rich-text"
import {ListNode, ListItemNode, INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, insertList, $handleListInsertParagraph} from "@lexical/list"
import {$setBlocksType} from "@lexical/selection"
import { $isBannerNode, BannerNode, BannerPlugin, INSERT_BANNER_COMMAND } from './BannerPlugin';
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
  },
  list: {
    ul: "list-disc list-inside"

  },
  banner: "bg-red-400"

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

const MyListToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  editor.registerCommand(INSERT_UNORDERED_LIST_COMMAND, () => {
    insertList(editor, 'bullet');
    return true;
}, COMMAND_PRIORITY_LOW);

  function onClick(tag) {
    if (tag === "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
      return
    }
    console.log(INSERT_UNORDERED_LIST_COMMAND)
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined) 
  }
  return  <div>
    {["ul","ol"].map((tag) => {
    return (<button key={`header-button-${tag}`} className='px-1 mx-4' onClick={() => {onClick(tag)}}>Add {tag}</button>)
  })}</div>
}

const MyBannerToolBarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  function onClick() {
    console.log()
    editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined) 
  }

  return (
    <button onClick={onClick}> Insert Banner</button>
  )

}



    // Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
    console.error(error);
  }

function MyToolbarPlugin() {
  const [editor] = useLexicalComposerContext()

  function handleLoadEditorState() {
    const myState= {"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is my editor test","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"list 1","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"list 2","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"h1 test","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}
    editor.update(()=>{
      editor.setEditorState(myState);
    })
  }

  return <div>
    <MyHeaderPlugin />
    <MyListToolbarPlugin />
    <MyBannerToolBarPlugin />
    <button onClick={() => {
      editor.update(() => $handleListInsertParagraph())
    }} >Exit List</button>

<button onClick={() => {editor.update(() => {
  handleLoadEditorState()
})}}>LOAD EDITOR</button>



  </div>
}
  
  function Editor() {
    const [editorState, setEditorState] = useState();
    const initialConfig = {
      namespace: 'MyEditor',
      theme,
      nodes: [HeadingNode, ListNode, ListItemNode, BannerNode],
      onError,
    };
    function handleSubmit() {
      console.log("Submitting...")
      console.log("EditorState:", editorState)
      console.log("stringify")
      console.log(JSON.stringify(editorState))
    }




    return (
        <LexicalComposer initialConfig={initialConfig} className={'relative pl-2'}>
          <MyToolbarPlugin />
          <BannerPlugin />
          <RichTextPlugin
            contentEditable={<ContentEditable className='p-4 w-5/6 h-[500px] bg-black text-lime-400  mx-auto rounded border-gray-600 border-[35px] relative text-left overflow-y-scroll' />}
            placeholder={<div className="rounded text-fuchsia-100 absolute top-40 left-0 right-0">Start Typing...</div>}
            ErrorBoundary={LexicalErrorBoundary}/>
          <HistoryPlugin />

          <MyAutoFocusPlugin />
          <OnChangePlugin onChange={(lexState) => { setEditorState(lexState)}}/>
          <button onClick={handleSubmit}>SUBMIT</button>

        </LexicalComposer>
      );
    }




export default Editor