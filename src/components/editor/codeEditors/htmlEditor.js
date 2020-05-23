import React, { useContext, useEffect } from "react";
import CodeEditor from "./panel";
import { EditorContext } from "./../editorContext"
import { usePreprocess } from "../../../services/preprocess";

export const HtmlEditor = () => {
    const { html, setHtml } = useContext(EditorContext)
    const { processed, preprocess } = usePreprocess(html.preprocessor)

    const onChange = (source) => {
        setHtml({ source })
        preprocess(source)
    }
    
    useEffect( () => {
        if( processed !== null) {
            setHtml({ processed })
        }
    }, [ processed ])

    return (
        <CodeEditor
            language={html.preprocessor}
            value={html.source}
            onChange={onChange}
            />
    )
}
