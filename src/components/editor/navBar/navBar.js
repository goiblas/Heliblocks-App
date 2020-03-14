import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/core";
import CopyCode from "./copyCode";
import Settings from "./settings";
import useMediaQuery from "react-use-media-query-hook";

function NavBar({ id, action, ...props }) {
  const isDesktop = useMediaQuery("(min-width: 880px)");

  const CodeComponent = () => {
    if (!id) return null;
    return <CopyCode w="100%" code={id} />;
  };
  const ModalSettings = () => {
    if (isDesktop) {
      return <Settings mr="2" {...props} />;
    }
    return (
      <Settings
        size="sm"
        mr="3"
        variant="link"
        {...props}
        aditional={
          id && {
            label: "Code",
            node: <CodeComponent />
          }
        }
      />
    );
  };
  return (
    <Flex justifyContent="space-between" flexGrow="1">
      {isDesktop && <CodeComponent />}
      <Flex ml="auto">
        <ModalSettings {...props} />
        {action}
      </Flex>
    </Flex>
  );
}

export default NavBar;

NavBar.propTypes = {
  onChangeTitle: PropTypes.func,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  onChangeTags: PropTypes.func,
  description: PropTypes.string,
  onChangeDescription: PropTypes.func,
  onSave: PropTypes.func,
  id: PropTypes.string,
  action: PropTypes.node
};

NavBar.defaultProps = {
  title: "Untitled"
};
