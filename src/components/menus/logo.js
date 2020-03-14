import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export const Logo = () => (
  <LinkStyled to="/">
    <Isotipo />
    <LogoText>Heliblocks</LogoText>
  </LinkStyled>
);
export default Logo;

const LinkStyled = styled(Link)`
  display: flex;
  align-items: center;
`;
const LogoText = styled.div`
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  margin-right: 2rem;
  transform: translateY(2px);

  @media (max-width: 520px) {
    display: none;
  }
`;
const Isotipo = styled.div`
  width: 28px;
  height: 28px;
  margin-right: 8px;
  background-color: #1592e6;
  border-radius: 100%;
`;
