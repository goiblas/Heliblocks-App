import React, { useState, useContext } from "react";
import {
  Button,
  InputGroup,
  Input,
  InputRightElement
} from "@chakra-ui/core";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { EditorContext } from "./../editorContext"

const CopyCode = ({ narrow, ...props }) => {
  const { id } = useContext(EditorContext);
  const [copied, setCopied] = useState(false);

  if (!id) {
    return null;
  }

  const handleCopy = () => {
    if (!copied) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <CopyToClipboard text={id} onCopy={handleCopy}>
      {narrow ? (
        <Button size="sm" leftIcon="copy" {...props}>
          {copied ? "copied" : "Code"}
        </Button>
      ) : (
        <InputGroup>
          <Input
            fontSize="sm"
            pr="4.8rem"
            type="text"
            value={id}
            {...props}
            isReadOnly
          />
          <InputRightElement width="4.8rem">
            <Button ml="auto" mr="4px" fontWeight="regular" size="sm">
              {copied ? "copied" : "copy"}
            </Button>
          </InputRightElement>
        </InputGroup>
      )}
    </CopyToClipboard>
  );
}

export default CopyCode;
