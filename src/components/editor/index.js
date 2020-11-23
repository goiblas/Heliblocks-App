import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { useToast } from "@chakra-ui/core";
import DesktopEditor from "./desktop";
import MobileEditor from "./mobile";
import { EditorContext, defaultState } from "./editorContext";
import { useBeforeUnload } from "hooks";
import { Prompt } from "react-router-dom";
import sizeof from "object-sizeof";

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
const MAX_SIZE = 92000;

const Editor = ({ onSave, onPublish, saving, publishing, ...props }) => {
  const [state, setState] = useState(Object.assign(defaultState, props));
  const toast = useToast();

  const showToastLimitSize = () =>
    toast({
      title: "Could not be saved",
      description: "It is longer than 92000 bytes",
      status: "error",
      duration: 5000,
      isClosable: true,
    });

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
    if (sizeof(state) > MAX_SIZE) {
      showToastLimitSize();
    } else {
      setState((prevState) => ({ ...prevState, hasUnsavedChanges: false }));
      onSave({ ...createExportableHeliblock(state), draft: true });
    }
  };

  const publish = () => {
    if (sizeof(state) > MAX_SIZE) {
      showToastLimitSize();
    } else {
      setState((prevState) => ({
        ...prevState,
        hasUnsavedChanges: false,
        draft: false,
      }));
      onPublish({ ...createExportableHeliblock(state), draft: false });
    }
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
