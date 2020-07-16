import React from "react";
import PropTypes from "prop-types";
import { Image } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "./index";
import bg from "./bg-transparent.svg";

const HeaderCard = ({ image }) => (
  <WrapperImage ratio={IMAGE_HEIGHT / IMAGE_WIDTH}>
    {image && <Image src={image} alt="" objectFit="cover" rounded="sm" />}
  </WrapperImage>
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
