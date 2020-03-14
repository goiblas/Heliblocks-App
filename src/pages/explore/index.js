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
        </div>
      </div>
    </InstantSearch>
  </div>
  </>
);

const Hit = props => {
  const { title, description, screenshot, objectID } = props.hit;
  return (
    <Link to={"/heliblock/" + objectID} key={objectID} className="card">
      <div className="card__preview">
        <img src={screenshot} className="card__photo" />
      </div>
      <div className="card__body">
        <div class="card__title">{title}</div>
        <p>{description}</p>
      </div>
    </Link>
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
