import React from "react";
import algoliasearch from "algoliasearch/lite";
import { Link } from "react-router-dom";
import Header from "./../../components/header";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  connectStateResults
} from "react-instantsearch-dom";
import PropTypes from "prop-types";
import "./explore.css";
import { Box } from "@chakra-ui/core";
import { Card } from "./../../components/card";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);
// https://www.algolia.com/press/?section=brand-guidelines
const Explore = porps => (
  <>
    <Header />
    <div className="container">
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
      >
        <div className="search-panel">
          <div className="search-panel__results">
            <Box mb="4" py="40px" maxW="1400px" mx="auto">
              <SearchBox
                className="searchbox"
                translations={{
                  placeholder: ""
                }}
              />
              <Hits hitComponent={Hit} />
              <ResultNotFound />
              <div className="pagination">
                <Pagination />
              </div>
            </Box>
          </div>
        </div>
      </InstantSearch>
    </div>
  </>
);

const Hit = props => {
  const { title, description, screenshot, objectID, author } = props.hit;
  console.log(author);
  return (
    <Card title={title} screenshot={screenshot} id={objectID} author={author} />
  );
};

Hit.propTypes = {
  hit: PropTypes.object.isRequired
};

const ResultNotFound = connectStateResults(props => {
  const { searchResults, searchState } = props;

  if (
    searchResults &&
    searchResults.hits.length === 0 &&
    searchState.query !== undefined
  ) {
    return <p>No se han encontrado resutados para {searchState.query}</p>;
  }

  return null;
});

export default Explore;
