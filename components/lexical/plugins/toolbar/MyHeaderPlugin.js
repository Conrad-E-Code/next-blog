import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";

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
    <div>
      {["h1", "h2", "h3"].map((tag) => {
        return (
          <button
            key={`header-button-${tag}`}
            className="px-1 mx-4"
            onClick={() => {
              onClick(tag);
            }}
          >
            Add {tag}
          </button>
        );
      })}
    </div>
  );
}
