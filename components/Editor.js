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
const MyAutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
};
const MyHeaderPlugin = () => {
  const [editor] = useLexicalComposerContext();

  function onClick(tag) {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  }
  return (
    <div>
      {["h1", "h2", "h3"].map((tag) => {
        return (
          <button
            key={`header-button-${tag}`}
            className="px-1 mx-4"
            onClick={() => {
              onClick(tag);
            }}
          >
            Add {tag}
          </button>
        );
      })}
    </div>
  );
};

const MyListToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  editor.registerCommand(
    INSERT_UNORDERED_LIST_COMMAND,
    () => {
      insertList(editor, "bullet");
      return true;
    },
    COMMAND_PRIORITY_LOW
  );

  function onClick(tag) {
    if (tag === "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    console.log(INSERT_UNORDERED_LIST_COMMAND);
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  }
  return (
    <div>
      {["ul", "ol"].map((tag) => {
        return (
          <button
            key={`header-button-${tag}`}
            className="px-1 mx-4"
            onClick={() => {
              onClick(tag);
            }}
          >
            Add {tag}
          </button>
        );
      })}
    </div>
  );
};

const MyBannerToolBarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  function onClick() {
    console.log();
    editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined);
  }

  return <button onClick={onClick}> Insert Banner</button>;
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

function MyToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  function handleLoadEditorState() {
    const myState = {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "howdy",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    };
    editor.update(() => {
      editor.setEditorState(editor.parseEditorState(myState));
    });
  }

  return (
    <div>
      <MyHeaderPlugin />
      <MyListToolbarPlugin />
      <MyBannerToolBarPlugin />
      <button
        onClick={() => {
          editor.update(() => $handleListInsertParagraph());
        }}
      >
        Exit List
      </button>

      <button
        onClick={() => {
          editor.update(() => {
            handleLoadEditorState();
          });
        }}
      >
        LOAD EDITOR
      </button>
    </div>
  );
}

function Editor() {
  const [blogTitle, setBlogTitle] = useState();
  const [editorState, setEditorState] = useState();
  const [errors, setErrors] = useState();
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    nodes: [HeadingNode, ListNode, ListItemNode, BannerNode],
    onError,
  };
  function handleSubmit() {
    console.log("Submitting...");
    console.log("EditorState:", editorState);
    console.log("Title:", blogTitle);
    if (editorState && blogTitle) {
      fetch("/api/blogs/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: blogTitle, contentJSON: editorState }),
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
    <form onSubmit={(e) => {e.preventDefault()}}>
      {errors? <div className=" bg-amber-400 text-[rgb(250,0,0)] font-bold"> ERROR: {errors}</div> : null}
      <LexicalComposer initialConfig={initialConfig} className={"relative"}>
        <MyToolbarPlugin />
        <BannerPlugin />
        <input
          required={true}
          className="w-5/6 px-10 "
          placeholder="Add Title"
          onChange={(e) => {
            setBlogTitle(e.target.value);
          }}
        ></input>
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
      </LexicalComposer>
    </form>
  );
}

export default Editor;
