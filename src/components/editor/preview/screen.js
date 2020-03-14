import React, { useRef, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { PreviewContext } from './previewContext';
import ZoomOut from "./zoomOut";

const Screen = () => {
  const iframeRef = useRef(null);
  const { html } = useContext(PreviewContext);

  useEffect(() => {
    const iframe = iframeRef.current.contentWindow.document;
    iframe.open();
    iframe.writeln(html);
    iframe.close();
  }, [html]);

  return (
    <ZoomOut>
      <IframeStyled
        title="Preview"
        ref={iframeRef}
        />
    </ZoomOut>
  );
};

export default Screen;

const IframeStyled = styled.iframe`
  border: 0;
  width: 100%;
  height: 100%;
`;
