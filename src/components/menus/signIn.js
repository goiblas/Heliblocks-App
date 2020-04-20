import React from "react";
import { Button } from "@chakra-ui/core";
import { signInWithGithub } from "./../../services/auth"
import { setUser } from "./../../services/users"

const SignIn = ( ...props) => {
  const signIn = async() => {
    try {
      const { uid, displayName, photoURL, profile } = await signInWithGithub()
      await setUser({
       uid,
        displayName,
        photoURL,
        githubURL: profile.html_url
      })
    } catch (error) {}
  }
  return (
    <Button
      variant="outline"
      variantColor="dark"
      leftIcon="github"
      onClick={ signIn }
      {...props}
    >
      Sign in
    </Button>
  );
};

export default SignIn;
