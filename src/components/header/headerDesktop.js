import React from "react";
import { Link } from "react-router-dom";
import { UserMenu } from "components/menus";
import { Flex, Button, Box } from "@chakra-ui/react";
import Logo from "components/logo";

const HeaderDesktop = () => {
  return (
    <Flex as="header" h="72px" px="4" data-testid="desktop-header">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        my="auto"
        w="100%"
      >
        <Logo />
        <Box as={Link} to="/explore" ml="6">
          Explore
        </Box>
        <Box as={Link} to="/documentation" ml="6">
          Documentation
        </Box>
        <Box ml="auto" />
        <Button colorScheme="primary" as={Link} to="/create" mr="2">
          Create
        </Button>
        <UserMenu />
      </Flex>
    </Flex>
  );
};

export default HeaderDesktop;
