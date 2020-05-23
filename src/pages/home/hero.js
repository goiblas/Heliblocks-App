import React from "react";
import { Button, Box, Heading, Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";

const Hero = () => {
  const HeroText = ({ title, description, ...rest }) => {
    return (
      <Box py="5" pr="10" {...rest}>
        <Heading
          pt="6"
          as="h1"
          letterSpacing="-0.02em"
          fontSize={["3xl", null, "4xl", null, "5xl"]}
        >
          {title}
        </Heading>
        <Text color="gray.600" fontSize={["md", null, "lg", "xl"]} mt={4}>
          {description}
        </Text>
        <Box py="8">
          <Button
            fontWeight="medium"
            size="lg"
            leftIcon="download"
            variantColor="blue"
            mr="2"
          >
            {" "}
            Download plugin
          </Button>
          <Button
            as={Link}
            to="/create"
            fontWeight="medium"
            size="lg"
            variantColor="blue"
            variant="ghost"
          >
            {" "}
            Create heliblock
          </Button>
        </Box>
      </Box>
    );
  };
  const HeroImage = props => (
    <Box p={5} shadow="xl" minH="220px" bg="gray.200" {...props} />
  );
  return (
    <Box
      display={{ md: "flex" }}
      mb="20px"
      flexDirection="row-reverse"
      justifyContent="space-between"
      py={["12px", "20px", "60px"]}
    >
      <HeroImage w={{ md: "45%" }} />

      <HeroText
        w={{ md: "45%" }}
        title="Build WordPress landing in minutes"
        description="Create and share your HTML and CSS snippets, I've inserted and customized them for any theme"
      />
    </Box>
  );
};

export default Hero;
