import React from "react";
import PropTypes from "prop-types";
import { Box, Image, AspectRatioBox } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const IMAGE_WIDTH = 840;
const IMAGE_HEIGHT = 640;

const HeaderCard = ({ id, image }) => (
  <Box
    as={Link}
    to={"/heliblock/" + id}
    display="block"
    backgroundColor="gray.50"
  >
    <AspectRatioBoxWithShadow ratio={IMAGE_WIDTH / IMAGE_HEIGHT}>
      <Image src={ image } alt="" objectFit="cover" rounded="sm" opacity=".8" />
    </AspectRatioBoxWithShadow>
  </Box>
);

HeaderCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default HeaderCard;

const AspectRatioBoxWithShadow = styled(AspectRatioBox)`
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      filter: blur(1px);
      background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) calc(100% - 40px),
        rgba(0, 0, 0, .02) 100%
      );
    }
`