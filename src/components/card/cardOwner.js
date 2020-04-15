import React from "react";
import { Box, Text, Flex, Image, IconButton } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

export const CardOwner = props => (
  <Box>
    <Box
      as={Link}
      to={"/heliblock/" + props.id}
      display="block"
      backgroundColor="gray.300"
    >
      <Image
        width="840"
        height="640"
        rounded="sm"
        opacity=".89"
        src={props.screenshot}
      />
    </Box>
    <Flex alignItems="flex-start" pb="3">
      <Box flexGrow="1">
        <Link to={"/heliblock/" + props.id}>
          <Text mt={3} lineHeight="short">
            {props.title}
          </Text>
        </Link>
        <Text mt="1" color="gray.500" fontSize="sm">
          <TimeAgo date={props.lastUpdate.seconds * 1000} />
        </Text>
      </Box>
      <IconButton
        _hover={{ color: "gray.700" }}
        color="gray.500"
        variant="ghost"
        my="2"
        aria-label="remove"
        icon="delete"
      />
    </Flex>
  </Box>
);
