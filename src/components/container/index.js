import React from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/core";

const sizes = {
  small: "1340px",
  normal: "1340px",
  large: "1640px"
};
const Container = ({ size, ...props }) => (
  <Box maxW={sizes[size]} mx="auto" w="92%" {...props} />
);

export default Container;

Container.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes))
};
Container.defaultProps = {
  size: "normal"
};
