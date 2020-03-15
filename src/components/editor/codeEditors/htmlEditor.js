import React from "react";
import { setHtmlSource } from "./../../../store/creation/actions";
import CodeEditor from "./panel";
import { connect } from "react-redux";

const HtmlEditorComponent = ({ html, setHtml }) => (
    <CodeEditor
        language={html.preprocessor}
        value={html.source}
        onChange={setHtml}
      />
) 
const mapStateToProps = state => ({
    html: state.creation.html
});
const mapDispatchToProps = {
    setHtml: setHtmlSource,
};
export const HtmlEditor = connect(mapStateToProps, mapDispatchToProps)(HtmlEditorComponent);
