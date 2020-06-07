import React from "react";
import { Box } from "@chakra-ui/core";
import { connectStateResults } from "react-instantsearch-dom";

const AmountResults = ({ searchResults }) => (
  <Box
    pb="4"
    aria-live="polite"
    aria-atomic="true"
    fontSize="md"
    color="gray.600"
  >
    {searchResults && searchResults.nbHits} result found
  </Box>
);

export default connectStateResults(AmountResults);
