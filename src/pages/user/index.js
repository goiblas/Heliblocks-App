import React, { useState, useEffect, useContext } from "react";
import Header from "components/header";
import Footer from "components/footer";
import Loading from "components/loading";
import NotFound from "pages/notFound";
import { Container, CardsGrid, Main } from "components/containers";
import { useParams } from "react-router-dom";
import { getUser } from "services/users";
import Profile from "./profile";
import CardProfile from "./cardProfile";
import { AuthContext } from "services/auth";
import { Box } from "@chakra-ui/core";

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
  return (
    <>
      <Header />
      <Container as={Main}>
        <Profile
          photoURL={profile.photoURL}
          displayName={profile.displayName}
          githubURL={profile.githubURL}
        />
        <Box mb="8%">
          <CardsGrid>
            {profile.heliblocks &&
              profile.heliblocks.map(heliblockID => (
                <CardProfile
                  id={heliblockID}
                  key={heliblockID}
                  author={profile}
                  isOwner={user && user.uid === id}
                />
              ))}
          </CardsGrid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default UserPage;
