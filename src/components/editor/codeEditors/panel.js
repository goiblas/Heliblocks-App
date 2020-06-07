import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Text } from "@chakra-ui/core";
import BaseEditor from "./baseEditor";
import { useDebouncedCallback } from "use-debounce";

const debounceTime = "400";
const Panel = ({ language, value, onChange }) => {
  const [debouncedCallback] = useDebouncedCallback(onChange, debounceTime);
  return (
    <Grid templateRows="56px 1fr" h="100%">
      <Box px="4" py="3">
        <Text as="span" fontWeight="semibold" fontSize="sm">
          {language.toUpperCase()}
        </Text>
      </Box>
      <BaseEditor
        language={language}
        value={value}
        onChange={debouncedCallback}
      />
    </Grid>
  );
};

export default Panel;

Panel.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
