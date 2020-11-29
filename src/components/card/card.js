import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Auhtor from "./author";
import HeaderCard from "./headerCard";

export const Card = ({ id, screenshot, title, author }) => {
  return (
    <Box>
      <Link to={"/view/" + id}>
        <HeaderCard image={screenshot} />
      </Link>
      <Box pb="3">
        <Box flexGrow="1">
          <Link to={"/view/" + id}>
            <Text mt={3} lineHeight="short" data-testid="card-title">
              {title}
            </Text>
          </Link>
          <Auhtor {...author} mt="1" />
        </Box>
      </Box>
    </Box>
  );
};

const AuthorShape = PropTypes.shape({
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
});

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.oneOfType([PropTypes.string, AuthorShape]).isRequired,
  screenshot: PropTypes.string.isRequired,
};
