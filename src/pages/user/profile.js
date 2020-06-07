import React from "react";
import { Image, Heading, Flex, Stack, Text, Icon, Link } from "@chakra-ui/core";

const Profile = ({ photoURL, displayName, githubURL }) => {
  return (
    <Flex alignItems="center" py="16">
      <Image
        size={["68px", "90px"]}
        objectFit="cover"
        rounded="full"
        src={photoURL}
        alt={displayName}
        mr="6"
      />
      <Stack spacing="1">
        <Heading as="h1" fontSize={["xl", "2xl", "3xl"]}>
          {displayName}
        </Heading>
        <Text fontSize="md" color="gray.500">
          <Link
            href={githubURL}
            isExternal
            fontWeight="normal"
            display="flex"
            alignItems="center"
          >
            <Icon name="github" size="16px" mr="2" verticalAlign="middle" />
            Github
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
};

export default Profile;
