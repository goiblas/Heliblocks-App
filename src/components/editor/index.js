import React, { useReducer, useState, useEffect } from "react";
import useMediaQuery from "react-use-media-query-hook";
import DesktopEditor from "./desktop";
import MobileEditor from "./mobile";

import { EditorContext, defaultState } from "./editorContext"

const Editor = ({ onSave }) => {
  const [ state, setState ] = useState(defaultState)
  const handleStateChanges = newState => setState({ ...newState, hasUnsavedChanges: true})

  // const [ state, setState ] = useReducer(
  //   (state, newState) => ({ ...state, ...newState, hasUnsavedChanges: true }),
  //   // @TODO merge with props
  //   defaultState
  // )

  const setHtml = html => setState({ ...state, html: {...state.html, ...html} })
  const setCss = css => setState({ ...state, css: {...state.css, ...css} })

  // @TODO clean state for send
  const save = () => onSave(state)
  const isDesktop = useMediaQuery("(min-width: 880px)");

  return (
    <EditorContext.Provider value={{...state, setState: handleStateChanges, setHtml, setCss, save }}>
      {isDesktop ? ( <DesktopEditor /> ) : ( <MobileEditor /> ) }
    </EditorContext.Provider>
      )
}

export default Editor;