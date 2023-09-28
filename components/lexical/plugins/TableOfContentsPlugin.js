"use client";
import React from "react";
import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {  BiBookContent } from "react-icons/bi";
import {LuBookX} from "react-icons/lu"


const TableOfContentsPlugin = ({ tableOfContents, initialShowHideBoolean }) => {
  const [editor] = useLexicalComposerContext();
  const [toggleShow, setToggleShow] = useState(initialShowHideBoolean);
  return (
    <div className="z-50 py-2 w-fit">
      {!toggleShow ? null : (
        <div className="flex flex-col bg-blue-300/40 rounded shadow">
          {" "}
          <h2>Table of Contents</h2>{" "}
          <ul className="">
            {tableOfContents.map(([key, text, tag]) => (
              <li key={key}>
                <div className="cursor-pointer hover:bg-black/10"
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
      )}
      <div
        onClick={() => {
          setToggleShow((prev) => (prev = !prev));
        }}
        className="rounded w-fit"
      >
        {toggleShow ? <LuBookX title={"Hide table of contents"} size={25} /> : <BiBookContent title={"Show table of contents"} size={25} />}
      </div>
    </div>
  );
};

export default TableOfContentsPlugin;
