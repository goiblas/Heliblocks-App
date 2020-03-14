import React, { useEffect } from "react";
import { Box, Flex, Select, Grid } from "@chakra-ui/core";
import { PreviewContext } from "./previewContext";
import useMockup from "./useMockup";
import PreviewConfig from "./config";
import RadioButtonGroup from "../../radioButtonGroup";
import Screen from "./screen";
import { connect } from "react-redux";

function Preview(props) {
  const  { themes, alignments } = PreviewConfig;

  const mockupConfig = {
    alignment: props.alignment,
    theme: props.theme
  };

  const initialContent = `<style>${props.css}</style>${props.html}`;

  const {
    html,
    alignment,
    setAlignment,
    theme,
    setTheme,
    setHtml
  } = useMockup( initialContent , mockupConfig);

  useEffect(() => {
    setHtml(`<style>${props.css}</style>${props.html}`);
  })

  return (
    <PreviewContext.Provider
      value={{
        html,
        alignment,
        setAlignment,
        theme,
        setTheme,
        disabled: props.disabled
      }}
    >
      <Grid templateRows="auto 1fr" h="100%">
        <Box borderBottomWidth="1px" px="4">
          <Flex height="48px" justifyContent="space-between" alignItems="center">
            <RadioButtonGroup
              defaultValue={alignment}
              mr="2"
              size="sm"
              onChange={setAlignment}
            >
              {alignments.map(alignment => (
                <RadioButtonGroup.radio key={alignment.id} value={alignment.id}>
                  {alignment.name}
                </RadioButtonGroup.radio>
              ))}
            </RadioButtonGroup>

            <Select size="sm" w="120" value={theme} onChange={e => setTheme(e.target.value) }>
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
    </PreviewContext.Provider>
  );
}

// import { getAlignment } from './store/creation'

// /creation
//    index.js
//    selectors.js


// index.js
// export * from './selectors.js'

const mapStateToProps = state => ({
  // alignment: getAlignment(state),
  alignment: state.creation.alignment,
  theme: state.creation.theme
})
export default connect(mapStateToProps)(Preview);
