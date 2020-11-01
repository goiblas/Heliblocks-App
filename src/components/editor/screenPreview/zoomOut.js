import React, { useState } from "react";
import styled from "@emotion/styled";
import RadioButtonGroup from "components/radioButtonGroup";
import PropTypes from "prop-types";

const ZoomOut = ({ children }) => {
  const [zoom, setZoom] = useState(1);

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
        <RadioButtonGroup defaultValue={zoom} size="xs" onChange={setZoom}>
          <RadioButtonGroup.Radio data-testid="button-zoom-100" value={1}>
            100%
          </RadioButtonGroup.Radio>
          <RadioButtonGroup.Radio data-testid="button-zoom-50" value={2}>
            50%
          </RadioButtonGroup.Radio>
          <RadioButtonGroup.Radio data-testid="button-zoom-25" value={4}>
            25%
          </RadioButtonGroup.Radio>
        </RadioButtonGroup>
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
