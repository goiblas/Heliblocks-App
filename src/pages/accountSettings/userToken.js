import React, { useState, useEffect } from "react";
import {
  Textarea,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  useToast,
  Box,
  Grid,
  Text,
} from "@chakra-ui/core";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { generateToken, getToken } from "services/users";

const UserToken = ({ uid }) => {
  const [token, setToken] = useState("");
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getToken(uid).then((response) => {
      if (!response.notFound) {
        setToken(response.value);
        setIsLoading(false);
      } else {
        handleGenerate();
      }
    });
  }, [uid]);

  const handleGenerate = async () => {
    setIsLoading(true);
    const data = await generateToken();
    setToken(data.token);
    setIsLoading(false);
  };

  const handleCopy = () => {
    toast({
      position: "bottom-left",
      duration: 1100,
      render: (props) => {
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
            Token Copied!
          </Box>
        );
      },
    });
  };
  return (
    <FormControl>
      <FormLabel htmlFor="token"> Token </FormLabel>
      <Grid templateColumns={["1fr", "1fr auto"]} columnGap="6">
        <Box>
          <InputGroup size="md" flexGrow="1">
            <Textarea
              pr="5rem"
              value={token}
              isDisabled={isLoading}
              isReadOnly
            />
            <InputRightElement width="4.5rem">
              <CopyToClipboard text={token} onCopy={handleCopy}>
                <Button h="1.75rem" size="sm" isDisabled={isLoading}>
                  copy
                </Button>
              </CopyToClipboard>
            </InputRightElement>
          </InputGroup>
          <Text fontSize="sm" color="gray.500" py="2">
            This token allows you to identify yourself from WordPress plugin,
            you don't share it
          </Text>
        </Box>
        <Button onClick={handleGenerate}>Regenerate</Button>
      </Grid>
    </FormControl>
  );
};

export default UserToken;
