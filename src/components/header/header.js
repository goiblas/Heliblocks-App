import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import { UserMenu, SignIn, CreateButton } from "./../menus";

export const Header = ({ auth }) => {
  const { isLoaded, uid } = auth;
  return (
    <HeaderWrapper>
      <Logo to="/">Heliblocks</Logo>
      <Link to="/explore">Explore</Link>
      <Link to="/">Documentation</Link>
      <Space />
      {isLoaded && (
        <div>
          <CreateButton />
          {uid ? <UserMenu /> : <SignIn />}
        </div>
      )}
    </HeaderWrapper>
  );
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(Header);

const Space = styled.div`
  flex-grow: 1;
`;
const HeaderWrapper = styled.header`
  height: 64px;
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled(Link)`
  text-transform: uppercase;
  color: #999;
  text-decoration: none;
  margin-right: 2rem;
`;
