"use client";

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
import {
  TableNode,
  TableCellNode,
  INSERT_TABLE_COMMAND,
  $insertTableRow,
  $insertTableColumn,
} from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
import { BannerNode, BannerPlugin } from "./plugins/BannerPlugin";
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
    ol: "list-decimal list-inside",
  },
  banner: "bg-red-400",

  // Theme styling goes here
};
const MyAutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
};

// const MyTableToolBarPlugin = () => {};

function Editor({ userId }) {
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
    theme,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      BannerNode,
      TableNode,
      TableCellNode,
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
          author: userId,
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
  function handleFirstDraftSubmit() {
    console.log("Submitting...");
    console.log("EditorState:", editorState);
    console.log(editorState);
    const parsedState = JSON.parse(editorState);
    // console.log(parsedState["root"]["children"][0]["children"][0]["text"])

    if (!blogTitle) {
      setBlogTitle((prev) => (prev = `SUPER TITLE ${Math.random()}`));
    }

    if (parsedState?.root?.children?.[0]?.children?.[0]?.text) {
      setBlogTitle(
        (prev) =>
          (prev = parsedState["root"]["children"][0]["children"][0]["text"])
      );
    } else setBlogTitle((prev) => (prev = `SUPER TITLE ${Math.random()}`));
    if (editorState && blogTitle) {
      console.log("Title:", blogTitle);
      console.log("SUBMITTTING DRAFT");
      fetch("/api/blogs/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blogTitle,
          contentJSON: editorState,
          author: userId,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            console.log(data);
          });
        } else {
          r.json().then((err) => console(err["error"]));
        }
      });
    } else {
      console.log(editorState);
      console.log(blogTitle);
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
            console.log(tableOfContents, editor);
            console.log(JSON.stringify(tableOfContents));
            console.log(JSON.stringify(editor));
            return (
              <div className="table-of-contents">
                <h2>Table of Contents</h2>
                <ul>
                  {tableOfContents.map(([key, text, tag]) => (
                    <li key={key}>
                      <div
                        onClick={() => {
                          editor.getElementByKey(key).scrollIntoView();
                        }}
                      >
                        {text}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }}
        </LexicalTableOfContentsPlugin>
        <MyToolbarPlugin />
        <BannerPlugin />
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
        <MyAutoFocusPlugin />
        <OnChangePlugin
          onChange={(lexState) => {
            setEditorState(JSON.stringify(lexState.toJSON()));
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          SUBMIT
        </button>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleFirstDraftSubmit();
          }}
        >
          TEST
        </button>
      </LexicalComposer>
    </form>
  );
}

export default Editor;
