import React, { useContext } from "react";
import { Box, Grid } from "@chakra-ui/core";
import RadioButtonGroup from "components/radioButtonGroup";
import { EditorContext } from "./../editorContext";
import Preview from "components/preview";
import ZoomOut from "./zoomOut";

export const alignments = [
  {
    id: "normal",
    name: "Normal"
  },
  {
    id: "wide",
    name: "Wide"
  },
  {
    id: "full",
    name: "Full"
  }
];

const ScreenPreview = () => {
  const { alignment, setState, html, css, additionalLinks } = useContext(EditorContext);
  return (
    <Grid templateRows="auto 1fr" h="100%">
      <Box borderBottomWidth="1px" px="4" py="2">
        <RadioButtonGroup
          defaultValue={alignment}
          mr="2"
          size="sm"
          onChange={newAlignment => setState({ alignment: newAlignment })}
        >
          {alignments.map(alignment => (
            <RadioButtonGroup.radio key={alignment.id} value={alignment.id}>
              {alignment.name}
            </RadioButtonGroup.radio>
          ))}
        </RadioButtonGroup>
      </Box>
      <ZoomOut>
        <Preview html={html} css={css} alignment={alignment} additionalLinks={additionalLinks} />
      </ZoomOut>
    </Grid>
  );
};

export default ScreenPreview;
