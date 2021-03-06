import React, { useState, useEffect, useContext, useRef } from "react";
import Header from "components/header";
import Footer from "components/footer";
import Loading from "components/loading";
import { Container, Main } from "components/containers";
import { Redirect } from "react-router-dom";
import { AuthContext } from "services/auth";
import {
  Heading,
  Flex,
  Avatar,
  Input,
  Grid,
  Box,
  Button,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Title } from "react-head";
import { uploadUserAvatar } from "services/storage";
import ManageSubscription from "./manageSubscription";
import * as services from "services/users";
import UserToken from "./userToken";

const AccountSettings = () => {
  const { isLoaded, user, setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputFile = useRef(null);
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setName(user.displayName);
      setEmail(user.email);
      setAvatar(user.photoURL);
    }
  }, [user]);

  useEffect(() => {
    if (!image) return;
    const objectUrl = URL.createObjectURL(image);
    setAvatar(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  if (!isLoaded) {
    return <Loading />;
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  const handleChangeAvatar = () => {
    inputFile.current.click();
  };

  const handleChangeImage = (e) => {
    const newImage = e.target.files[0];

    if (!newImage) return;

    if (newImage.size >= 900000) {
      toast({
        title: "D'oh!",
        description: "Sorry, the image is too large",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      setImage(newImage);
    }
  };

  const getPhotoUrl = async () => {
    if (image) {
      return await uploadUserAvatar(user.uid, image);
    }
    return avatar;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    const profile = {
      displayName: name,
      email: email,
      photoURL: await getPhotoUrl(),
    };
    await services.setUser(user.uid, profile);
    setUser({ ...user, ...profile });
    setLoading(false);
    toast({
      title: "Account modifed",
      description: "Your profile has been updated successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  return (
    <>
      <Title>Account settings - Heliblocks</Title>
      <Header />
      <Container size="extra_small" as={Main}>
        <Heading as="h1" mb="2" pt="16">
          Account settings
        </Heading>
        <Box mb="8%">
          <Flex alignItems="center" py="8">
            <Avatar size="2xl" name={name} src={avatar} mr="8" />
            <Input
              d="none"
              type="file"
              accept=".jpg"
              onChange={handleChangeImage}
              ref={inputFile}
            />
            <Button onClick={handleChangeAvatar}>Change photo</Button>
          </Flex>

          <Grid autoFlow={["row", "column"]} columnGap="8">
            <FormControl mb="4">
              <FormLabel htmlFor="name"> Name </FormLabel>
              <Input
                id="name"
                type="text"
                value={name}
                name="name"
                onChange={handleName}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel htmlFor="email"> Email</FormLabel>
              <Input
                id="email"
                type="email"
                value={email}
                name="email"
                onChange={handleEmail}
              />
            </FormControl>
          </Grid>
          <Box mb="6" maxW="820px">
            <UserToken uid={user.uid} />
          </Box>
          <Box mb="16">
            <Button
              isLoading={loading}
              colorScheme="primary"
              onClick={handleSubmit}
            >
              Save profile
            </Button>
          </Box>
          <Box borderTopWidth="1px" pt="10">
            <ManageSubscription />
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default AccountSettings;
