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
import { ListNode, ListItemNode } from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import {
  $isBannerNode,
  BannerNode,
  BannerPlugin,
  INSERT_BANNER_COMMAND,
} from "./plugins/BannerPlugin";
import { title } from "process";
import DeleteButton from "../DeleteButton";
import { Context } from "@/context/Context";
import { useContext } from "react";
import { onDelete } from "@/utils/onDelete";
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

function MyToolbarPlugin({ blog }) {
  const [editing, setEditing] = useState(false);
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      editor.setEditorState(editor.parseEditorState(blog.contentJSON));
    });
  }, []);

  function handleSaveChanges() {
    const changes = JSON.stringify(editor.getEditorState());
    console.log(changes);
    fetch(`/api/blogs/${blog._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ contentJSON: changes }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => console.log(data));
      } else {
        r.json().then((err) => console.log({ err: err }));
        //handle errors
      }
    });
  }
  return (
    <>
      <button
        onClick={() => {
          editor.update(() => {
            setEditing(true);
            editor.setEditable(true);
          });
        }}
      >
        Edit
      </button>

      {editing ? (
        <button
          onClick={() => {
            handleSaveChanges();
          }}
        >
          Save Changes
        </button>
      ) : null}
    </>
  );
}

function Reader({ userId, blog }) {
  const [changeCount, setChangeCount] = useState(0);
  const [blogTitle, setBlogTitle] = useState();
  const [editorState, setEditorState] = useState();
  const [errors, setErrors] = useState();
  const { isConfirmOpen, serverBlogs, setServerBlogs } = useContext(Context);
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    nodes: [HeadingNode, ListNode, ListItemNode],
    onError,
    editable: false,
  };

  return (
    <LexicalComposer initialConfig={initialConfig} className={"relative z-1 "}>
      <DeleteButton
        onDelete={() => {
          onDelete(blog, serverBlogs, setServerBlogs);
        }}
      />
      <MyToolbarPlugin blog={blog} />
      <h1
        className={`text-xl font-semibold flex mx-auto text-center justify-center`}
      >
        {blog.title}
      </h1>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className=" p-4 w-5/6 h-[500px] bg-black text-lime-400  mx-auto rounded border-gray-600 border-[35px] relative text-left overflow-y-scroll z-1" />
        }
        placeholder={
          <div className="rounded text-fuchsia-100">Start Typing...</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin
        onChange={(lexState) => {
          setChangeCount((prev) => (prev = prev + 1));
          console.log(changeCount);

          setEditorState(JSON.stringify(lexState.toJSON()));
          //save draft to local storage
        }}
      />
    </LexicalComposer>
  );
}

export default Reader;
