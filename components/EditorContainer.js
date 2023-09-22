// Dont client here because of weird error
import React from "react";
import Editor from "./Editor";

const EditorContainer = async ({userId}) => {

  //  if (!session) {
  //   return (<div>Not Authorized</div>)
  //  }
  //  else
  return (
    <div className="justify-center text-center bg-blue-600">
      <Editor userId={userId} />
    </div>
  );
};

export default EditorContainer;
