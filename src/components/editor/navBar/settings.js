import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormLabel,
  FormControl,
  Input,
  Textarea
} from "@chakra-ui/core";

import SelectTags from "./selectTags";

const ModalSettings = ({ aditional, description, tags, setProp, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  const reducer = (preState, updateProperty) => ({
    ...preState,
    ...updateProperty
  });
  const [state, setState] = useReducer(reducer, { description, tags });

  const saveHandle = () => {
    onClose();
    setProp(state);
  };
  return (
    <>
      <Button fontWeight="medium" onClick={onOpen} {...props}>
        Settings
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                ref={initialRef}
                value={state.description}
                onChange={e => setState({ description: e.target.value })}
                placeholder="Add Description"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tags</FormLabel>
              <SelectTags
                onChange={tags => setState({ tags })}
                placeholder="Add tags"
                value={state.tags}
              />
            </FormControl>

            {aditional && (
              <FormControl mt={4}>
                <FormLabel>{aditional.label}</FormLabel>
                {aditional.node}
              </FormControl>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" onClick={saveHandle}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSettings;

ModalSettings.propTypes = {
  ...Button.propTypes,
  tags: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  setProp: PropTypes.func,
  aditional: PropTypes.shape({
    label: PropTypes.string.isRequired,
    node: PropTypes.node.isRequired
  })
};
