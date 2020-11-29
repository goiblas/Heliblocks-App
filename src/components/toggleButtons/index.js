import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { RadioGroup, useRadio, useRadioGroup, Box } from "@chakra-ui/react";
import theme from "theme";

export default function ToggleButtons({
  name,
  options,
  value,
  onChange,
  size = "md",
  ...props
}) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: value,
    name,
    onChange,
  });

  const group = getRootProps();

  return (
    <RadioGroupStyled {...group} {...props}>
      {options.map(({ label, value }, index) => {
        const radio = getRadioProps({ value });
        return (
          <RadioButton
            size={size}
            isFirst={index === 0}
            isLast={index === options.length - 1}
            key={value}
            {...radio}
          >
            {label}
          </RadioButton>
        );
      })}
    </RadioGroupStyled>
  );
}

const heights = {
  xs: theme.sizes["6"],
  sm: theme.sizes["8"],
  md: theme.sizes["10"],
  lg: theme.sizes["12"],
};
const paddingX = {
  xs: 2,
  sm: 3,
  md: 3,
  lg: 4,
};

function RadioButton({ isFirst, isLast, size, ...props }) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        fontWeight="normal"
        bg="white"
        borderTopRightRadius={isLast ? "md" : "0"}
        borderBottomRightRadius={isLast ? "md" : "0"}
        borderTopLeftRadius={isFirst ? "md" : "0"}
        borderBottomLeftRadius={isFirst ? "md" : "0"}
        borderWidth="1px"
        marginLeft="-1px"
        display="inline-flex"
        alignItems="center"
        height={heights[size]}
        cursor="pointer"
        _checked={{
          bg: "gray.500",
          color: "white",
          borderColor: "gray.500",
        }}
        _focus={{
          boxShadow: "outline",
          position: "relative",
          zIndex: "1",
        }}
        fontSize={size}
        px={paddingX[size]}
      >
        {props.children}
      </Box>
    </Box>
  );
}

ToggleButtons.propTypes = {
  ...RadioGroup.propTypes,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
};
ToggleButtons.defaultProps = {
  size: "md",
  onChange: () => {},
};

const RadioGroupStyled = styled(RadioGroup)`
  display: flex;
  align-items: center;
  margin-left: 1px;
`;
