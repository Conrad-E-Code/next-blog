import React from "react";
import TreeViewPlugin from "./TreeViewPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import ImagesPlugin from "./ImagePlugin";

const EditOnlyPluginGroup = ({userId}) => {
  function handleSubmit() {
    // Pessimistic CLear Editor after fetch success
    console.log("Submitting...");
    console.log("EditorState:", editorState);
    const parsedState = JSON.parse(editorState);
    console.log(parsedState["root"]["children"][0]["children"][0]["text"]);
    console.log("Title:", blogTitle);
    if (editorState && blogTitle) {
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
          });
        } else {
          r.json().then((err) => setErrors(err["error"]));
        }
      });
    }
  }

  function handleFirstDraftSubmit() {
    console.log("Submitting...");
    console.log("EditorState:", editorState);
    console.log(editorState);
    const parsedState = JSON.parse(editorState);
    // console.log(parsedState["root"]["children"][0]["children"][0]["text"])

    if (!blogTitle) {
      setBlogTitle((prev) => (prev = `SUPER TITLE ${Math.random()}`));
    }

    if (parsedState?.root?.children?.[0]?.children?.[0]?.text) {
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
          handleSubmit();
        }}
      >
        SUBMIT
      </button>
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
