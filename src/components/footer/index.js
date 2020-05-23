import React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Avatar,
  Text,
  Menu,
  MenuButton,
  Flex,
  Image,
  Icon
} from "@chakra-ui/core";

const Footer = () => {
  return (
    <Box py="6">
      <Text color="gray.600" fontSize="sm">
        A project by <a href="https://goiblas.com">@goiblas</a>
      </Text>
    </Box>
  );
};

export default Footer;
