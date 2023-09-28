"use client";
import React, { useContext, useState } from "react";
import TreeViewPlugin from "./TreeViewPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import ImagesPlugin from "./ImagePlugin";
import { Context } from "@/context/Context";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";

const EditOnlyPluginGroup = ({userId}) => {
  const [editor] = useLexicalComposerContext()
  const [blogTitle, setBlogTitle] = useState();
  const {editorState} = useContext(Context)

  function handleFirstDraftSubmit() {
    console.log("Submitting...");
    console.log("EditorState:", editorState);
    console.log(editorState);
    const parsedState = JSON.parse(editorState);
    // console.log(parsedState["root"]["children"][0]["children"][0]["text"])

    if (!blogTitle) {
      setBlogTitle((prev) => (prev = `SUPER TITLE ${Math.random()}`));
      console.log("joe")
    }

    if (parsedState?.root?.children[0]?.children[0]?.text) {
      console.log("bill")
      setBlogTitle(
        (prev) =>
          (prev = parsedState["root"]["children"][0]["children"][0]["text"])
      );
    } else setBlogTitle((prev) => (prev = `SUPER TITLE ${Math.random()}`));
    if (editorState && blogTitle) {
      console.log("Title:", blogTitle);
      console.log("SUBMITTTING DRAFT");
      fetch("/api/blogs/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blogTitle,
          contentJSON: editorState,
          author: userId,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            console.log(data);
            editor.update(() => {
              $getRoot().clear();
            })

          });
        } else {
          r.json().then((err) => console(err["error"]));
        }
      });
    } else {
      console.log(editorState);
      console.log(blogTitle);
    }
  }

  return (
    <>
      {/* <TreeViewPlugin /> */}
      <HistoryPlugin />
      <ImagesPlugin captionsEnabled={false} />

      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleFirstDraftSubmit();
        }}
      >
        TEST
      </button>
    </>
  );
};

export default EditOnlyPluginGroup;
