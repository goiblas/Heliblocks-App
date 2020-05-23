import React, { useRef, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import ZoomOut from "./zoomOut";
import useMockup from "./useMockup";
import { EditorContext } from "./../editorContext"

const Screen = () => {
  const iframeRef = useRef(null);
  const { html, css, alignment, theme } = useContext( EditorContext) 
  const content = `<style>${css.processed}</style>${html.processed}`;
  const [ mockup ] = useMockup({content, alignment, theme});
  
  useEffect(() => {
    const iframe = iframeRef.current.contentWindow.document;
    iframe.open();
    iframe.writeln(mockup);
    iframe.close();
  },[mockup]);

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
