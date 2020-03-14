import React from "react";
import PropTypes from "prop-types";
import { Editable, EditablePreview, EditableInput } from "@chakra-ui/core";

const Title = ({ value, onChange, ...props }) => (
  <Editable
    w="110px"
    mr={[2, 10]}
    flexGrow="1"
    placeholder="Add title"
    onSubmit={onChange}
    defaultValue={value}
    {...props}
  >
    <EditablePreview
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      display="block"
    />
    <EditableInput />
  </Editable>
);

export default Title;

Title.propTypes = {
  ...Editable.propTypes,
  onChange: PropTypes.func,
  value: PropTypes.string
};

Title.defaultProps = {
  value: "Untitled",
  onChange: () => {}
};
