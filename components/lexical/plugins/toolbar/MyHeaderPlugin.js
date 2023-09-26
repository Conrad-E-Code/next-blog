import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import {LuHeading2, LuHeading3} from "react-icons/lu"
import {FaHeading} from "react-icons/fa"

export default function MyHeaderPlugin() {
  const [editor] = useLexicalComposerContext();

  function onClick(tag) {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  }
  return (
    <div className="flex flex-col">
      {["h1", "h2", "h3"].map((tag) => {
                function headingType(tag) {
                    switch (tag) {
                        case "h1": return <FaHeading  title="Insert Large Heading" key={`header-button-${tag}`} size={25} onClick={() => {onClick(tag)}}/>
                        case "h2": return <LuHeading2 title="Insert Medium Heading" key={`header-button-${tag}`} size={25} onClick={() => {onClick(tag)}}/>
                        case "h3": return <LuHeading3 title="Insert Small Heading" key={`header-button-${tag}`} size={25} onClick={() => {onClick(tag)}}/>
                        default: return "Heading"
                    }
                }

        return (
        //   <div
        //   title={`insert heading (size: ${tag})`}
        //     key={`header-button-${tag}`}
        //     className="px-1 mx-4"
        //     onClick={() => {
        //       onClick(tag);
        //     }}
        //   >
        //     Add {tag}
        //   </div>
        headingType(tag)
        );
      })}
    </div>
  );
}
