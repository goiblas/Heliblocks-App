import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Box,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Text,
  Link,
  IconButton
} from "@chakra-ui/core";
import BaseEditor from "./baseEditor";
import { useDebouncedCallback } from "use-debounce";
import { debounceTime } from "./config";

const Panel = ({
  language,
  value,
  availableLanguages,
  onChangeLanguage,
  onChange
}) => {
  const [debouncedCallback] = useDebouncedCallback(onChange, debounceTime);
  return (
    <Grid templateRows="56px 1fr" h="100%">
      <Box px="4" py="3">
        <Text as="span" fontWeight="semibold" fontSize="sm">{language.toUpperCase()}</Text>
        {availableLanguages && (
          <Menu>
            <MenuButton size="sm" as={Link}>
              <IconButton
                aria-label="Preprocessor"
                icon="chevron-down"
                size="xs"
                variant="ghost"
                fontSize="18px"
              />
            </MenuButton>
            <MenuList minW="140px" placement="bottom-start">
              {availableLanguages
                .filter(available => available !== language)
                .map(available => (
                  <MenuItem
                    fontSize="sm"
                    key={available}
                    onClick={() => onChangeLanguage(available)}
                  >
                    {available.toUpperCase()}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
        )}
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
  onChange: PropTypes.func.isRequired,
  availableLanguages: PropTypes.arrayOf(PropTypes.string),
  onChangeLanguage: function(props, propName) {
    if (
      props.availableLanguages &&
      (!props[propName] || typeof props[propName] !== "function")
    ) {
      return new Error(
        "Provide a handle change language if set available languages"
      );
    }
  }
};
