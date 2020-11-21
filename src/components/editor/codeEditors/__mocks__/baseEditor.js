import React, { useState, useEffect } from "react";

const Editor = ({ language, value: initValue, onChange, ...rest }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(initValue);
  }, [initValue]);
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  return (
    <textarea
      data-testid={`editor-${language}`}
      onChange={handleChange}
      value={value}
    />
  );
};

export default Editor;
