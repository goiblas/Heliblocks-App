import React from "react";
import { IconButton, useToast, Box } from "@chakra-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyId = ({ id }) => {
  const toast = useToast();

  const handleCopy = () => {
    toast({
      position: "bottom-left",
      duration: 1100,
      render: props => {
        return (
          <Box
            bg="dark.700"
            borderRadius="4px"
            py="3"
            px="5"
            ml="2"
            mb="2"
            color="white"
            {...props}
          >
            Id Copied!
          </Box>
        );
      }
    });
  };
  return (
    <CopyToClipboard text={id} onCopy={handleCopy}>
      <IconButton
        variant="link"
        size="lg"
        p={[3, 4]}
        minW="0"
        icon="copy"
        aria-label="Copy id"
      />
    </CopyToClipboard>
  );
};

export default CopyId;
