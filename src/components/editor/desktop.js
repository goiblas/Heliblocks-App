import React, { useState, useContext } from "react";
import { EditorContext } from "./editorContext";
import Settings from "./settings";
import Title from "./title";
import Save from "./save";
import { CssEditor, HtmlEditor } from "./codeEditors";
import ScreenPreview from "./screenPreview";
import { UserMenu } from "components/menus";
import Logo from "components/logo";
import { Box, Flex, useTheme, Stack, Button } from "@chakra-ui/core";
import { Container, Section, Bar } from "react-simple-resizer";

const Divider = ({ style, ...rest }) => {
  const theme = useTheme();
  return (
    <Bar
      size={4}
      style={{ background: theme.colors.gray[100], ...style }}
      {...rest}
    />
  );
};

const DesktopEditor = () => {
  const { save, draft, saving } = useContext(EditorContext);
  const [dragging, setDragging] = useState(false);
  const { colors } = useTheme();

  const handleResize = () => {
    const event = new CustomEvent("editor-resize", {
      detail: {},
    });
    window.dispatchEvent(event);
  };
  return (
    <>
      <Box borderBottomWidth="1px" px="4">
        <Flex height="56px" justifyContent="space-between" alignItems="center">
          <Logo />
          <Title />
          <Stack isInline spacing={2}>
            {draft && (
              <>
                <Button
                  variant="link"
                  fontWeight="normal"
                  isLoading={saving}
                  loadingText="Saving"
                  onClick={() => save()}
                >
                  {" "}
                  Save draft
                </Button>
                <Box w="4" />
              </>
            )}
            <Settings mr="2" />
            <Save />
            <Flex>
              <UserMenu />
            </Flex>
          </Stack>
        </Flex>
      </Box>
      <Container
        style={{ height: "calc(100vh - 57px)" }}
        afterResizing={handleResize}
      >
        <Section defaultSize={620} minSize={100}>
          <Container
            vertical={true}
            style={{ height: "100%" }}
            afterResizing={handleResize}
          >
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
            pointerEvents: dragging ? "none" : "auto",
          }}
          minSize={220}
        >
          <ScreenPreview />
        </Section>
      </Container>
    </>
  );
};

export default DesktopEditor;
