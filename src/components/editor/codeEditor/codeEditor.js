import React from "react";
import PropTypes from "prop-types";
import { ControlledEditor } from "@monaco-editor/react";
import { options, theme } from "./config";

// https://monaco-react.surenatoyan.com/
// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html

const CodeEditor = ({ language, value, onChange, ...rest }) => {
  const handleEditorChange = (ev, newValue) => {
    onChange(newValue);
  };

  return (
    <ControlledEditor
      value={value}
      onChange={handleEditorChange}
      theme={theme}
      language={language}
      options={options}
      {...rest}
    />
  );
};
CodeEditor.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
export default CodeEditor;
