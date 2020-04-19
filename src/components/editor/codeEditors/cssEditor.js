import React, { useEffect, useContext } from "react";
import CodeEditor from "./panel";
import { EditorContext } from "./../editorContext"
import { usePreprocess } from "../../../services/preprocess/";


export const CssEditor = () => {
    const { css, setCss } = useContext(EditorContext)
    const { processed, preprocess } = usePreprocess(css.preprocessor)
    
    const onChange = (source) => {
        setCss({ source })
        preprocess(source)
    }

    useEffect( () => {
        if( processed !== null) {
            setCss({ processed })
        }
    }, [ processed ])

    const setCssPreprocessor = (preprocessor) =>  setCss({preprocessor})

    return (
        <CodeEditor
            language={css.preprocessor}
            availableLanguages={["css", "scss"]}
            onChangeLanguage={setCssPreprocessor}
            value={css.source}
            onChange={onChange}
        />
    )

}  
