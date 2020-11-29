import React, { useState, useEffect } from "react";
import { Text, Flex, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getUser } from "services/users";

const Author = ({ id }) => {
  const [author, setAuthor] = useState(null);
  useEffect(() => {
    getUser(id)
      .then(setAuthor)
      .catch((error) => console.log(error));
  }, [id]);

  if (!author) {
    return null;
  }
  return (
    <Flex align="center">
      <Link to={"/user/" + id}>
        <Avatar
          size="xs"
          overflow="hidden"
          name={author.displayName}
          src={author.photoURL}
        />
      </Link>
      <Text color="gray.500" ml={2} fontSize="sm">
        by
        <Text
          as={Link}
          to={"/user/" + id}
          display="inline"
          ml="1"
          data-testid="card-user-name"
        >
          {author.displayName}
        </Text>
      </Text>
    </Flex>
  );
};

export default Author;
