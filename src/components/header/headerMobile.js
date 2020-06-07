import React from "react";
import { Link } from "react-router-dom";
import { UserMenu } from "components/menus";
import { Flex, Icon } from "@chakra-ui/core";
import Logo from "components/logo";

const HeaderMobile = () => (
  <Flex as="header" h="60px" px="4" data-testid="mobile-header">
    <Flex justifyContent="space-between" alignItems="center" my="auto" w="100%">
      <Logo narrow={true} />
      <Link to="/explore">
        <Icon
          name="explore"
          color="gray.700"
          size="32px"
          aria-label="Explore"
        />
      </Link>
      <Link to="/documentation">
        <Icon
          name="documentation"
          color="gray.700"
          size="32px"
          aria-label="Documentation"
        />
      </Link>
      <Link to="/create">
        <Icon name="create" color="gray.700" size="32px" aria-label="Create" />
      </Link>
      <UserMenu />
    </Flex>
  </Flex>
);

export default HeaderMobile;
