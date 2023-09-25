import { INSERT_BANNER_COMMAND } from "../BannerPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export default function  MyBannerToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  function onClick() {
    console.log();
    editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined);
  }

  return <button onClick={onClick}> Insert Banner</button>;
};