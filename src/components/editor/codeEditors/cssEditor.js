import React, { useContext } from "react";
import CodeEditor from "./panel";
import { EditorContext } from "./../editorContext";

export const CssEditor = () => {
  const { css, setState } = useContext(EditorContext);

  const onChange = css => setState({ css });

  return <CodeEditor language="css" value={css} onChange={onChange} />;
};
