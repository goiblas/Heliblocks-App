import React, { useContext } from "react";
import CodeEditor from "./panel";
import { EditorContext } from "./../editorContext";

export const HtmlEditor = () => {
  const { html, setState } = useContext(EditorContext);

  const onChange = html => setState({ html });

  return <CodeEditor language="html" value={html} onChange={onChange} />;
};
