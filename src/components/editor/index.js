import React, { useState, useEffect } from "react";
import useMediaQuery from "react-use-media-query-hook";
import DesktopEditor from "./desktop";
import MobileEditor from "./mobile";
import { EditorContext, defaultState } from "./editorContext";
import { useBeforeUnload } from "hooks";
import { Prompt } from "react-router-dom";

const preventHtmlErrors = (data) => {
  const container = document.createElement("div");
  container.innerHTML = data;
  return container.innerHTML;
};

const createExportableHeliblock = (heliblock) => ({
  title: heliblock.title,
  description: heliblock.description,
  tags: heliblock.tags,
  alignment: heliblock.alignment,
  html: preventHtmlErrors(heliblock.html),
  css: heliblock.css,
  restricted: heliblock.restricted,
  additionalLinks: heliblock.additionalLinks,
});

const unloadMessage = "Changes may not be saved";

const Editor = ({ onSave, onPublish, saving, publishing, ...props }) => {
  const [state, setState] = useState(Object.assign(defaultState, props));

  useBeforeUnload({
    when: state.hasUnsavedChanges,
    message: { unloadMessage },
  });

  const handleStateChanges = (newState) =>
    setState((prevState) => ({
      ...prevState,
      ...newState,
      hasUnsavedChanges: true,
    }));

  const isDesktop = useMediaQuery("(min-width: 880px)");

  useEffect(() => {
    setState((prevState) => ({ ...prevState, saving }));
  }, [saving]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, publishing }));
  }, [publishing]);

  const save = () => {
    setState((prevState) => ({ ...prevState, hasUnsavedChanges: false }));
    onSave({ ...createExportableHeliblock(state), draft: true });
  };

  const publish = () => {
    setState((prevState) => ({
      ...prevState,
      hasUnsavedChanges: false,
      draft: false,
    }));
    onPublish({ ...createExportableHeliblock(state), draft: false });
  };

  return (
    <EditorContext.Provider
      value={{ ...state, setState: handleStateChanges, save, publish }}
    >
      <Prompt when={state.hasUnsavedChanges} message={unloadMessage} />
      {isDesktop ? <DesktopEditor /> : <MobileEditor />}
    </EditorContext.Provider>
  );
};

export default Editor;
