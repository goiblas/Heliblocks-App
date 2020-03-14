import React from "react";
import Header from "../../components/header";
import styled from "@emotion/styled";

const Home = () => (
  <>
    <Header />
    <Content>
      <h1>Wellcome to Heliblocks</h1>
      <h2>Landing de Presentación del proyecto</h2>
    </Content>
  </>
);
export default Home;

const Content = styled.div`
  max-width: 1340px;
  margin: auto;
  width: 92%;
  padding-top: 64px;
`;
