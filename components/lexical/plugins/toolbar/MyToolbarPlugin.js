"use client";
import FormatOptionsPlugin from "./FormatOptionsPlugin";
import MyBannerToolbarPlugin from "@/components/lexical/plugins/toolbar/MyBannerToolbarPlugin"
import MyListToolbarPlugin from "./MyListToolbarPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import MyHeaderPlugin from "./MyHeaderPlugin";
import {AiOutlineOrderedList, AiOutlineUnorderedList, AiOutlineFileImage, } from "react-icons/ai"
import {BsCodeSlash} from "react-icons/bs"
import {CgLink} from "react-icons/cg"
import HistoryToolbarPlugin from "./HistoryToolbarPlugin";
import InsertToolbarPlugin from "./InsertToolbarPlugin";

// import {
//   TableNode,
//   TableCellNode,
//   INSERT_TABLE_COMMAND,
//   $insertTableRow,
//   $insertTableColumn,
// } from "@lexical/table";


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


// <FaArrowCircleLeft
// onClick={prevSlide}
// style={{color: Colors[textClr]}}
// className={`z-40 cursor-pointer absolute left-[20px] top-[35px] ease-in-out duration-1000`}
// size={50}
// />