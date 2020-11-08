import React from "react";
import { Container } from "components/containers";
import { Text, Flex, Link, Image } from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";
import logo from "theme/isotipo-heliblocks-gray.svg";

const Footer = () => {
  return (
    <Container as="footer">
      <Flex py="6" alignItems="center" flexWrap="wrap">
        <Image
          src={logo}
          width="28px"
          height="auto"
          opacity=".5"
          mr="4"
          transform="translateY(-3px)"
        />
        {/* <Text color="gray.500" fontSize="sm">
          Made with ❤ by{" "}
          <Link href="https://twitter.com/goiblas" isExternal>
            @goiblas
          </Link>
        </Text> */}
        <Text color="gray.500" fontSize="sm">
          <Link as={RouterLink} to="/terms" mr="4" rel="nofollow">
            Terms and Conditions
          </Link>
          <Link as={RouterLink} to="/privacy" rel="nofollow">
            Privacy Policy
          </Link>
        </Text>
      </Flex>
    </Container>
  );
};

export default Footer;
