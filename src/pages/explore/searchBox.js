import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import {
  Flex,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Icon
} from "@chakra-ui/core";
import searchByAlgolia from "./search-by-algolia.svg";

const SearchBox = ({
  onFocus,
  onBlur,
  currentRefinement,
  refine,
  ...props
}) => {
  return (
    <Flex flexDir={["column", "row"]} alignItems="center" maxW="720px">
      <InputGroup mr={[0, 4]} flexGrow="1" size="lg">
        <InputLeftElement children={<Icon name="search" color="gray.300" />} />
        <Input
          type="search"
          placeholder="Search heliblocks..."
          value={currentRefinement}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={e => {
            refine(e.target.value);
          }}
          {...props}
        />
      </InputGroup>
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
