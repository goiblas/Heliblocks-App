import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";
import { useTheme } from "@emotion/react";

const mapStringsToTags = (stringTag) => ({
  label: stringTag,
  value: stringTag,
});
const clearOptions = (options) => options.map(({ value }) => value);
const defaultTags = [
  "Hero",
  "Testimonials",
  "Team",
  "Features",
  "Princing",
  "Gallery",
  "Content",
  "Card",
].map(mapStringsToTags);

const SelectTags = ({ value, onChange }) => {
  const theme = useTheme();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const tagsParsed = value.map(mapStringsToTags);
    setTags(tagsParsed);
  }, [value]);

  // https://react-select.com/styles
  const customStyles = {
    placeholder: (provided) => ({
      ...provided,
      color: theme.colors.gray[400],
    }),
    valueContainer: (provided) => ({
      ...provided,
      fontSize: theme.fontSizes.md,
      paddingLeft: theme.space["3"],
    }),
    menu: (provided, state) => ({
      ...provided,
      fontSize: theme.fontSizes.md,
    }),
  };

  const handleChange = (newValue, actionMeta) => {
    if (newValue) {
      const options = clearOptions(newValue);
      onChange(options);
    } else {
      onChange([]);
    }
  };
  return (
    <CreatableSelect
      isMulti
      styles={customStyles}
      placeholder="Add tags"
      value={tags}
      theme={(selecteTheme) => ({
        ...selecteTheme,
        borderRadius: theme.radii.md,
        spacing: {
          ...selecteTheme.spacing,
          controlHeight: 40,
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
          neutral90: theme.colors.gray["900"],
        },
      })}
      onChange={handleChange}
      options={defaultTags}
    />
  );
};

export default SelectTags;

SelectTags.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};
