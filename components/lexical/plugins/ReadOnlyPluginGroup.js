import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect } from "react";

const ReadOnlyPluginGroup = ({ blog }) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (blog) {
      editor.update(() => {
        editor.setEditorState(editor.parseEditorState(blog.contentJSON));
      });
    }
  }, []);
  return <div>ReadOnlyPluginGroup</div>;
};

export default ReadOnlyPluginGroup;
