import React from "react";
import CreationList from "./creationList";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Loading from "../../components/loading";
import NotFound from "../notFound";
import { firestoreConnect, populate } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import GithubLink from "./githubLink";
import { Image, Heading, Box, Flex, Grid, SimpleGrid } from "@chakra-ui/core";
import Container from "./../../components/container";

const Profile = ({ profile, auth, match }) => {
  const isOwner = auth.uid && auth.uid === match.params.userId;

  if (profile === null) {
    return <NotFound />;
  }

  const Result = () => {
    if (profile === undefined) {
      return <Loading />;
    }

    if ("heliblocks" in profile) {
      return (
        <CreationList
          owner={isOwner}
          creations={Object.values(profile.heliblocks)}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Header />
      <Container py="68px">
        <Grid
          templateColumns={{ md: "220px 1fr" }}
          columnGap={[10, null, null, "120px"]}
        >
          {profile && (
            <Flex flexDirection="column" alignItems={["center", "start"]}>
              <Image
                size={["68px", "166px"]}
                objectFit="cover"
                rounded="1px"
                src={profile.photoURL}
                alt={profile.displayName}
                mb="4"
              />
              <Heading as="h1" mb="2" fontSize="lg">
                {profile.displayName}
              </Heading>
              <GithubLink
                fontSize="md"
                color="gray.500"
                id={profile.githubID}
              />
            </Flex>
          )}
          <Result />
        </Grid>
      </Container>
      <Footer />
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
