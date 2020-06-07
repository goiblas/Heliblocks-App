import React from "react";
import { Heading, Box, Button } from "@chakra-ui/core";
import { Card } from "components/card";
import { CardsGrid } from "components/containers";
import { Link } from "react-router-dom";

const demo = {
  screenshot:
    "https://storage.googleapis.com/heliblocks.appspot.com/screenshots%2FC6UxXBJyAP8mLiJ1jG4n.png?GoogleAccessId=firebase-adminsdk-t1kz0%40heliblocks.iam.gserviceaccount.com&Expires=16447017600&Signature=Ct6v5H1ZTaJakC4mN0BmpG5ltfznN2QLOI%2FPwECzlSBiIL%2FD9YodyukhP0oQ3OOyA8DpbcRNt0BoJHj6xUlIjbc%2BoH2rgH1yhS5bNLMPWxtUbY6CnOT0JBO4UKiO6UzO9IKzaneXEfnfASLaEJCelpMvzOkhbSY%2Ban5ghJHOKddWQWdWLiY5BLZQBAahRPv51tg4%2B%2BIyi%2FwQYem6LpBp%2BiCsZiAxaGylbcKnlyR05BwFjvjLQevUsW4JhwAU6pI7K%2FirtKP2TwN2kHZ9uajpuHF9ELMEfGJTbLFXFHVKONH0JQJ8pV3ouB0xFq1rOLVOJ5w9jcr6Uz53Q83grJE31g%3D%3D",
  title: "Service with image",
  id: "C6UxXBJyAP8mLiJ1jG4n",
  author: {
    displayName: "Jesus Olazagoitia",
    id: "u2lSmXX6qzVRJMwTFhT4UEX2oUu2",
    photoURL: "https://avatars3.githubusercontent.com/u/4056962?v=4"
  }
};

const Hero = () => (
  <>
    <Box py="4">
      <Heading as="h2" fontSize={["xl", null, "2xl", "3xl"]} mb="8">
        Heliblocks picked
      </Heading>
      <CardsGrid mb="4">
        {[...Array(8)].map((empty, index) => (
          <Card key={index} {...demo} />
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

export default Hero;
