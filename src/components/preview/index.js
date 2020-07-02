import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import useMockup from "./useMockup";

const Preview = ({ html, css, alignment, additionalLinks }) => {
  const iframeRef = useRef(null);
  const content = `<style>${css}</style>${html}`;
  const [mockup] = useMockup({ content, alignment, additionalLinks });

  useEffect(() => {
    const iframe = iframeRef.current.contentWindow.document;
    iframe.open();
    iframe.writeln(mockup);
    iframe.close();
  }, [mockup]);

  return <IframeStyled title="Preview" ref={iframeRef} />;
};

export default Preview;

const IframeStyled = styled.iframe`
  border: 0;
  width: 100%;
  height: 100%;
`;
