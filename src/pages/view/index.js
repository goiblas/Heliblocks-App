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
import Preview from "./preview";
import RelatedList from "./relatedList";
import Details from "./details";
import { useInView } from "react-intersection-observer";

const View = () => {
  const { heliblockId } = useParams();
  const [heliblock, setHeliblock] = useState(null);
  const [ref, inView, entry] = useInView();

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
  console.log(heliblock);
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
                    theme={heliblock.theme}
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
                  <CodeViewer
                    language={heliblock.css.preprocessor}
                    code={heliblock.css.source}
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
                  <CodeViewer
                    language={heliblock.html.preprocessor}
                    code={heliblock.html.source}
                  />
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
        <Heading as="h2" ref={ref}>
          Related
        </Heading>
        {inView && <RelatedList heliblock={heliblock} id={heliblockId} />}
      </Box>
    </>
  );
};
export default View;
