import React from "react";
import { SimpleGrid, Heading, Box } from "@chakra-ui/core";
import { Card } from "./../../components/card";

const demo = {
  screenshot:
    "https://storage.googleapis.com/heliblocks.appspot.com/screenshots%2FwhZsGVEulz4hBipWqlSH.png?GoogleAccessId=firebase-adminsdk-t1kz0%40heliblocks.iam.gserviceaccount.com&Expires=16447017600&Signature=UEi%2FLS4O3qjApJVb8fCqinqAActKh34wDUALgLmhJwnxU%2F4Tg%2F9yz3YGYjCP4wN8qpM%2BmFF5jxBss1zRisZz77Yay75qhdI0cSQ%2FvRK55gK5sVTyQo4BbhsI2OE%2FclHb5tif4dnFG5KbuKPa1kNzumqxjKXcs2ykyKCrUNxb3ePBe5B%2FLa%2B71LGucpD0YHjRp4du8cEBgXCNyRl9SOg22eR6ALmtuT2CksG%2BbG5rRyUwk%2BZ6zlXOB02JSczIhx9OmTCfGls9T%2FXlx4nTGvdLcsZPN719PCkHYZU2xsDq7LSvvtKUjM7Q2vObRbdXDzMqX7RMfFCy%2F6CD1NY1h3GekQ%3D%3D",
  title: "Service with image",
  id: "rC1V1EdFfoq5hs91YEST",
  author: {
    displayName: "Jesus Olazagoitia",
    id: "u2lSmXX6qzVRJMwTFhT4UEX2oUu2",
    photoURL: "https://avatars3.githubusercontent.com/u/4056962?v=4"
  }
};

const Hero = () => (
  <Box py="4">
    <Heading as="h2" fontSize={["xl", null, null, "2xl"]} mb="10">
      Heliblocks picked
    </Heading>
    <SimpleGrid
      columns={[1, 2, 3, 4]}
      spacing={[8, null, null, "40px"]}
      mb="4"
      maxW="1400px"
      mx="auto"
    >
      {[...Array(8)].map((empty, index) => (
        <Card key={index} {...demo} />
      ))}
    </SimpleGrid>
  </Box>
);

export default Hero;
