import React, { useState, useEffect, useContext } from "react";
import Header from "components/header";
import Footer from "components/footer";
import Loading from "components/loading";
import NotFound from "pages/notFound";
import { Container, CardsGrid, Main } from "components/containers";
import { useParams } from "react-router-dom";
import { getUser } from "services/users";
import Profile from "./profile";
import { AuthContext } from "services/auth";
import { Box } from "@chakra-ui/core";
import PublicHeliblocks from "./publicHeliblocks";
import OwnHeliblocks from "./ownHeliblocks";
import { Title } from "react-head";

const UserPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const { isLoaded, user } = useContext(AuthContext);

  useEffect(() => {
    getUser(id)
      .then(setProfile)
      .catch(() => setProfile({ notFound: true }));
  }, [id]);

  if (!profile || !isLoaded) {
    return <Loading />;
  }

  if (profile.notFound) {
    return <NotFound />;
  }

  const isOwner = user && user.uid === id;

  return (
    <>
      <Title>{profile.displayName} - Heliblocks</Title>
      <Header />
      <Container as={Main}>
        <Profile
          photoURL={profile.photoURL}
          displayName={profile.displayName}
          githubURL={profile.githubURL}
        />
        <Box mb="8%">
          <CardsGrid>
            {isOwner ? (
              <OwnHeliblocks ids={profile.heliblocks} />
            ) : (
              <PublicHeliblocks ids={profile.heliblocks} />
            )}
          </CardsGrid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default UserPage;
