import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  Box,
} from "@chakra-ui/core";
import { AuthContext, signOut } from "services/auth";
import SignIn from "./signIn";

export const UserMenu = () => {
  const { isLoaded, user } = useContext(AuthContext);

  if (!isLoaded) {
    return <Box w="53px" />;
  }

  if (!user) {
    return <SignIn />;
  }
  return (
    <Menu>
      <MenuButton
        data-testid="dropdown"
        size="sm"
        ml="1"
        as={Button}
        variant="link"
        rightIcon="dropdown"
      >
        <Avatar name={user.displayName} size="sm" src={user.photoURL} />
      </MenuButton>
      <MenuList placement="bottom-end" zIndex="tooltip">
        <MenuItem as={Link} to={`/user/${user.uid}`}>
          Profile
        </MenuItem>
        <MenuItem as={Link} to={`/account-settings`}>
          Account settings
        </MenuItem>
        <MenuItem data-testid="logout-button" onClick={signOut}>
          Log Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
