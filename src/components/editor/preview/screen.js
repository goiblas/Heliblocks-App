import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import ZoomOut from "./zoomOut";
import useMockup from "./useMockup";
import { connect } from "react-redux";

const Screen = ({html, css, alignment, theme}) => {
  const iframeRef = useRef(null);
  const content = `<style>${css}</style>${html}`;
  const [ mockup ] = useMockup({content, css, alignment, theme});
  
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

const mapStateToProps = state =>({
  html: state.creation.html.processed,
  css: state.creation.css.processed,
  alignment: state.creation.alignment,
  theme: state.creation.theme
})
export default connect(mapStateToProps)(Screen);

const IframeStyled = styled.iframe`
  border: 0;
  width: 100%;
  height: 100%;
`;
