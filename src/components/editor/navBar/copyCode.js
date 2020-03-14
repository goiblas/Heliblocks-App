import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, InputGroup, Input, InputRightElement } from "@chakra-ui/core";

function CopyCode({ code, ...props }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!copied) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };
  return (
    <InputGroup>
      <Input
        fontSize="sm"
        pr="4.8rem"
        type="text"
        value={code}
        {...props}
        isReadOnly
      />
      <InputRightElement width="4.8rem">
        <Button
          ml="auto"
          mr="4px"
          fontWeight="regular"
          size="sm"
          onClick={handleCopy}
        >
          {copied ? "copied" : "copy"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default CopyCode;

CopyCode.propTypes = {
  ...Input.propTypes,
  code: PropTypes.string.isRequired
};
