import React from "react";
import Author from "./author";
import { Heading, Box, Flex, Tag } from "@chakra-ui/core";
import CopyId from "./copyId";

const Details = ({ title, description, tags, author, id }) => {
  return (
    <Flex flexDirection={["column", null, "row"]} pb={[6, null, 2]}>
      <Box flexGrow="1">
        <Box mb="1">
          <Heading
            as="h1"
            fontSize={["2xl", null, "3xl", "4xl"]}
            d="inline-block"
            verticalAlign="middle"
          >
            {title}
          </Heading>
          <CopyId id={id} />
        </Box>

        {description && (
          <Box as="p" color="gray.500" mb="4">
            {description}
          </Box>
        )}
        <Flex flexWrap="wrap" mb="2">
          {tags.map(tag => (
            <Tag mr="2" mb="2" size="sm" key={tag} variantColor="gray">
              {tag}
            </Tag>
          ))}
        </Flex>
      </Box>
      <Box mb="4" mt="auto">
        <Author id={author} />
      </Box>
    </Flex>
  );
};

export default Details;
