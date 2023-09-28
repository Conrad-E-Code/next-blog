"use client";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import TableOfContentsPlugin from "./plugins/TableOfContentsPlugin";
import MyToolbarPlugin from "./plugins/toolbar/MyToolbarPlugin";
import LexicalTableOfContentsPlugin from "@lexical/react/LexicalTableOfContents";
import { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode } from "@lexical/rich-text";
import { useContext } from "react";
import { Context } from "@/context/Context";
import {
  TableNode,
  TableCellNode,
  INSERT_TABLE_COMMAND,
  $insertTableRow,
  $insertTableColumn,
} from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
import { BannerNode, BannerPlugin } from "./plugins/BannerPlugin";
import { ImageNode } from "./nodes/ImageNode/ImageNode";
import ImagesPlugin from "./plugins/ImagePlugin";
// import { getParentElement } from "lexical/LexicalUtils";
const theme = {
  ltr: "text-left",
  text: {
    bold: "font-boldest",
    italic: "italic",
    underline: "underline"
  },
  heading: {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-semibold",
    h3: "text-xl",
  },
  list: {
    ul: "list-disc list-inside text-left",
    ol: "list-decimal list-inside text-left"},
  banner: "bg-red-400",
  image: "editor-image"

  // Theme styling goes here
};
const MyAutoFocusPlugin = ({editorState, setEditorState, blog}) => {
  const {userInsideList, setUserInsideList, currentEditorFormat, setCurrentEditorFormat} = useContext(Context)

  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      editor.setEditorState(editor.parseEditorState(blog.contentJSON));
    });
  }, []);
  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  function parentIsListOrItem(selection) {
    const childKey = selection?.anchor?.key
    const childElement = editor.getElementByKey(childKey)
    const tagCheck = childElement?.parentElement?.tagName
    // console.log(tagCheck)
    if (tagCheck?.includes("UL") || tagCheck?.includes("LI") || tagCheck?.includes("OL")) {
      // console.log(true)
      setUserInsideList(true)
      return true 
    } else {
      setUserInsideList(false)
      // console.log(false)
      return false
    }
  }

  return         <OnChangePlugin
  onChange={(lexState) => { console.log(JSON.stringify(lexState))
    parentIsListOrItem(lexState._selection)
    setEditorState(JSON.stringify(lexState.toJSON()));
    setCurrentEditorFormat(lexState?._selection?.format)
  }}
/>;
};

// const MyTableToolBarPlugin = () => {};

function Reader({blog }) {
  const [blogTitle, setBlogTitle] = useState("");
  const [editorState, setEditorState] = useState();
  const [errors, setErrors] = useState();

  // Catch any errors that occur during Lexical updates and log them
  // or throw them as needed. If you don't throw them, Lexical will
  // try to recover gracefully without losing user data.
  function onError(error) {
    console.error(error);
  }

  const initialConfig = {
    namespace: "MyEditor",
    editable: false,
    theme,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      // BannerNode,
      TableNode,
      TableCellNode,
      ImageNode
    ],
    onError,
  };



  function handleSubmit() {
    // Pessimistic CLear Editor after fetch success
    console.log("Submitting...");
    console.log("EditorState:", editorState);
    const parsedState = JSON.parse(editorState);
    console.log(parsedState["root"]["children"][0]["children"][0]["text"]);
    console.log("Title:", blogTitle);
    if (editorState && blogTitle) {
      fetch("/api/blogs/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blogTitle,
          contentJSON: editorState,
          // author: userId,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            console.log(data);
          });
        } else {
          r.json().then((err) => setErrors(err["error"]));
        }
      });
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {errors ? (
        <div className=" bg-amber-400 text-[rgb(250,0,0)] font-bold">
          {" "}
          ERROR: {errors}
        </div>
      ) : null}
      <LexicalComposer initialConfig={initialConfig} className={"relative"}>
        <LexicalTableOfContentsPlugin>
          {(tableOfContents, editor) => {
            // Render your content that uses tableOfContents and editor here
            // console.log(tableOfContents, editor);
            // console.log(JSON.stringify(tableOfContents));
            // console.log(JSON.stringify(editor));
            return (
              <TableOfContentsPlugin tableOfContents={tableOfContents} initialShowHideBoolean={false} />
            );
          }}
        </LexicalTableOfContentsPlugin>

        {/* <BannerPlugin /> */}
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="p-4 w-5/6 bg-black text-lime-400  mx-auto rounded border-gray-600 border-[35px] relative text-left" />
          }
          placeholder={
            <div className="rounded text-fuchsia-100">Start Typing...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />
        <MyAutoFocusPlugin editorState={editorState} setEditorState={setEditorState} blog={blog} />
      </LexicalComposer>
    </form>
  );
}

export default Reader;
