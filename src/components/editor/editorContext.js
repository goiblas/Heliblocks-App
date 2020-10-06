import { createContext } from "react";

export const defaultState = {
  id: null,
  saving: false,
  publishing: false,
  hasUnsavedChanges: false,
  title: "Untitled",
  description: "",
  tags: [],
  alignment: "normal",
  author: null,
  html: "",
  css: "",
  additionalLinks: "",
  published: false,
  restricted: false,
  draft: true,
};
export const EditorContext = createContext(null);
