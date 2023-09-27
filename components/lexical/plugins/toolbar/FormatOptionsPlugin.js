"use client";
import React, { useContext } from "react";
import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
} from "react-icons/ai";
import { BiUndo, BiRedo, BiBookContent } from "react-icons/bi";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough } from "react-icons/fa";
import { Context } from "@/context/Context";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";

const FormatOptionsPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { currentEditorFormat } = useContext(Context);
  const formatOptions = [
    {
      category: "font",
      options: [
        {
          command: "bold",
          icon: (
            <FaBold
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
              }}
              title={"bold (Ctrl + B)"}
              size={25}
            />
          ),
          formatCodes: ["1", "3", "9", "11"],
        },
        {
          command: "italic",
          icon: (
            <FaItalic
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
              }}
              title={"italic (Ctrl + I)"}
              size={25}
            />
          ),
          formatCodes: ["2", "10", "11", "3"],
        },
        {
          command: "underline",
          icon: (
            <FaUnderline
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
              }}
              title={"underline (Ctrl + U)"}
              size={25}
            />
          ),
          formatCodes: ["8", "9", "10", "11"],
        },
      ],
    },
    {
      category: "direction",
      options: [
        {
          command: "ltr",
          icon: <AiOutlineAlignLeft onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
          }}  size={25} title="Align Content Left" />,
        },
        {
          command: "center",
          icon: <AiOutlineAlignCenter onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          }}  size={25} title="Align Content Center" />,
        },
        {
          command: "rtl",
          icon: <AiOutlineAlignRight onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
          }}  size={25} title="Align Content Right" />,
        },
      ],
    },
  ];

  return (
    <>
      {formatOptions.map((optionobj) => {
        return (
          <div key={`optionslist-${optionobj.category}`} className="flex">
            {optionobj["options"].map((option) => {
              if (
                option.formatCodes?.includes(`${String(currentEditorFormat)}`)
              ) {
                console.log(option.command);
                return (
                  <div key={`option-item-${option.command}`} className=" bg-gray-500 border-black border-solid border-[1px] shadow p-1">
                    {option.icon}
                  </div>
                );
              } else {
                console.log("else");
                return <div className=" p-1 border-[1px] border-transparent">{option.icon}</div>;
              }
            })}
          </div>
        );
      })}
    </>
  );
};

export default FormatOptionsPlugin;
