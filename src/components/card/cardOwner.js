import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Text, Flex, IconButton } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import HeaderCard from "./headerCard";
import { removeHeliblock } from "services/heliblocks";

export const CardOwner = props => {
  const [deleting, setDeleting] = useState(false);
  const wrapper = useRef(null);

  const remove = useCallback(
    event => {
      if (event.target === wrapper.current) {
        wrapper.current.style.display = "none";
        removeHeliblock(props.id);
      }
    },
    [wrapper, props.id]
  );

  useEffect(() => {
    window.addEventListener("transitionend", remove);
    return () => window.removeEventListener("transitionend", remove);
  }, [remove]);
  const deleteHandle = () => {
    setDeleting(true);
  };

  return (
    <Box
      ref={wrapper}
      transition="opacity .3s"
      opacity={deleting ? 0 : 1}
      pointerEvents={deleting ? "none" : "auto"}
    >
      <Link to={"/edit/" + props.id}>
        <HeaderCard image={props.screenshot} />
      </Link>
      <Flex alignItems="flex-start" pb="3">
        <Box flexGrow="1">
          <Link to={"/edit/" + props.id}>
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
          onClick={deleteHandle}
        />
      </Flex>
    </Box>
  );
};
