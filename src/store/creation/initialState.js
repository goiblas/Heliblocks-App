export const INITIAL_STATE = {
  id: null,
  notFound: false,
  hasUnsavedChanges: false,
  saving: false,
  title: "Untitled",
  description: "",
  tags: [],
  template: null,
  theme: "twentytwenty",
  author: null,
  createdAt: null,
  lastUpdate: null,
  publised: true,
  alignment: "normal",
  html: {
    processed: "",
    preprocessor: "html",
    source: "",
    processing: false,
    error: null
  },
  css: {
    processed: "",
    preprocessor: "scss",
    source: "",
    processing: false,
    error: null
  }
};
