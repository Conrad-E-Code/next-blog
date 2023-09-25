import { COMMAND_PRIORITY_LOW } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  insertList,
} from "@lexical/list";

export default function MyListToolbarPlugin() {
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
            className="px-1 mx-4 bg-green-300 rounded"
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
}
