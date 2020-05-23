import React, { useReducer, useState, useEffect } from "react";
import useMediaQuery from "react-use-media-query-hook";
import DesktopEditor from "./desktop";
import MobileEditor from "./mobile";
import { EditorContext, defaultState } from "./editorContext";

const createExportableHeliblock = heliblock => ({
  title: heliblock.title,
  description: heliblock.description,
  tags: heliblock.tags,
  alignment: heliblock.alignment,
  html: heliblock.html,
  css: heliblock.css
});

const Editor = ({ onSave, saving, ...props }) => {
  const initialState = Object.assign({}, defaultState, props);
  const [state, setState] = useState(initialState);
  const handleStateChanges = newState =>
    setState({ ...state, ...newState, hasUnsavedChanges: true });

  const isDesktop = useMediaQuery("(min-width: 880px)");

  useEffect(() => {
    if (state.saving !== saving) {
      setState({ ...state, saving });
    }
  }, [saving]);

  const save = () => onSave(createExportableHeliblock(state));

  return (
    <EditorContext.Provider
      value={{ ...state, setState: handleStateChanges, save }}
    >
      {isDesktop ? <DesktopEditor /> : <MobileEditor />}
    </EditorContext.Provider>
  );
};

export default Editor;
