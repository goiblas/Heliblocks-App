import React from "react";
import { setCssPreprocessor, setCssSource } from "./../../../store/creation/actions";
import CodeEditor from "./panel";
import { connect } from "react-redux";

const HtmlEditor = ({ css, setCss, setCssPreprocessor }) => (
    <CodeEditor
        language={css.preprocessor}
        availableLanguages={["css", "scss"]}
        onChangeLanguage={setCssPreprocessor}
        value={css.source}
        onChange={setCss}
  />
) 
const mapStateToProps = state => ({
    css: state.creation.css
});
const mapDispatchToProps = {
    setCss: setCssSource,
    setCssPreprocessor
};

export default connect(mapStateToProps, mapDispatchToProps)(HtmlEditor);
  