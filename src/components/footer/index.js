import React from "react";
import { Container } from "components/containers";
import { Text, Flex, Icon, Link } from "@chakra-ui/core";

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
          <Link href="https://github.com/goiblas/Heliblocks-App" isExternal>
            <Icon name="github" verticalAlign="middle" mr="2" mb="1" />
            Github
          </Link>
        </Text>
      </Flex>
    </Container>
  );
};

export default Footer;
