import React from "react";
import { Box, Heading, Icon, Flex, Text } from "@chakra-ui/core";

const Feature = ({ title, description, icon }) => (
  <Box w={{ md: "45%" }} pb="16">
    <Flex>
      <Icon
        name={icon}
        size={["48px", "56px", null, "78px"]}
        color="teal.500"
      />
      <Box ml={["6", null, null, "8"]}>
        <Heading as="h2" fontSize={["xl", null, "2xl", "3xl"]} mb={["2", "4"]}>
          {title}
        </Heading>
        <Text fontSize={["base", "md", null, "lg"]} color="gray.500">
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
        title="Use the platform"
        description="Crea contenido estandar he inserta en tu WordPress retium sit amet urna sit amet scelerisque. Nam eget est viverra, dictum lectus a, accumsan nisl. Aenean  "
        icon="boxes"
      />

      <Feature
        title="Save and reuse"
        description="Fusce pretium sit amet urna sit amet scelerisque. Nam eget est viverra, dictum lectus a, accumsan nisl. Aenean rutrum ex at placerat varius."
        icon="reuse"
      />
    </Box>
  );
};

export default Features;
