import React, { useEffect, useState } from "react";
import Header from "components/header";
import { Box } from "@chakra-ui/core";
import { useParams } from "react-router-dom";
import { getHeliblock } from "services/heliblocks";
import Loading from "components/loading";
import NotFound from "pages/notFound";
import CodeViewer from "./codeViewer";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading
} from "@chakra-ui/core";
import Preview from "components/preview";
import RelatedList from "./relatedList";
import Details from "./details";

const View = () => {
  const { heliblockId } = useParams();
  const [heliblock, setHeliblock] = useState(null);

  useEffect(() => {
    getHeliblock(heliblockId)
      .then(setHeliblock)
      .catch(error => {});
  }, [heliblockId]);

  if (!heliblock) {
    return <Loading />;
  }

  if (heliblock.notFound) {
    return <NotFound />;
  }

  return (
    <>
      <Header />
      <Box mb="8">
        <Box maxW="1340px" py="40px" mx="auto" w="92%">
          <Box display={{ md: "flex" }} mb="4">
            <Details
              title={heliblock.title}
              author={heliblock.author}
              tags={heliblock.tags}
              description={heliblock.description}
              flexGrow="1"
            />
            <Box flexShrink="0">Code</Box>
          </Box>
          <Tabs>
            <TabPanels>
              <TabPanel>
                <Box
                  h="calc(90vh - 200px)"
                  fontSize="sm"
                  bg="white"
                  boxShadow="sm"
                >
                  <Preview
                    html={heliblock.html}
                    css={heliblock.css}
                    alignment={heliblock.alignment}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  h="calc(90vh - 200px)"
                  fontSize="sm"
                  bg="white"
                  boxShadow="sm"
                >
                  <CodeViewer language="css" code={heliblock.css} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  h="calc(90vh - 200px)"
                  fontSize="sm"
                  bg="white"
                  boxShadow="sm"
                >
                  <CodeViewer language="html" code={heliblock.html} />
                </Box>
              </TabPanel>
            </TabPanels>
            <TabList>
              <Tab>Preview</Tab>
              <Tab>HTML</Tab>
              <Tab>CSS</Tab>
            </TabList>
          </Tabs>
        </Box>
      </Box>
      <Box maxW="1340px" py="40px" mx="auto" w="92%">
        <Heading as="h2">Related</Heading>
        <RelatedList heliblock={heliblock} id={heliblockId} />
      </Box>
    </>
  );
};
export default View;
