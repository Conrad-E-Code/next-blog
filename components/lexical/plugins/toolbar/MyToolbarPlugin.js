"use client";
import FormatOptionsPlugin from "./FormatOptionsPlugin";
import MyBannerToolbarPlugin from "@/components/lexical/plugins/toolbar/MyBannerToolbarPlugin"
import MyListToolbarPlugin from "./MyListToolbarPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import MyHeaderPlugin from "./MyHeaderPlugin";
import {BsCodeSlash} from "react-icons/bs"
import {CgLink} from "react-icons/cg"
import HistoryToolbarPlugin from "./HistoryToolbarPlugin";
import InsertToolbarPlugin from "./InsertToolbarPlugin";
import FontSelector from "@/components/lexical/plugins/toolbar/FontSelector"
import { Inter, Roboto, Open_Sans  } from 'next/font/google'

import {useState} from "react"



export default function MyToolbarPlugin({handleFontTypeChange, handleFontSizeChange, fontSize, fontType}) {


  const [editor] = useLexicalComposerContext();


  return (
    <div className="flex gap-1 w-fit mx-auto py-2">
      <MyHeaderPlugin />
      <MyListToolbarPlugin />
      <FormatOptionsPlugin />
      <HistoryToolbarPlugin />
      <InsertToolbarPlugin />
      {/* <MyBannerToolbarPlugin /> */}
      <FontSelector
        fontSize={fontSize}
        fontType={fontType}
        onFontSizeChange={handleFontSizeChange}
        onFontTypeChange={handleFontTypeChange}
      />
      
    </div>
  );
}
