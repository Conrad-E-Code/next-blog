"use client";
import React from 'react'
import {useState} from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
const TableOfContentsPlugin = ({tableOfContents, initialShowHideBoolean}) => {
  const [editor] = useLexicalComposerContext();
  const [toggleShow, setToggleShow] =useState(initialShowHideBoolean)
   return (
    <div className="table-of-contents py-2">

   { !toggleShow? null :   <>  <h2>Table of Contents</h2> <ul>
      {tableOfContents.map(([key, text, tag]) => (
        <li key={key}>
          <div
            onClick={() => {
              editor.getElementByKey(key).scrollIntoView();
            }}
          >
            {text}
          </div>
        </li>
      ))}
    </ul></>}
    <div onClick={()=> {setToggleShow(prev => prev = !prev)}}  className='rounded bg-green-200 w-1/4' >{toggleShow ? "Hide Contents" : "Show Contents"}</div>
  </div>
  )
}

export default TableOfContentsPlugin