import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";
import { useTheme } from "@chakra-ui/core";

const SelectTags = props => {
  const theme = useTheme();
  const [tags, setTags] = useState([]);

  const mapStringsToTags = stringTag => ({
    label: stringTag,
    value: stringTag
  });
  const clearOptions = options => options.map(({ value }) => value);

  const defaultTags = [
    "Hero",
    "Testimonials",
    "Team",
    "Features",
    "Princing",
    "Gallery",
    "Content",
    "Card"
  ].map(mapStringsToTags);

  useEffect(() => {
    const tagsParsed = props.value.map(mapStringsToTags);
    setTags(tagsParsed);
  }, [props.value]);

  // https://react-select.com/styles
  const customStyles = {
    placeholder: provided => ({
      ...provided,
      color: theme.colors.gray[400]
    }),
    valueContainer: provided => ({
      ...provided,
      fontSize: theme.fontSizes.md,
      paddingLeft: theme.space["3"]
    }),
    menu: (provided, state) => ({
      ...provided,
      fontSize: theme.fontSizes.md
    })
  };

  const handleChange = (newValue, actionMeta) => {
    if (newValue) {
      const options = clearOptions(newValue);
      props.onChange(options);
    } else {
      props.onChange([]);
    }
  };
  return (
    <CreatableSelect
      isMulti
      styles={customStyles}
      placeholder={props.placeholder}
      value={tags}
      theme={selecteTheme => ({
        ...selecteTheme,
        borderRadius: theme.radii.md,
        spacing: {
          ...selecteTheme.spacing,
          controlHeight: 40
        },
        colors: {
          ...selecteTheme.colors,
          primary75: theme.colors.blue["200"],
          primary50: theme.colors.blue["100"],
          primary25: theme.colors.blue["50"],
          primary: theme.colors.blue["500"],
          danger: theme.colors.gray["800"],
          dangerLight: theme.colors.gray["300"],
          neutral0: theme.colors.white,
          neutral5: theme.colors.gray["50"],
          neutral10: theme.colors.gray["100"],
          neutral20: theme.colors.gray["200"],
          neutral30: theme.colors.gray["300"],
          neutral40: theme.colors.gray["400"],
          neutral50: theme.colors.gray["500"],
          neutral60: theme.colors.gray["600"],
          neutral70: theme.colors.gray["700"],
          neutral80: theme.colors.gray["800"],
          neutral90: theme.colors.gray["900"]
        }
      })}
      onChange={handleChange}
      options={defaultTags}
    />
  );
};

export default SelectTags;

SelectTags.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
