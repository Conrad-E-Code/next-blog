import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";
import { AiOutlineFileImage, AiOutlineLink } from "react-icons/ai";
import useModal from "@/hooks/useModal";
import { InsertImageDialog } from "../ImagePlugin";
const InsertToolbarPlugin = () => {
  const [modal, showModal] = useModal();
  const [editor] = useLexicalComposerContext();
  const iconSize = 25;
  const iconWrapperClass = "p-1 border-[1px] border-transparent";

  function handleInsertImage() {
    showModal("Insert Image", (onClose) => (
      <InsertImageDialog activeEditor={editor} onClose={onClose} />
    ));
  }
  return (
    <div className=" flex">
      <div className={iconWrapperClass}>
        <AiOutlineLink size={iconSize} />
      </div>
      <div className={iconWrapperClass}>
        <AiOutlineFileImage size={iconSize} onClick={handleInsertImage} />
      </div>
      {modal}
    </div>
  );
};

export default InsertToolbarPlugin;
