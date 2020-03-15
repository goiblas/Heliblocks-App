import React from "react";
import PropTypes from "prop-types";
import { Editable, EditablePreview, EditableInput } from "@chakra-ui/core";
import { connect } from "react-redux";
import { updateCreation } from "./../../../store/creation/actions";

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

const mapStateToProps = state => ({
  value: state.creation.title
});
const mapDispatchToProps = {
  onChange: title => updateCreation({ title }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);

Title.propTypes = {
  ...Editable.propTypes,
  onChange: PropTypes.func,
  value: PropTypes.string
};

Title.defaultProps = {
  value: "Untitled",
  onChange: () => {}
};
