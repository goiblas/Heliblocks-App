import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styled from "@emotion/styled";

// https://conorhastings.github.io/react-syntax-highlighter/demo/
const CodeViewer = ({ language, code }) => {
  return (
    <Pre showLineNumbers={true} language={language} style={githubGist}>
      {code}
    </Pre>
  );
};

export default CodeViewer;

const Pre = styled(SyntaxHighlighter)`
  height: 100%;
  font-family: "SF Mono", "Monaco", "Andale Mono", "Lucida Console",
    "Bitstream Vera Sans Mono", "Courier New", Courier, monospace;

  .react-syntax-highlighter-line-number {
    font-size: 11px;
    opacity: 0.4;
  }
`;
