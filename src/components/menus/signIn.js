import React from "react";
import { Button } from "@chakra-ui/react";
import { signInWithGithub } from "services/auth";
import { useMediaQuery } from "@react-hook/media-query";
import { GithubIcon } from "theme/icons";

const SignIn = () => {
  const isLarge = useMediaQuery("(min-width: 700px)");

  if (isLarge) {
    return (
      <Button
        variant="outline"
        leftIcon={<GithubIcon />}
        onClick={signInWithGithub}
      >
        Sign in
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      colorScheme="primary"
      leftIcon={<GithubIcon />}
      onClick={signInWithGithub}
    >
      Sign in
    </Button>
  );
};

export default SignIn;
