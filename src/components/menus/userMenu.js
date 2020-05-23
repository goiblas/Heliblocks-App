import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  Text
} from "@chakra-ui/core";
import useMediaQuery from "react-use-media-query-hook";
import SignIn from "./signIn";
import { AuthContext, signOut } from "./../../services/auth";

export const UserMenu = () => {
  const isTablet = useMediaQuery("(min-width: 600px)");
  const { isLoaded, user } = useContext(AuthContext);

  if (!isLoaded) {
    return null;
  }

  if (!user) {
    return <SignIn ml="4" />;
  }

  return (
    <Menu>
      <MenuButton
        data-testid="dropdown"
        size="sm"
        ml="2"
        as={Button}
        variant="link"
        rightIcon="chevron-down"
      >
        <Avatar name="Kent Dodds" size="sm" src={user.photoURL} />
        {isTablet && (
          <Text as="span" ml="2">
            {user.displayName}
          </Text>
        )}
      </MenuButton>
      <MenuList placement="bottom-end" zIndex="tooltip">
        <MenuItem as={Link} to={`/user/${user.uid}`}>
          Profile
        </MenuItem>
        <MenuItem data-testid="logout-button" onClick={signOut}>
          Log Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
