import React from "react";
import PropTypes from "prop-types";
import Layout from "./layout";
import NavBar from "./navBar";
import Title from "./title";
import CodeEditor from "./codeEditor";
import Preview from "./preview";
import { connect } from "react-redux";
import {
  updateCreation,
  setCssSource,
  setHtmlSource,
  setCssPreprocessor
} from "../../store/creation/actions";

import { UserMenu } from "./../menus";

const Editor = ({
  action,
  creation,
  setProp,
  setHtml,
  setCss,
  setCssPreprocessor
}) => (
  <Layout
    title={
      <Title value={creation.title} onChange={title => setProp({ title })} />
    }
    navBar={
      <NavBar
        tags={creation.tags}
        setProp={setProp}
        description={creation.description}
        action={action}
        id={creation.id}
      />
    }
    menuUser={<UserMenu ml="2" />}
    css={
      <CodeEditor
        language={creation.css.preprocessor}
        availableLanguages={["css", "scss"]}
        onChangeLanguage={setCssPreprocessor}
        value={creation.css.source}
        onChange={setCss}
      />
    }
    html={
      <CodeEditor
        language={creation.html.preprocessor}
        value={creation.html.source}
        onChange={setHtml}
      />
    }
    preview={<Preview 
      theme={creation.theme}
      alignment={creation.alignment}
      html={creation.html.processed} css={creation.css.processed} />}
  />
);

const mapStateToProps = state => ({
  creation: state.creation
});
const mapDispatchToProps = {
  setProp: updateCreation,
  setHtml: setHtmlSource,
  setCss: setCssSource,
  setCssPreprocessor
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);

Editor.protoTypes = {
  action: PropTypes.node.isRequired
};
