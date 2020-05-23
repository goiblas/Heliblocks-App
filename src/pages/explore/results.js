import React from "react";
import { connectHits } from "react-instantsearch-dom";
import {  SimpleGrid } from "@chakra-ui/core";
import { Card } from "./../../components/card";

const Results = connectHits(({ hits }) => (
    <SimpleGrid
      columns={[1, 2, 3, 4]}
      spacing={[8, null, null, "40px"]}
      mb="4"
      maxW="1400px"
      mx="auto"
    >
      { hits.map( ({ title, description, screenshot, objectID, author }) => (
        <Card key={objectID} title={title} screenshot={screenshot} id={objectID} author={author} />
      ))}
    </SimpleGrid>
  ));


export default Results