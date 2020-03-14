import React from "react";
import { connect } from "react-redux";
import { signIn } from "./../../store/auth/actions";

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

const ProtectedButton = ({ auth, signIn, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const { isLoaded, uid } = auth;

  if (!isLoaded) {
    return null;
  }

  const buttonProps = {
    variantColor: "blue",
    fontWeight: "normal",
    leftIcon: "cloud",
    size: "md",
    ...props
  };

  if (uid) {
    return <Button {...buttonProps} />;
  }

  return (
    <>
      <Button {...buttonProps} onClick={onOpen} />
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody textAlign="center" pb={6}>
            <Heading size="lg">Ups!</Heading>
            <Text mb="4">Need to be register</Text>
            <Button variantColor="blue" leftIcon="github" onClick={signIn}>
              Login with Github
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.firebase.auth
});
export default connect(mapStateToProps, { signIn })(ProtectedButton);
