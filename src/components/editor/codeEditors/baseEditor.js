import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Editor from "@monaco-editor/react";
import { ControlledEditor } from "@monaco-editor/react";

// https://monaco-react.surenatoyan.com/
// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
const options = {
  contextmenu: false,
  minimap: {
    enabled: false,
  },
  scrollbar: {
    verticalScrollbarSize: 0,
  },
  suggestOnTriggerCharacters: false,
};
const theme = "light";
const BaseEditor = ({ language, value, onChange, ...rest }) => {
  const editorRef = useRef();
  const handleEditorChange = (ev, newValue) => {
    onChange(newValue);
  };
  const handleEditorDidMount = (_, editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    const listener = () => {
      if (editorRef) editorRef.current.layout();
    };
    window.addEventListener("editor-resize", listener);

    return () => window.removeEventListener("editor-resize", listener);
  }, [editorRef]);
  return (
    <ControlledEditor
      value={value}
      onChange={handleEditorChange}
      theme={theme}
      language={language}
      options={options}
      editorDidMount={handleEditorDidMount}
      ref={editorRef}
      {...rest}
    />
  );
};
BaseEditor.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default BaseEditor;
