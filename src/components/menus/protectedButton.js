import React, { useContext } from "react";
import { signInWithGithub, AuthContext } from "services/auth";
import { setUser } from "services/users";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Heading,
} from "@chakra-ui/core";

const ProtectedButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const { isLoaded, user } = useContext(AuthContext);

  const signIn = async () => {
    try {
      const { uid, displayName, photoURL, profile } = await signInWithGithub();
      await setUser(uid, {
        displayName,
        photoURL,
        githubURL: profile.html_url,
      });
    } catch (error) {}
  };

  if (!user) {
    return (
      <>
        <Button {...props} isDisabled={!isLoaded} onClick={onOpen} />
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader />
            <ModalCloseButton />
            <ModalBody textAlign="center" pb={6}>
              <Heading size="lg" mb="4">
                Need to be register
              </Heading>
              <Button variantColor="primary" leftIcon="github" onClick={signIn}>
                Login with Github
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return <Button {...props} />;
};

export default ProtectedButton;
