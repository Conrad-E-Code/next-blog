// Dont client here because of weird error
import React from "react";
import Editor from "./lexical/Editor";

const EditorContainer = ({ userId, editable, blog }) => {
  //  if (!session) {
  //   return (<div>Not Authorized</div>)
  //  }
  //  else
  return (
    <div className="justify-center text-center bg-blue-600 border-2 min-w-4/5">
      <Editor userId={userId} editable={editable} blog={blog} />
    </div>
  );
};

export default EditorContainer;
