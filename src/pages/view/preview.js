import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import useMockup from "./useMockup";

const Screen = ({ html, css, alignment, theme }) => {
  const iframeRef = useRef(null);
  const content = `<style>${css.processed}</style>${html.processed}`;
  const [mockup] = useMockup({ content, alignment, theme });

  useEffect(() => {
    const iframe = iframeRef.current.contentWindow.document;
    iframe.open();
    iframe.writeln(mockup);
    iframe.close();
  }, [mockup]);

  return <IframeStyled title="Preview" ref={iframeRef} />;
};

export default Screen;

const IframeStyled = styled.iframe`
  border: 0;
  width: 100%;
  height: 100%;
`;
