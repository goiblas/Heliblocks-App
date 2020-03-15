import React, { useReducer } from "react";
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
  Textarea
} from "@chakra-ui/core";
import SelectTags from "./selectTags";
import { updateCreation } from "./../../../store/creation/actions";
import { connect } from "react-redux";

const Settings = ({ description, tags, setProp, ...props }) => {
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
                value={state.tags}
              />
            </FormControl>

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
const mapStateToProps = state => ({
  tags: state.creation.tags,
  description: state.creation.description
})
const mapDispatchToProps = {
  setProp: updateCreation
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);

Settings.propTypes = {
  ...Button.propTypes,
  tags: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  setProp: PropTypes.func,
};
