import React from "react";
import { BiUndo, BiRedo, BiBookContent } from "react-icons/bi";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { REDO_COMMAND, UNDO_COMMAND } from "lexical";

const HistoryToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const optionSize = 25;
  const historyOptions = [
    {
      command: "undo",
      icon: (
        <BiUndo
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND);
          }}
          size={optionSize}
        />
      ),
    },
    { command: "redo", icon: <BiRedo
    onClick={() => {
        editor.dispatchCommand(REDO_COMMAND)
    }} size={optionSize} /> },
  ];
  return (
    <div className="flex">
      {historyOptions.map((option) => {
        return (
          <div className="p-1 border-[1px] border-transparent">
            {option.icon}
          </div>
        );
      })}
    </div>
  );
};

export default HistoryToolbarPlugin;
