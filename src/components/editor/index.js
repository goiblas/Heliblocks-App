import React, { useState } from "react";
import PropTypes from "prop-types";
import useMediaQuery from "react-use-media-query-hook";
import Settings from "./settings";
import Title from "./title";
import Copycode from "./copycode";
import {CssEditor, HtmlEditor } from "./codeEditors";
import Preview from "./preview";
import { Logo, UserMenu } from "./../menus";
import { Box, Flex, useTheme, Tabs,
  Grid,
  TabPanel,
  TabPanels,
  TabList,
  Tab } from "@chakra-ui/core";
import { Container, Section, Bar } from "react-simple-resizer";
import {
  setCssSource,
  setHtmlSource,
  setCssPreprocessor
} from "../../store/creation/actions";

const Divider = ({ style, ...rest }) => {
  const theme = useTheme();
  return (
    <Bar
      size={7}
      style={{ background: theme.colors.gray[100], ...style }}
      {...rest}
    />
  );
};
  
const tabStyled = {
  borderTopWidth: "3px",
  borderColor: "white",
  fontSize: "sm",
  paddingX: [2, 6],
  _selected: { color: "blue.500", borderColor: "blue.500" }
};

const Editor = ({ action }) => {
  const isDesktop = useMediaQuery("(min-width: 880px)");
  const [dragging, setDragging] = useState(false);
  const { colors } = useTheme();

  return isDesktop ? (
    <>
    <Box borderBottomWidth="1px" px="4">
      <Flex height="55px" justifyContent="space-between" alignItems="center">
        <Logo />
        <Title />
        <Copycode />
        <Flex justifyContent="space-between" flexGrow="1">
          <Box ml="auto">
            <Settings mr="2" />
            {action}
            <UserMenu />
          </Box>
        </Flex>
      </Flex>
    </Box>
    <Box as={Container} h="calc(100vh - 56px)">
      <Section defaultSize={620} minSize={100}>
        <Container vertical={true} style={{ height: "100%" }}>
          <Section minSize={48}>
            <HtmlEditor />
          </Section>
          <Divider />
          <Section minSize={48}>
            <CssEditor />
          </Section>
        </Container>
      </Section>
      <Divider onStatusChanged={setDragging} />
      <Section
        style={{
          borderLeft: `1px solid ${colors.gray["200"]}`,
          background: "#fff",
          pointerEvents: dragging ? "none" : "auto"
        }}
        minSize={220}
      >
        <Preview />
      </Section>
    </Box>
  </>
  ) : (
    <Grid h="100vh" templateRows="56px 1fr">
    <Box borderBottomWidth="1px" px="4">
      <Flex height="55px" justifyContent="space-between" alignItems="center">
        <Logo />
        <Title />
        <Copycode narrow />
        <UserMenu />
      </Flex>
    </Box>

    <Tabs variant="unstyled" d="flex" flexDir="column">
      <TabPanels flexGrow="1">
        <TabPanel h="100%"><HtmlEditor /></TabPanel>
        <TabPanel h="100%"><CssEditor /></TabPanel>
        <TabPanel h="100%"><Preview /></TabPanel>
      </TabPanels>
      <Flex justifyContent="space-between" borderTopWidth="1px">
        <TabList>
          <Tab {...tabStyled}>HMTL</Tab>
          <Tab {...tabStyled}>CSS</Tab>
          <Tab {...tabStyled}>Preview</Tab>
        </TabList>
        <Flex p="2" justifyContent="space-between" flexGrow="1">
          <Box ml="auto">
            <Settings
                size="sm"
                mr="3"
                variant="link" 
              />
            {action}
          </Box>
        </Flex>
      </Flex>
    </Tabs>
  </Grid>
  )
}

export default Editor;

Editor.protoTypes = {
  action: PropTypes.node.isRequired
};
