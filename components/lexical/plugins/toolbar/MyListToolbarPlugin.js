"use client";
import { COMMAND_PRIORITY_LOW } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  insertList,
} from "@lexical/list";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { Context } from "@/context/Context";
import { useContext } from "react";
import { $handleListInsertParagraph } from "@lexical/list";
import { LuListEnd } from "react-icons/lu";

export default function MyListToolbarPlugin() {
  const { userInsideList } = useContext(Context);
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
      //   console.log(INSERT_ORDERED_LIST_COMMAND);
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      //   console.log(INSERT_UNORDERED_LIST_COMMAND);
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  }
  return (
    <div className="flex gap-1">
      {/* identify list */}
      {["ul", "ol"].map((tag) => {
        function listType(tag) {
          switch (tag) {
            case "ul":
              return "Bullet List";
            case "ol":
              return "Number List";
            default:
              return "List";
          }
        }
        const thisList = listType(tag);
        if (thisList && thisList === "Number List")
          return (
            <AiOutlineOrderedList
              size={25}
              title={`insert ${thisList}`}
              key={`header-button-${tag}`}
              onClick={() => {
                onClick(tag);
              }}
            />
            //   <button
            //     title={`insert ${thisList}`}
            //     key={`header-button-${tag}`}
            //     className="px-1 mx-4 bg-green-300 rounded"

            //   >
            //     Add {tag}
            //   </button>
          );
        else if (thisList && thisList === "Bullet List") {
          return (
            <AiOutlineUnorderedList
              title={`insert ${thisList}`}
              key={`header-button-${tag}`}
              onClick={() => {
                onClick(tag);
              }}
              size={25}
            />
          );
        }
      })}
      {userInsideList ? (
        <LuListEnd size={25} title="Exit List (Insert Paragraph)"           onClick={() => {
            // parentIsListOrItem()
            editor.update(() => $handleListInsertParagraph());
          }} />
      ) : null}
    </div>
  );
}
