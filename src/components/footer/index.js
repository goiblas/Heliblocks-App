import React from "react";
import { Container } from "components/containers";
import { Text, Flex, Icon, Link } from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Container as="footer">
      <Flex py="6" justifyContent="space-between">
        <Text color="gray.500" fontSize="sm">
          Made with ❤ by{" "}
          <Link href="https://twitter.com/goiblas" isExternal>
            @goiblas
          </Link>
        </Text>
        <Text color="gray.500" fontSize="sm">
          <Link as={RouterLink} to="/cookies" mr="4" rel="nofollow">Cookie Policy</Link>
          <Link href="https://github.com/goiblas/Heliblocks-App" rel="nofollow" isExternal>
            <Icon name="github" verticalAlign="middle" mr="2" mb="1" />
            Github
          </Link>
        </Text>
      </Flex>
    </Container>
  );
};

export default Footer;
