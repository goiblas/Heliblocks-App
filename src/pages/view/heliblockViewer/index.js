import React from "react";
import CodeViewer from "./codeViewer";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import Preview from "components/preview";
import { Container } from "components/containers";
import Resizable from "./resizable";

const TabStyled = React.forwardRef((props, ref) => (
  <Tab
    ref={ref}
    py="4"
    _selected={{
      color: "primary.600",
      boxShadow: "inset 0 2px currentColor, 0 -1px currentColor",
    }}
    {...props}
  />
));
const HeliblockViewer = ({ html, css, alignment, height, additionalLinks }) => (
  <Container w="100%">
    <Tabs borderRadius="6px" borderWidth="1px" variant="unstyled">
      <TabPanels>
        <TabPanel p={0}>
          <Box h={height}>
            <Resizable>
              <Preview
                html={html}
                css={css}
                alignment={alignment}
                additionalLinks={additionalLinks}
              />
            </Resizable>
          </Box>
        </TabPanel>
        <TabPanel p={0}>
          <Box h={height}>
            <CodeViewer language="html" code={html} />
          </Box>
        </TabPanel>
        <TabPanel p={0}>
          <Box h={height}>
            <CodeViewer language="css" code={css} />
          </Box>
        </TabPanel>
      </TabPanels>
      <TabList borderTopWidth="1px" justifyContent="center">
        <TabStyled>Preview</TabStyled>
        <TabStyled>HTML</TabStyled>
        <TabStyled>CSS</TabStyled>
      </TabList>
    </Tabs>
  </Container>
);

export default HeliblockViewer;
