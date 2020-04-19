import { createContext } from "react"

export const defaultState = {
    id: null,
    hasUnsavedChanges: false,
    saving: false,
    title: "Untitled",
    description: "",
    tags: [],
    theme: "twentynineteen",
    alignment: "normal",
    html: {
      processed: "",
      preprocessor: "html",
      source: ""
    },
    css: {
      processed: "",
      preprocessor: "css",
      source: ""
    }
  };
export const EditorContext = createContext(null)  