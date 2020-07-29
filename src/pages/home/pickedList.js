import React from "react";
import { Heading, Box, Button } from "@chakra-ui/core";
import { CardsGrid } from "components/containers";
import { Link } from "react-router-dom";
import { Card, SkeletonCard, withHeliblock } from "components/card";

const pickedIds = [
  "PYjNsJQ5DVSjcZSiA9Ng", "nGS0teMpWFE1owOMq7NE", "CKsZyUKnBoaol8BLritf", "0DReVqb9VpixfWP8vpIe",
  "dhGPObsXKCndoPURBZf0", "oXDDDm9oEZg2vH0t4nGI", "YaLbM45swYLbUlX5dalH", "j2HUDVyshZZa7WOUcrC9"
 ];

const CardWithHeliblock = withHeliblock(Card);

const PickedList = () =>  (
  <>
  <Box py="4">
    <Heading as="h2" fontSize={["xl", null, "2xl", "3xl"]} mb="8">
      Heliblocks picked
    </Heading>
    <CardsGrid mb="4">
      {pickedIds.map( id => (
          <CardWithHeliblock key={id} id={id} fallback={<SkeletonCard />} />
      ))}
    </CardsGrid>
  </Box>
  <Box textAlign="center" py="8" mb="20">
    <Button as={Link} to="/explore" size="lg">
      Explore more heliblocks
    </Button>
  </Box>
</>
);

export default PickedList;
