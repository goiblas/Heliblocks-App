import React, { useReducer, useContext } from "react";
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
  Textarea,
  Switch,
  Flex,
  Tag,
} from "@chakra-ui/core";
import SelectTags from "./selectTags";
import { EditorContext } from "./../editorContext";
import { AuthContext } from "services/auth";

const Settings = (props) => {
  const user = useContext(AuthContext);
  console.log(user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const {
    description,
    tags,
    additionalLinks,
    restricted,
    setState,
  } = useContext(EditorContext);

  const [innerState, setInnerState] = useReducer(
    (innerState, newInnerState) => ({ ...innerState, ...newInnerState }),
    { description, tags, additionalLinks, restricted }
  );

  const requestRestrict = (e) => {
    if (true) {
      setInnerState({ restricted: !innerState.restricted });
    } else {
      // mostrar toast
    }
  };
  const saveHandle = () => {
    onClose();
    setState(innerState);
  };

  return (
    <>
      <Button fontWeight="normal" color="gray.800" onClick={onOpen} {...props}>
        Settings
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                ref={initialRef}
                value={innerState.description}
                onChange={(e) => setInnerState({ description: e.target.value })}
                placeholder="Add Description"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Tags</FormLabel>
              <SelectTags
                onChange={(tags) => setInnerState({ tags })}
                value={innerState.tags}
              />
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Embed font</FormLabel>
              <Textarea
                value={innerState.additionalLinks}
                onChange={(e) =>
                  setInnerState({ additionalLinks: e.target.value })
                }
                placeholder="Enter link tag"
              />
            </FormControl>
            <FormControl mt="4">
              <Flex>
                <Switch
                  id="private"
                  mr="4"
                  onChange={requestRestrict}
                  isChecked={innerState.restricted}
                />
                <FormLabel htmlFor="private">
                  <strong> Make this block private </strong>
                  <br />
                  Puedes tener solo un bloque privado, para tener bloque
                  privados ilimitados necesitas <Tag>PRO</Tag>
                </FormLabel>
              </Flex>
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

export default Settings;

Settings.propTypes = {
  ...Button.propTypes,
  tags: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  setProp: PropTypes.func,
};
