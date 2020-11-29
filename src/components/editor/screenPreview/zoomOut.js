import React, { useState } from "react";
import styled from "@emotion/styled";
import ToggleButtons from "components/toggleButtons";
import PropTypes from "prop-types";

const zoomAvailables = [
  { label: "100%", value: "1" },
  { label: "50%", value: "2" },
  { label: "25%", value: "4" },
];
const ZoomOut = ({ children }) => {
  const [zoom, setZoom] = useState("1");

  return (
    <Wrapper>
      <div
        data-testid="container-zoom"
        style={{
          width: `${zoom * 100}%`,
          height: `${zoom * 100}%`,
          transform: `scale(${1 / zoom})`,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
      <ButtonGroup>
        <ToggleButtons
          options={zoomAvailables}
          name="zoom"
          value={zoom}
          onChange={setZoom}
          size="xs"
        />
      </ButtonGroup>
    </Wrapper>
  );
};

ZoomOut.propTypes = {
  children: PropTypes.node,
};
export default ZoomOut;

const Wrapper = styled.div`
  position: relative;
`;
const ButtonGroup = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;
