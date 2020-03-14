import React from "react";
import { Box, Flex, Select, Grid } from "@chakra-ui/core";
import { alignments, themes } from "./config";
import RadioButtonGroup from "../../radioButtonGroup";
import Screen from "./screen";
import { updateCreation } from "./../../../store/creation/actions";
import { connect } from "react-redux";

function Preview({ alignment, theme, setProp }) {
  return (
      <Grid templateRows="auto 1fr" h="100%">
        <Box borderBottomWidth="1px" px="4">
          <Flex height="48px" justifyContent="space-between" alignItems="center">
            <RadioButtonGroup
              defaultValue={alignment}
              mr="2"
              size="sm"
              onChange={(newAlignment) => setProp({alignment: newAlignment})}
            >
              {alignments.map(alignment => (
                <RadioButtonGroup.radio key={alignment.id} value={alignment.id}>
                  {alignment.name}
                </RadioButtonGroup.radio>
              ))}
            </RadioButtonGroup>

            <Select size="sm" w="120" value={theme} onChange={e => setProp({ theme: e.target.value}) }>
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

const mapStateToProps = state => ({
  alignment: state.creation.alignment,
  theme: state.creation.theme
})
const mapDispatchToProps = {
  setProp: updateCreation
};
export default connect(mapStateToProps, mapDispatchToProps)(Preview);
