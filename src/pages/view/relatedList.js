import React, { useEffect, useState } from "react";
import { getRelatedTo } from "services/heliblocks";
import { SimpleGrid } from "@chakra-ui/core";
import { Card } from "components/card";

const RelatedList = ({ heliblock, id }) => {
  const [heliblocks, setHeliblocks] = useState(null);
  useEffect(() => {
    getRelatedTo({ ...heliblock, id })
      .then(setHeliblocks)
      .catch(console.log);
  }, [heliblock, id]);

  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={[8, null, null, "40px"]} mb="4">
      {heliblocks &&
        heliblocks.map(heliblockRelated => (
          <Card key={heliblockRelated.id} {...heliblockRelated} />
        ))}
    </SimpleGrid>
  );
};

export default RelatedList;
