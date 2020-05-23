import React, { useState, useEffect } from "react";
import Author from "./author";
import { Heading, Box, Button, Collapse, Stack, Tag } from "@chakra-ui/core";

const Details = ({ title, description, tags, author }) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Box flexGrow="1">
      <Box>
        <Heading as="h1" mr="3" d="inline-block">
          {title}
        </Heading>
        <Button
          variantColor="gray"
          variant="link"
          size="sm"
          onClick={handleToggle}
        >
          {show ? "Less details" : "More details"}
        </Button>
      </Box>
      <Collapse py="2" isOpen={show}>
        {description && <Box as="p">{description}</Box>}
        <Stack spacing={4} isInline>
          {tags.map(tag => (
            <Tag size="sm" key={tag} variantColor="gray">
              {tag}
            </Tag>
          ))}
        </Stack>
      </Collapse>
      <Box py="1">
        <Author id={author} />
      </Box>
    </Box>
  );
};

export default Details;
