import React from "react";
import { Text, Flex, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Author = ({ id, displayName, photoURL, ...props }) => (
  <Flex align="center" {...props}>
    <Link to={"/user/" + id}>
      <Avatar size="xs" overflow="hidden" name={displayName} src={photoURL} />
    </Link>
    <Text color="gray.500" ml={2} fontSize="sm">
      by{" "}
      <Text
        as={Link}
        to={"/user/" + id}
        display="inline"
        fontWeight="medium"
        data-testid="card-user-name"
      >
        {displayName}
      </Text>
    </Text>
  </Flex>
);

export default Author;
