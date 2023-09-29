"use client";
import MyAutoFocusPlugin from "./plugins/MyAutoFocusPlugin";
import TableOfContentsPlugin from "./plugins/TableOfContentsPlugin";
import MyToolbarPlugin from "./plugins/toolbar/MyToolbarPlugin";
import LexicalTableOfContentsPlugin from "@lexical/react/LexicalTableOfContents";
import { useContext, useEffect, useRef, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode } from "@lexical/rich-text";
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
import EditOnlyPluginGroup from "./plugins/EditOnlyPluginGroup";
import ReadOnlyPluginGroup from "./plugins/ReadOnlyPluginGroup";
import { Context } from "@/context/Context";

import { Inter, Roboto, Open_Sans  } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight:[ '100', '300', '400', '500', '700', '900']})
const roboto = Roboto({subsets: ['latin'], weight:[ '100', '300', '400', '500', '700', '900']})
const openSans = Open_Sans({subsets: ['latin'], weight: ["300", "400", "500", "600", "700", "800"]})

console.log("roboto", roboto)
// import { getParentElement } from "lexical/LexicalUtils";
const theme = {
  ltr: "text-left",
  text: {
    bold: "font-boldest",
    italic: "italic",
    underline: "underline",
  },
  heading: {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-semibold",
    h3: "text-xl",
  },
  list: {
    ul: "list-disc list-inside text-left",
    ol: "list-decimal list-inside text-left",
  },
  banner: "bg-red-400",
  image: "editor-image",

  // Theme styling goes here
};

// const MyTableToolBarPlugin = () => {};

function Editor({ userId, editable, blog }) {
  const [errors, setErrors] = useState();
  const [fontSize, setFontSize] = useState("12"); // Initial font size
  const [fontType, setFontType] = useState(""); // Initial font type
  const handleFontSizeChange = (value) => {
    setFontSize(prev => prev = value.toString());
    console.log(fontSize)
  };

  const handleFontTypeChange = (value) => {

    if (value === "Times New Roman"){
    setFontType((prev) => (prev = "font-timesnewroman"));
    } else if (value === "Arial") {
      setFontType((prev) => { prev = "font-arial"})
    } else if (value === "Verdana") {
      setFontType((prev) => { prev = "font-verdana"
      })
    }

  };

  // Catch any errors that occur during Lexical updates and log them
  // or throw them as needed. If you don't throw them, Lexical will
  // try to recover gracefully without losing user data.
  function onError(error) {
    console.error(error);
  }

  const initialConfig = {
    editable,
    namespace: "MyEditor",
    theme,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      // BannerNode,
      TableNode,
      TableCellNode,
      ImageNode,
    ],
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig} className={"relative"}>
      {errors ? (
        <div className=" bg-amber-400 text-[rgb(250,0,0)] font-bold">
          {" "}
          ERROR: {errors}
        </div>
      ) : null}
      <LexicalTableOfContentsPlugin>
        {(tableOfContents, editor) => {
          // Render your content that uses tableOfContents and editor here
          // console.log(tableOfContents, editor);
          // console.log(JSON.stringify(tableOfContents));
          // console.log(JSON.stringify(editor));
          return (
            <TableOfContentsPlugin
              tableOfContents={tableOfContents}
              initialShowHideBoolean={false}
            />
          );
        }}
      </LexicalTableOfContentsPlugin>
      {editable && (
        <MyToolbarPlugin
          fontSize={fontSize}
          fontType={fontType}
          handleFontSizeChange={handleFontSizeChange}
          handleFontTypeChange={handleFontTypeChange}
        />
      )}
      {/* <BannerPlugin /> */}
      <RichTextPlugin
        contentEditable={
          <ContentEditable style={{fontSize: `${fontSize}px`}} className={`p-4 w-5/6 bg-slate-300 text-black  mx-auto rounded border-gray-600 border-[2px] relative text-left ${fontType}`} />
        }
        placeholder={
          <div className="rounded text-fuchsia-100">Start Typing...</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />

      {editable ? (
        <EditOnlyPluginGroup userId={userId} />
      ) : (
        <ReadOnlyPluginGroup blog={blog} />
      )}
    </LexicalComposer>
  );
}

export default Editor;
