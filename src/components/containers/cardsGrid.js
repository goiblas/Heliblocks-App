import React from "react";
import { SimpleGrid } from "@chakra-ui/react";

export const CardsGrid = (props) => (
  <SimpleGrid
    columns={[1, 2, 3, 4]}
    spacing={[8, null, null, "40px"]}
    {...props}
  />
);
