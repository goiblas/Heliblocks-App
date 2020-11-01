import React from "react";
import Footer from "components/footer";
import Header from "components/header";
import { Container, Main } from "components/containers";
import Markdown from "components/markdown";
import { content } from "./content";
import { Title, Meta } from "react-head";
import { Box } from "@chakra-ui/core";

const Cookies = () => (
  <>
    <Title>Cookie Policy - Heliblocks</Title>
    <Meta name="robots" content="noindex" />
    <Header />
    <Container size="extra_small" as={Main} lang="es">
      <Box mb="10">
        <Markdown content={content} />
      </Box>
    </Container>
    <Footer />
  </>
);

export default Cookies;
