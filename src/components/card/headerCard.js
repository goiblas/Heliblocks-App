import React from "react";
import PropTypes from "prop-types";
import { Box, Image } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "./index";
import bg from "./bg-transparent.svg";

const HeaderCard = ({ image }) => (
  <Box display="block" backgroundColor="gray.50">
    <WrapperImage ratio={IMAGE_HEIGHT / IMAGE_WIDTH}>
      <Image src={image} alt="" objectFit="cover" rounded="sm" opacity=".8" />
    </WrapperImage>
  </Box>
);

HeaderCard.propTypes = {
  image: PropTypes.string.isRequired
};

export default HeaderCard;

const WrapperImage = styled.div`
  background-image: url(${bg});
  padding-bottom: ${({ ratio }) => `calc(${ratio} * 100%)`};
  position: relative;
  > * {
    position: absolute;
  }
`;
