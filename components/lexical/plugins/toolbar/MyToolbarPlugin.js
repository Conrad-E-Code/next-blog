"use client";
import MyBannerToolbarPlugin from "@/components/lexical/plugins/toolbar/MyBannerToolbarPlugin"
import MyListToolbarPlugin from "./MyListToolbarPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import MyHeaderPlugin from "./MyHeaderPlugin";
// import {
//   TableNode,
//   TableCellNode,
//   INSERT_TABLE_COMMAND,
//   $insertTableRow,
//   $insertTableColumn,
// } from "@lexical/table";
import { $handleListInsertParagraph } from "@lexical/list";

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
      <MyBannerToolbarPlugin />
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
