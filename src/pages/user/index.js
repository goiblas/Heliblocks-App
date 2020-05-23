import React, { useContext, useState, useEffect } from "react";
import CreationList from "./creationList";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Loading from "../../components/loading";
import NotFound from "../notFound";
import { Image, Heading, Flex, Grid, Text, Icon, Link } from "@chakra-ui/core";
import Container from "./../../components/container";
import { AuthContext } from "./../../services/auth";
import { useParams } from "react-router-dom";
import { getUser } from "./../../services/users";


const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null)
  const [owner, setOwner] = useState(false)
  const { isLoaded, user } = useContext(AuthContext)

  useEffect(() => {
    getUser(id)
        .then(setProfile)
        .catch(() => setProfile({notFound: true}))
  }, [id])

  useEffect(() => {
    if(user && user.uid === id ) {
      setOwner(true)
    }
  }, [user])

  if(!profile || !isLoaded) {
    return <Loading />
  }

  if(profile.notFound) {
    return <NotFound />
  }

  
  return (
    <>
      <Header />
      <Container py="68px">
        <Grid
          templateColumns={{ md: "220px 1fr" }}
          columnGap={[10, null, null, "120px"]}
        >
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
              <Text fontSize="md" color="gray.500">
                <Link
                  href={profile.githubURL}
                  isExternal
                  fontWeight="semibold"
                  display="flex"
                  alignItems="center"
                >
                  <Icon name="github" size="16px" mr="2" verticalAlign="middle" />
                  Github
                </Link>
              </Text>
          </Flex>
          <CreationList owner={owner} creations={profile.heliblocks} />
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
