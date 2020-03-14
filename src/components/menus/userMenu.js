import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "./../../store/auth/actions";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Text
} from "@chakra-ui/core";
import useMediaQuery from "react-use-media-query-hook";
import SignIn from "./signIn";

export const UserMenu = ({ profile, auth, signOut }) => {
  const isTablet = useMediaQuery("(min-width: 600px)");
  const { isLoaded, uid } = auth;

  if (!isLoaded) {
    return null;
  }

  if (!uid) {
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
        <Avatar name="Kent Dodds" size="sm" src={profile.photoURL} />
        {isTablet && (
          <Text as="span" ml="2">
            {profile.displayName}
          </Text>
        )}
      </MenuButton>
      <MenuList placement="bottom-end">
        <MenuItem as={NavLink} to={`/user/${auth.uid}`}>
          Profile
        </MenuItem>
        <MenuDivider />
        <MenuItem data-testid="logout-button" onClick={signOut}>
          Log Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const mapStateToProps = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth
});
export default connect(mapStateToProps, { signOut })(UserMenu);
