import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, IconButton, InputGroup, Input, InputRightElement } from "@chakra-ui/core";
import { connect } from "react-redux";
import { CopyToClipboard } from 'react-copy-to-clipboard';

function CopyCode({ code, narrow, ...props }) {
  const [copied, setCopied] = useState(false);

  if(!code) {
    return null
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
        <CopyToClipboard text={code} onCopy={handleCopy}>
            {narrow ? (
                <IconButton
                    aria-label="Copy Code"
                    icon="copy"
                    variant="ghost"
                    {...props} />
            ) : (
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
                        size="sm">
                        {copied ? "copied" : "copy"}
                    </Button>
                    </InputRightElement>
                </InputGroup>
            )}

        </CopyToClipboard>
    );

}

const mapStateToProps = state => ({
  code: state.creation.id
})
export default connect(mapStateToProps)(CopyCode);

CopyCode.propTypes = {
  code: PropTypes.string,
  narrow: PropTypes.bool
};
