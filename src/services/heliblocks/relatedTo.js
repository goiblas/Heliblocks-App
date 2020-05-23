import algoliasearch from "algoliasearch/lite";

import {
  InstantSearch,
  SearchBox,
  Pagination,
  connectStateResults,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);

const index = searchClient.initIndex('heliblocks');

const algoliaHitToHeliblock = ({ objectID, ...values }) => ({
  ...values,
  id: objectID
})
// https://www.algolia.com/doc/api-reference/api-parameters/similarQuery/
export const getRelatedTo = async (heliblock) => {

  try {
    const searchTerms = [...heliblock.tags, heliblock.title, heliblock.author]
  
    const { hits } = await index.search("", {
      similarQuery: searchTerms.join(" "),
      filters: `NOT objectID:${heliblock.id}`,
      hitsPerPage: 8
    })
    console.log(hits)
    return hits.map(algoliaHitToHeliblock)
  
  } catch (error) {
    // @TODO 
  }
}