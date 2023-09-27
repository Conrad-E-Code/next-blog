"use client";
import React, {useContext} from "react";
import { BiUndo, BiRedo, BiBookContent } from "react-icons/bi";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough } from "react-icons/fa";
import { Context } from "@/context/Context";

const FormatOptionsPlugin = () => {
    const {currentEditorFormat} = useContext(Context)
  const formatOptions = [
    {
      category: "font",
      options: [
        { command: "bold", icon: <FaBold title={"bold (Ctrl + B)"} size={25}/>, formatCodes: ["1","3","9","11"] },
        { command: "italic", icon: <FaItalic title={"italic (Ctrl + I)"} size={25} />, formatCodes:["2","10","11", "3"] },
        { command: "underline", icon: <FaUnderline title={"underline (Ctrl + U)"} size={25}/>, formatCodes: ["8","9","10","11"] },
      ],
    },
    { category: "direction", options: ["ltr", "rtl", "center"] },
  ];

  return (
    <>
      {formatOptions.map((optionobj) => {
        return (
          <div className="flex gap-1">
            {optionobj["options"].map((option) => {
                if (option.formatCodes?.includes(`${String(currentEditorFormat)}`)) {
                    console.log(option.command)
                    return (<div className="p-1 bg-gray-500 rounded shadow">{option.icon}</div>)
                }
                else {
                    console.log("else")
              return (
                <>{option.icon}</>
              )}
            })}
          </div>
        );
      })}
    </>
  );
};

export default FormatOptionsPlugin;
