import React from "react";
import { Button } from "@chakra-ui/core";
import { signInWithGithub } from "services/auth";
import { setUser } from "services/users";
import useMediaQuery from "react-use-media-query-hook";

const SignIn = () => {
  const isLarge = useMediaQuery("(min-width: 700px)");

  const signIn = async () => {
    try {
      const { uid, displayName, photoURL, profile } = await signInWithGithub();
      await setUser(uid, {
        displayName,
        photoURL,
        githubURL: profile.html_url
      });
    } catch (error) {}
  };
  if (isLarge) {
    return (
      <Button variant="outline" leftIcon="github" onClick={signIn}>
        Sign in
      </Button>
    );
  }
  return (
    <Button size="sm" variantColor="primary" leftIcon="github" onClick={signIn}>
      Sign in
    </Button>
  );
};

export default SignIn;
