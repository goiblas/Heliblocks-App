import React from "react";
import CreationList from "./creationList";
import Header from "../../components/header";
import styled from "@emotion/styled";
import Loading from "../../components/loading";
import NotFound from "../notFound";
import { firestoreConnect, populate } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

const Profile = ({ profile, auth }) => {
  if (profile === null) {
    return <NotFound />;
  }
  const Result = () => {
    if (profile === undefined) {
      return <Loading />;
    }

    if ("heliblocks" in profile) {
      return <CreationList creations={Object.values(profile.heliblocks)} />;
    }

    return null;
  };

  return (
    <>
      <Header />
      <Content>
        <h1>Wellcome User</h1>
        <Result />
      </Content>
    </>
  );
};

const populates = [{ child: "heliblocks", root: "heliblocks" }];
const collection = "users";
export default compose(
  withRouter,
  firestoreConnect(props => {
    const doc = props.match.params.userId;
    return [
      {
        collection,
        doc,
        populates
      }
    ];
  }),
  connect((state, props) => {
    const result = populate(state.firestore, collection, populates);
    const { userId } = props.match.params;
    return {
      auth: state.firebase.auth,
      profile: result && result[userId]
    };
  })
)(Profile);

const Content = styled.div`
  max-width: 1340px;
  margin: auto;
  width: 92%;
  padding-top: 64px;
`;
