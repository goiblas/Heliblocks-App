import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { Flex, Box, Input } from "@chakra-ui/core";
import searchByAlgolia from "./search-by-algolia.svg";

const SearchBox = ({
  onFocus,
  onBlur,
  currentRefinement,
  refine,
  ...props
}) => {
  return (
    <Flex flexDir={["column", "row"]} alignItems="center" maxW="680px">
      <Input
        type="search"
        size="lg"
        placeholder="Search heliblocks..."
        value={currentRefinement}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={e => {
          refine(e.target.value);
        }}
        mr={[0, 4]}
        {...props}
      />
      <Box py="4" maxW="37vw" ml="0" mr="auto">
        <img
          src={searchByAlgolia}
          width="168"
          height="24"
          alt="Search by Algolia"
        />
      </Box>
    </Flex>
  );
};

export default connectSearchBox(SearchBox);
