import React from "react";
import { connect } from "react-redux";
import { signIn } from "./../../store/auth/actions";
import { Button } from "@chakra-ui/core";

const SignIn = ({ signIn, ...props }) => {
  return (
    <Button
      variant="outline"
      variantColor="dark"
      leftIcon="github"
      onClick={signIn}
      {...props}
    >
      Sign in
    </Button>
  );
};

export default connect(null, { signIn })(SignIn);
