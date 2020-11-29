import React from "react";
import { Link } from "react-router-dom";
import { UserMenu } from "components/menus";
import { Flex } from "@chakra-ui/react";
import Logo from "components/logo";
import { ExploreIcon, DocumentationIcon, CreateIcon } from "theme/icons";

const HeaderMobile = () => (
  <Flex as="header" h="60px" px="4" data-testid="mobile-header">
    <Flex justifyContent="space-between" alignItems="center" my="auto" w="100%">
      <Logo narrow={true} />
      <Link to="/explore">
        <ExploreIcon color="gray.700" w={8} h={8} aria-label="Explore" />
      </Link>
      <Link to="/documentation">
        <DocumentationIcon
          color="gray.700"
          w={8}
          h={8}
          aria-label="Documentation"
        />
      </Link>
      <Link to="/create">
        <CreateIcon color="gray.700" w={8} h={8} aria-label="Create" />
      </Link>
      <UserMenu />
    </Flex>
  </Flex>
);

export default HeaderMobile;
