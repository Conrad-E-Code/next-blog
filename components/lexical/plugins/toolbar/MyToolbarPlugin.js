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


export default function MyToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="flex gap-1 w-fit mx-auto py-2">
      <MyHeaderPlugin />
      <MyListToolbarPlugin />
      <FormatOptionsPlugin />
      <HistoryToolbarPlugin />
      <InsertToolbarPlugin />
      {/* <MyBannerToolbarPlugin /> */}
      
    </div>
  );
}
