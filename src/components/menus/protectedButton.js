import React, { useContext } from "react";
import { signInWithGithub, AuthContext } from "services/auth";
import { GithubIcon } from "theme/icons";
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
} from "@chakra-ui/react";

const ProtectedButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const { isLoaded, user } = useContext(AuthContext);

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
              <Button
                colorScheme="primary"
                leftIcon={<GithubIcon />}
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

  return <Button {...props} />;
};

export default ProtectedButton;
