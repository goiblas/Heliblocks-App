import React from "react";
import { Box, Heading, Icon, Flex, Text } from "@chakra-ui/core";

const Feature = ({ title, description, icon }) => (
  <Box w={{ md: "45%" }} pb="16">
    <Flex>
      <Icon
        name={icon}
        size={["48px", "56px", null, "78px"]}
        color="gray.300"
      />
      <Box ml={["6", null, null, "8"]}>
        <Heading as="h2" fontSize={["xl", null, "2xl", "3xl"]} mb={["2", "4"]}>
          {title}
        </Heading>
        <Text fontSize={["base", "md", "lg", "xl"]} color="gray.500">
          {description}
        </Text>
      </Box>
    </Flex>
  </Box>
);

const Features = () => {
  return (
    <Box
      display={{ md: "flex" }}
      justifyContent="space-between"
      py={["12px", "20px", null, "60px"]}
      px="5"
      maxW="1260px"
      mx="auto"
    >
      <Feature
        title="Works in headless"
        description="Everything WordPress needs to paint the heliblock is contained within the content, so it is a perfect match to use with headless."
        icon="boxes"
      />

      <Feature
        title="Save and reuse"
        description="Use the platform, take the power of Block editor and the versatility of CSS variables to customize."
        icon="reuse"
      />
    </Box>
  );
};

export default Features;
