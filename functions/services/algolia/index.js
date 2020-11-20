const algoliasearch = require("algoliasearch");
const {
  algolia_app_id,
  algolia_api_key,
  algolia_index_name,
} = require("../../config/algoliaConfig.json");

const algoliaClient = algoliasearch(algolia_app_id, algolia_api_key);
const algoliaIndex = algoliaClient.initIndex(algolia_index_name);

exports.algoliaIndex = algoliaIndex;
