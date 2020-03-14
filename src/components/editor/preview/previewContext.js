import { createContext } from "react";
export const PreviewContext = createContext({
    html: "",
    alignment: "normal",
    setAlignment: () => {},
    theme: "",
    setTheme: () => {}
})