import React from "react";
import { Container } from "components/containers";
import { Text, Flex, Icon, Link } from "@chakra-ui/core";

const Footer = () => {
  return (
    <Container as="footer">
      <Flex py="6" justifyContent="space-between">
        <Text color="gray.500" fontSize="sm">
          Made with ❤ by{" "}
          <Link href="https://goiblas.com" isExternal>
            @goiblas
          </Link>
        </Text>
        <Text color="gray.500" fontSize="sm">
          <Link href="https://goiblas.com">
            <Icon name="github" verticalAlign="middle" mr="2" mb="1" />
            Github
          </Link>
        </Text>
      </Flex>
    </Container>
  );
};

export default Footer;
