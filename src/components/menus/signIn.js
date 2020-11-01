import React from "react";
import { Button } from "@chakra-ui/core";
import { signInWithGithub } from "services/auth";
import { useMediaQuery } from "@react-hook/media-query";

const SignIn = () => {
  const isLarge = useMediaQuery("(min-width: 700px)");

  if (isLarge) {
    return (
      <Button variant="outline" leftIcon="github" onClick={signInWithGithub}>
        Sign in
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      variantColor="primary"
      leftIcon="github"
      onClick={signInWithGithub}
    >
      Sign in
    </Button>
  );
};

export default SignIn;
