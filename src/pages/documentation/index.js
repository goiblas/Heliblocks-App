import React from "react";
import Header from "../../components/header";
import { Heading, Box } from "@chakra-ui/core";

const Documentation = () => (
  <>
    <Header />
    <Box maxW="1340px" py="40px" mx="auto" w="92%">
      <Heading as="h1">Documentation</Heading>
    </Box>
  </>
);
export default Documentation;
