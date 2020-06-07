import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { RadioButtonGroup, Button } from "@chakra-ui/core";

const CustomRadioButtonGroup = React.forwardRef(
  ({ size, children, ...props }, ref) => {
    return (
      <RadioButtonGroupStyled ref={ref} {...props}>
        {React.Children.map(children, child =>
          React.cloneElement(child, { size })
        )}
      </RadioButtonGroupStyled>
    );
  }
);
CustomRadioButtonGroup.radio = React.forwardRef((props, ref) => (
  <CustomRadio ref={ref} {...props} />
));

export default CustomRadioButtonGroup;

CustomRadioButtonGroup.propTypes = {
  ...RadioButtonGroup.propTypes,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"])
};
CustomRadioButtonGroup.defaultProps = {
  rounded: 4,
  size: "md"
};

CustomRadioButtonGroup.radio.propTypes = Button.propTypes;

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, size, mb, ...rest } = props;
  return (
    <Button
      size={size}
      rounded="0"
      marginRight="0"
      ref={ref}
      fontWeight="normal"
      variantColor={isChecked ? "dark" : "gray"}
      backgroundColor={isChecked ? null : "white"}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      borderWidth="1px"
      borderColor={isChecked ? "dark.500" : null}
      marginLeft="-1px"
      mb="0"
      {...rest}
    />
  );
});

const RadioButtonGroupStyled = styled(RadioButtonGroup)`
  display: flex;
  align-items: center;
  margin-left: 1px;

  & > *:first-of-type {
    border-radius: ${({ rounded }) => {
      return `${rounded}px 0 0 ${rounded}px`;
    }};
  }
  & > *:last-of-type {
    border-radius: ${({ rounded }) => {
      return `0 ${rounded}px ${rounded}px 0`;
    }};
  }
  & > *:focus {
    position: relative;
    z-index: 1;
  }
`;
