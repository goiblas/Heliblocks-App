import React from "react";
import { Button, Box, Heading, Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import AnimationHero from "./animationHero.json";

const Hero = () => {
  const HeroText = ({ title, description, ...rest }) => {
    return (
      <Box py="5" pr="10" {...rest}>
        <Heading pt="6" as="h1" fontSize={["3xl", null, "4xl", null, "5xl"]}>
          {title}
        </Heading>
        <Text color="gray.600" fontSize={["md", null, "lg", "xl"]} mt={4}>
          {description}
        </Text>
        <Box py="8">
          <Button as={Link} to="/documentation" size="lg" variantColor="primary" mr="2" mb="2">
            Get Started
          </Button>
          <Button download as="a" href="https://wordpress.org/plugins/heliblocks/" target="_blank" size="lg" mb="2">
            Download plugin
          </Button>
        </Box>
      </Box>
    );
  };
  const HeroImage = props => (
    <Box {...props}>
      <Lottie animationData={AnimationHero} />
    </Box>
  );
  return (
    <Box
      display={{ md: "flex" }}
      flexDirection="row-reverse"
      justifyContent="space-between"
      py={["12px", "20px", "60px"]}
    > 
      <HeroImage w={{ md: "55%" }} />

      <HeroText
        w={{ md: "45%" }}
        title="Build WordPress pages in minutes"
        description="Create and share your HTML and CSS snippets, I've inserted and customized them for any WordPress theme"
      />
    </Box>
  );
};

export default Hero;
