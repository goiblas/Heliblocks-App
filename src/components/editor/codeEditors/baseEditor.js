import React from "react";
import PropTypes from "prop-types";
import { ControlledEditor } from "@monaco-editor/react";

// https://monaco-react.surenatoyan.com/
// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
const options = {
  contextmenu: false,
  minimap: {
    enabled: false
  },
  scrollbar: {
    verticalScrollbarSize: 0
  },
  suggestOnTriggerCharacters: false
};
const theme = "light";

const BaseEditor = ({ language, value, onChange, ...rest }) => {
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
BaseEditor.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
export default BaseEditor;
