import { createContext } from "react";

export const defaultState = {
  id: null,
  hasUnsavedChanges: false,
  saving: false,
  title: "Untitled",
  description: "",
  tags: [],
  alignment: "normal",
  author: null,
  html: "",
  css: ""
};
export const EditorContext = createContext(null);
