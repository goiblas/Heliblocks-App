import React from "react";
import PropTypes from "prop-types";
import { Box, Image, AspectRatioBox } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "./index"

const HeaderCard = ({ image }) => (
  <Box
    display="block"
    backgroundColor="gray.50"
  >
    <AspectRatioBoxWithShadow ratio={IMAGE_WIDTH / IMAGE_HEIGHT}>
      <Image src={ image } alt="" objectFit="cover" rounded="sm" opacity=".8" />
    </AspectRatioBoxWithShadow>
  </Box>
);

HeaderCard.propTypes = {
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
      border: 0;
      border: 0;
      background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) calc(100% - 40px),
        rgba(0, 0, 0, .02) 100%
      );
    }
`