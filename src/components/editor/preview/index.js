import React, { useContext } from "react";
import { Box, Flex, Select, Grid } from "@chakra-ui/core";
import { alignments, themes } from "./config";
import RadioButtonGroup from "../../radioButtonGroup";
import Screen from "./screen";
import { EditorContext } from "./../editorContext"

const Preview = () => {
    const { alignment, theme, setState } = useContext(EditorContext)

  return (
      <Grid templateRows="auto 1fr" h="100%">
        <Box borderBottomWidth="1px" px="4">
          <Flex height="48px" justifyContent="space-between" alignItems="center">
            <RadioButtonGroup
              defaultValue={alignment}
              mr="2"
              size="sm"
              onChange={(newAlignment) => setState({alignment: newAlignment})}
            >
              {alignments.map(alignment => (
                <RadioButtonGroup.radio key={alignment.id} value={alignment.id}>
                  {alignment.name}
                </RadioButtonGroup.radio>
              ))}
            </RadioButtonGroup>

            <Select size="sm" w="120" value={theme} onChange={e => setState({ theme: e.target.value}) }>
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </Select>
          </Flex>
        </Box>
        <Screen />
      </Grid>
  );
}

export default Preview;
