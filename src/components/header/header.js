import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import { UserMenu, SignIn } from "./../menus";
import useMediaQuery from "react-use-media-query-hook";
// import Logo from "../logo";
import { Box, Button, useTheme, Flex } from "@chakra-ui/core";
import { Logo } from "./../../theme/logo";

export const Header = ({ auth }) => {
  const { isLoaded, uid } = auth;
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 700px)");

  const globalStyles = css`
    body {
      padding-bottom: 86px;
    }
  `;

  return (
    <WrapperHeader>
      <Box pl="6" pr="6">
        <Link to="/">
          <Logo />
        </Link>
      </Box>
      {isMobile && <Global styles={globalStyles} />}
      <StickyMenu zindex={theme.zIndices.sticky}>
        <Link to="/explore">Explore</Link>
        <Link to="/documentation">Documentation</Link>
        <DesktopSpace />
        {isMobile ? (
          <Link to="/create">Create</Link>
        ) : (
          <Button as={Link} to="/create" variantColor="blue" mr="4">
            Create
          </Button>
        )}

        {isLoaded && (uid ? <UserMenu /> : <SignIn />)}
      </StickyMenu>
    </WrapperHeader>
  );
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(Header);

const DesktopSpace = styled.div`
  display: none;
  @media (min-width: 700px) {
    flex-grow: 1;
    display: block;
  }
`;
const WrapperHeader = styled.header`
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 1px #ececed, 0 1px 3px 0 rgba(41, 71, 98, 0.1);
`;
const StickyMenu = styled.div`
  display: flex;
  width: 100%;
  padding: 0 16px;
  align-items: center;

  @media (min-width: 700px) {
    > a {
      margin-left: 8px;
      margin-right: 8px;
    }
  }
  @media (max-width: 699px) {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px 16px;
    z-index: ${({ zindex }) => zindex};
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1),
      0 -2px 4px -1px rgba(0, 0, 0, 0.06);
    justify-content: space-between;
    align-items: center;
    height: 62px;
    background-color: #fff;
    > a {
      font-size: 13px;
      margin-right: 8px;
    }
  }
`;
