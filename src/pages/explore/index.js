import React from "react";
import algoliasearch from "algoliasearch/lite";
import Header from "components/header";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import InfinityResults from "./infinityResults";
import { Box, Heading } from "@chakra-ui/core";
import AmountResults from "./amountResults";
import { Main, Container } from "components/containers";
import Footer from "components/footer";
import SearchBox from "./searchBox";
import { Title } from 'react-head';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);

// https://www.algolia.com/press/?section=brand-guidelines
const Explore = porps => (
  <>
    <Title>Explore - Heliblocks</Title>
    <Header />
    <Container as={Main}>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
      >
        <Configure hitsPerPage={16} />
        <Box py="16">
          <Heading as="h1" mb="3" fontSize={["xl", null, "2xl", "3xl"]}>
            Explore
          </Heading>
          <SearchBox />
        </Box>
        <AmountResults />
        <InfinityResults minHitsPerPage={16} />
      </InstantSearch>
    </Container>
    <Footer />
  </>
);
export default Explore;
