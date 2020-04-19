import React, { useContext } from "react";
import CreationList from "./creationList";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Loading from "../../components/loading";
import NotFound from "../notFound";
import { Image, Heading, Box, Flex, Grid, SimpleGrid } from "@chakra-ui/core";
import Container from "./../../components/container";
import { AuthContext } from "./../../services/auth";

const Profile = () => {
  
  const { isLoaded, user } = useContext(AuthContext)

  if(!isLoaded) {
    return <Loading />
  }
  
  return <h1>profile </h1>

  // if (profile === null) {
  //   return <NotFound />;
  // }

  // const Result = () => {
  //   if (profile === undefined) {
  //     return <Loading />;
  //   }

  //   if ("heliblocks" in profile) {
  //     return (
  //       <CreationList
  //         owner={isOwner}
  //         creations={Object.values(profile.heliblocks)}
  //       />
  //     );
  //   }
  //   return null;
  // };

  // return (
  //   <>
  //     <Header />
  //     <Container py="68px">
  //       <Grid
  //         templateColumns={{ md: "220px 1fr" }}
  //         columnGap={[10, null, null, "120px"]}
  //       >
  //         {profile && (
  //           <Flex flexDirection="column" alignItems={["center", "start"]}>
  //             <Image
  //               size={["68px", "166px"]}
  //               objectFit="cover"
  //               rounded="1px"
  //               src={profile.photoURL}
  //               alt={profile.displayName}
  //               mb="4"
  //             />
  //             <Heading as="h1" mb="2" fontSize="lg">
  //               {profile.displayName}
  //             </Heading>
  //               <Text fontSize="md" color="gray.500">
  //                 <Link
  //                   href={url}
  //                   isExternal
  //                   fontWeight="semibold"
  //                   display="flex"
  //                   alignItems="center"
  //                 >
  //                   <Icon name="github" size="16px" mr="2" verticalAlign="middle" />
  //                   Github
  //                 </Link>
  //               </Text>
  //           </Flex>
  //         )}
  //         <Result />
  //       </Grid>
  //     </Container>
  //     <Footer />
  //   </>
  // );
};

export default Profile;
