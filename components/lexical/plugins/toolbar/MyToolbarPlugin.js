"use client";
import { Link as ScrollLink, Element } from "react-scroll";
import {
  $createTextNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import LexicalTableOfContentsPlugin from "@lexical/react/LexicalTableOfContents";
import { useEffect, useState } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { $createHeadingNode } from "@lexical/rich-text";
import {
  TableNode,
  TableCellNode,
  INSERT_TABLE_COMMAND,
  $insertTableRow,
  $insertTableColumn,
} from "@lexical/table";
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
} from "../BannerPlugin";

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
  editor.registerCommand(
    INSERT_ORDERED_LIST_COMMAND,
    () => {
      insertList(editor, "number");
      return true;
    },
    COMMAND_PRIORITY_LOW
  );

  function onClick(tag) {
    if (tag === "ol") {
      console.log(INSERT_ORDERED_LIST_COMMAND);
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      console.log(INSERT_UNORDERED_LIST_COMMAND);
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
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

export default function MyToolbarPlugin() {
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
        LOAD EDITOR TEMPLATE
      </button>
    </div>
  );
}
