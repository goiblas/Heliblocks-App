import React, { useState, useEffect } from "react";
import { getUserUrl } from "./../../services/github";
import { Icon, Link, Text } from "@chakra-ui/core";

const GithubLink = ({ id, ...props }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    getUserUrl(id).then(setUrl);
  }, []);

  return (
    url && (
      <Text {...props}>
        <Link
          href={url}
          isExternal
          fontWeight="semibold"
          display="flex"
          alignItems="center"
        >
          <Icon name="github" size="16px" mr="2" verticalAlign="middle" />
          Github
        </Link>
      </Text>
    )
  );
};

export default GithubLink;
