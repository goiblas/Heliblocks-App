import React, { useContext } from "react";
import { signInWithGithub, AuthContext } from "services/auth";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Heading
} from "@chakra-ui/core";

const ProtectedButton = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const { isLoaded, user } = useContext(AuthContext);

  const buttonProps = {
    variantColor: "blue",
    fontWeight: "normal",
    leftIcon: "cloud",
    size: "md",
    ...props
  };

  if (!user) {
    return (
      <>
        <Button {...buttonProps} isDisabled={!isLoaded} onClick={onOpen} />
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader />
            <ModalCloseButton />
            <ModalBody textAlign="center" pb={6}>
              <Heading size="lg">Ups!</Heading>
              <Text mb="4">Need to be register</Text>
              <Button
                variantColor="blue"
                leftIcon="github"
                onClick={signInWithGithub}
              >
                Login with Github
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return <Button {...buttonProps} />;
};

export default ProtectedButton;
