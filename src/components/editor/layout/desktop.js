import React, { useState } from "react";
import { Box, Flex, useTheme } from "@chakra-ui/core";
import { Container, Section, Bar } from "react-simple-resizer";
import { Logo } from "./../../menus";

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

function LayoutDesktop({ title, navBar, menuUser, preview, html, css }) {
  const [dragging, setDragging] = useState(false);
  const { colors } = useTheme();

  return (
    <div>
      <Box borderBottomWidth="1px" px="4">
        <Flex height="55px" justifyContent="space-between" alignItems="center">
          <Logo />
          {title}
          {navBar}
          {menuUser}
        </Flex>
      </Box>
      <Box as={Container} h="calc(100vh - 56px)">
        <Section defaultSize={620} minSize={100}>
          <Container vertical={true} style={{ height: "100%" }}>
            <Section minSize={48}>{html}</Section>
            <Divider />
            <Section minSize={48}>{css}</Section>
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
          {preview}
        </Section>
      </Box>
    </div>
  );
}

export default LayoutDesktop;
