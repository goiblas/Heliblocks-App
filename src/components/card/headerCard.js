import React from "react";
import PropTypes from "prop-types";
import { Box, Image } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { IMAGE_HEIGHT, IMAGE_WIDTH } from "./index";

const HeaderCard = ({ id, image }) => (
  <Box
    as={Link}
    to={"/heliblock/" + id}
    display="block"
    backgroundColor="gray.50"
  >
    <WrapperImage width={IMAGE_WIDTH} height={IMAGE_HEIGHT}>
      <CoverImage rounded="sm" opacity=".8" src={image} />
      <Shadow />
    </WrapperImage>
  </Box>
);

HeaderCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default HeaderCard;

const WrapperImage = styled.div`
  position: relative;
  padding-bottom: ${props => `calc(${props.height}/${props.width} * 100%)`};
`;
const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(1px);
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) calc(100% - 40px),
    rgba(0, 0, 0, 0.02) 100%
  );
`;
const CoverImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
