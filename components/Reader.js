"use client";
import {
  $createTextNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import { useEffect, useState } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, $createHeadingNode } from "@lexical/rich-text";
import {
  ListNode,
  ListItemNode,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  insertList,
  $handleListInsertParagraph,
} from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import {
  $isBannerNode,
  BannerNode,
  BannerPlugin,
  INSERT_BANNER_COMMAND,
} from "./BannerPlugin";
import { title } from "process";
const theme = {
  ltr: "text-left",
  text: {
    bold: "font-boldest",
    italic: "italic",
  },
  heading: {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-semibold",
    h3: "text-xl",
  },
  list: {
    ul: "list-disc list-inside",
  },
  banner: "bg-red-400",

  // Theme styling goes here
};



// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

function MyToolbarPlugin( {blog}) {
  const [editor] = useLexicalComposerContext();
    useEffect(()=>{
        editor.update(() => {
            editor.setEditorState(editor.parseEditorState(blog.contentJSON));
          });
    },[])


  return (
null
  );
}

function Reader( {userId, blog}) {
  const [blogTitle, setBlogTitle] = useState();
  const [editorState, setEditorState] = useState();
  const [errors, setErrors] = useState();
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    nodes: [HeadingNode, ListNode, ListItemNode, BannerNode],
    onError,
    editable: false

  };


  return (
      <LexicalComposer initialConfig={initialConfig} className={"relative"}>
        <MyToolbarPlugin blog={blog} />
        <BannerPlugin />
        <h1 className={`text-xl font-semibold flex mx-auto text-center justify-center`}>{blog.title}</h1>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="p-4 w-5/6 h-[500px] bg-black text-lime-400  mx-auto rounded border-gray-600 border-[35px] relative text-left overflow-y-scroll" />
          }
          placeholder={
            <div className="rounded text-fuchsia-100">
              Start Typing...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(lexState) => {
            setEditorState(JSON.stringify(lexState.toJSON()));
          }}
        />
      </LexicalComposer>
  );
}

export default Reader;
