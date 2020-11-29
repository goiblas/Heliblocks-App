import React from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

const sizes = {
  extra_small: "860px",
  small: "1100px",
  normal: "1340px",
  large: "1640px",
};
export const Container = ({ size, ...props }) => (
  <Box maxW={sizes[size]} mx="auto" w="92%" {...props} />
);

Container.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
};
Container.defaultProps = {
  size: "normal",
};
