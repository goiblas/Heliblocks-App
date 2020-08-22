import React from "react";
import Header from "components/header";
import { Main, Container } from "components/containers";
import Footer from "components/footer";
import { Box, Heading, Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { Title } from 'react-head';

const NotFound = () => (
  <>
    <Title>404 - Heliblocks</Title>
    <Header />
    <Container as={Main}>
      <Box py="10vh" textAlign="center">
        <Heading as="h1" mb="6">
          <span role="img" aria-label="sorry">
            🥺
          </span>
          Oops! Page not found
        </Heading>
        <Text as={Link} to="/" color="primary.600">
          Back to home page
        </Text>
      </Box>
    </Container>
    <Footer />
  </>
);

export default NotFound;
