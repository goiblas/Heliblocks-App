import React from "react";
import {
  Grid,
  Box,
  Flex,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Tab
} from "@chakra-ui/core";
import { Logo } from "./../../menus";

function LayoutMobile({ title, navBar, menuUser, preview, html, css }) {
  const tabStyled = {
    borderTopWidth: "3px",
    borderColor: "white",
    fontSize: "sm",
    paddingX: [2, 6],
    _selected: { color: "blue.500", borderColor: "blue.500" }
  };

  return (
    <Grid h="100vh" templateRows="56px 1fr">
      <Box borderBottomWidth="1px" px="4">
        <Flex height="55px" justifyContent="space-between" alignItems="center">
          <Logo />
          {title}
          {menuUser}
        </Flex>
      </Box>

      <Tabs variant="unstyled" d="flex" flexDir="column">
        <TabPanels flexGrow="1">
          <TabPanel h="100%">{html}</TabPanel>
          <TabPanel h="100%">{css}</TabPanel>
          <TabPanel h="100%">{preview}</TabPanel>
        </TabPanels>
        <Flex justifyContent="space-between" borderTopWidth="1px">
          <TabList>
            <Tab {...tabStyled}>HMTL</Tab>
            <Tab {...tabStyled}>CSS</Tab>
            <Tab {...tabStyled}>Preview</Tab>
          </TabList>
          <Flex p="2">{navBar}</Flex>
        </Flex>
      </Tabs>
    </Grid>
  );
}

export default LayoutMobile;
