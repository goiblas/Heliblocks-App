import React, { useEffect, useState} from "react";
import { Heading, Box, Button } from "@chakra-ui/core";
import { CardsGrid } from "components/containers";
import { Link } from "react-router-dom";
import { getHeliblock } from "services/heliblocks";
import { getUser } from "services/users";
import { Card, SkeletonCard } from "components/card";

const pickedIds = [
  "PYjNsJQ5DVSjcZSiA9Ng", "nGS0teMpWFE1owOMq7NE", "CKsZyUKnBoaol8BLritf", "0DReVqb9VpixfWP8vpIe"
 ];

const withHeliblock = Component => ({ id, fallback }) => {
  const [heliblock, setHeliblock] = useState(null);
  useEffect(() => {
    const loadHeliblock = async (id) => {
      const responseHeliblock = await getHeliblock(id);
      const author = await getUser(responseHeliblock.author);
      return {
        ...responseHeliblock,
        author
      }
    } 

    loadHeliblock(id)
      .then(setHeliblock)
      .catch(() => {
        setHeliblock({ notFound: true });
      });

  }, [id]);

  if (!heliblock) {
    return fallback;
  }
  if (heliblock.notFound) {
    return null;
  }

  return <Component id={id} {...heliblock} />;
};

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
