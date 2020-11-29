import React, { useContext } from "react";
import { Box, Grid } from "@chakra-ui/react";
import ToggleButtons from "components/toggleButtons";
import { EditorContext } from "./../editorContext";
import Preview from "components/preview";
import ZoomOut from "./zoomOut";

export const alignments = [
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "Wide",
    value: "wide",
  },
  {
    label: "Full",
    value: "full",
  },
];

const ScreenPreview = () => {
  const { alignment, setState, html, css, additionalLinks } = useContext(
    EditorContext
  );
  return (
    <Grid templateRows="auto 1fr" h="100%">
      <Box borderBottomWidth="1px" px="4" py="2">
        <ToggleButtons
          options={alignments}
          name="Alignments"
          value={alignment}
          onChange={(newAlignment) => setState({ alignment: newAlignment })}
          size="sm"
          mr="2"
        />
      </Box>
      <ZoomOut>
        <Preview
          html={html}
          css={css}
          alignment={alignment}
          additionalLinks={additionalLinks}
        />
      </ZoomOut>
    </Grid>
  );
};

export default ScreenPreview;
