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
  Link,
  useToast,
} from "@chakra-ui/core";
import SelectTags from "./selectTags";
import { EditorContext } from "./../editorContext";
import { AuthContext } from "services/auth";
import { Link as RouterLink } from "react-router-dom";
import { useCanSaveRestrictedHeliblocks } from "hooks";

const isPRO = (user) => user && user.stripeRole === "pro";

const Settings = (props) => {
  const { user } = useContext(AuthContext);
  const [
    isloadedCanSaveRestrit,
    canSaveRestrit,
  ] = useCanSaveRestrictedHeliblocks();
  const toast = useToast();
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
    if (canSaveRestrit) {
      setInnerState({ restricted: !innerState.restricted });
    } else {
      toast({
        position: "bottom-left",
        description:
          "You have reached the limit of private blocks, Upgrade to PRO to get unlimited private blocks",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
                  isDisabled={!isloadedCanSaveRestrit}
                />
                <FormLabel htmlFor="private">
                  <strong> Make this block private </strong>
                  <br />
                  {isPRO(user) ? (
                    <>You can have unlimited private blocks</>
                  ) : (
                    <>
                      You can only have one private block, to have unlimited
                      private blocks{" "}
                      <Link
                        color="primary.500"
                        fontWeight="600"
                        as={RouterLink}
                        to="/account-settings"
                      >
                        upgrade to PRO Acount
                      </Link>
                    </>
                  )}
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
