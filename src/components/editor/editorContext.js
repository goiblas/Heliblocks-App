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
  css: "",
  additionalLinks: ""
};
export const EditorContext = createContext(null);
