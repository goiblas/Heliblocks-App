import React from "react";
import { Link } from "react-router-dom";
import isotypeImage from "theme/isotipo-heliblocks.svg";
import logoImage from "theme/logo-heliblocks.svg";
import { Box } from "@chakra-ui/react";

const Logo = ({ narrow }) => (
  <Box as={Link} to="/" mb="3px">
    {narrow ? (
      <img src={isotypeImage} width="36" height="40" alt="Heliblocks" />
    ) : (
      <img src={logoImage} width="148" height="48" alt="Heliblocks" />
    )}
  </Box>
);

export default Logo;
