import React, { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import Editor from "@monaco-editor/react";

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
const BaseEditor = ({ language, value: providedValue, onChange, ...rest }) => {
  const editor = useRef(null);
  const listener = useRef(null);
  const value = useRef(providedValue);

  value.current = providedValue;

  const handleEditorModelChange = useCallback(
    (event) => {
      const editorValue = editor.current.getValue();

      if (value.current !== editorValue) {
        onChange(editorValue);
      }
    },
    [onChange]
  );

  const attachChangeEventListener = useCallback(() => {
    listener.current = editor.current?.onDidChangeModelContent(
      handleEditorModelChange
    );
  }, [handleEditorModelChange]);

  useEffect(() => {
    attachChangeEventListener();
    return () => listener.current?.dispose();
  }, [attachChangeEventListener]);

  const handleEditorDidMount = useCallback(
    (getValue, _editor) => {
      editor.current = _editor;
      attachChangeEventListener();
    },
    [attachChangeEventListener]
  );

  useEffect(() => {
    const listener = () => editor.current?.layout();
    window.addEventListener("editor-resize", listener);

    return () => window.removeEventListener("editor-resize", listener);
  }, [editor]);

  return (
    <Editor
      value={providedValue}
      theme={theme}
      language={language}
      options={options}
      editorDidMount={handleEditorDidMount}
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
