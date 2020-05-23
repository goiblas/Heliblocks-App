import React from "react";
import { Link } from "react-router-dom";
import { SimpleGrid } from "@chakra-ui/core";
import Card, { CardOwner } from "./../../components/card";
import CardProfile from "./cardProfile"

const CreationList = ({owner, creations }) => {
  return (
    <SimpleGrid
      columns={[1, null, null, 2, 3]}
      spacing={[8, null, null, "40px"]}
      mb="4"
    >
      {creations &&
        creations.map((id) => (
          <CardProfile id={id} key={id} owner={owner} />
        ))
        }
    </SimpleGrid>
  );
};
export default CreationList;
