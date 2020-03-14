import React from "react";
import PropTypes from "prop-types";
import useMediaQuery from "react-use-media-query-hook";
import LayoutDesktop from "./desktop";
import LayoutMobile from "./mobile";

function Layout(props) {
  const isDesktop = useMediaQuery("(min-width: 880px)");
  if (isDesktop) {
    return <LayoutDesktop {...props} />;
  }
  return <LayoutMobile {...props} />;
}

export default Layout;

Layout.propTypes = {
  navBar: PropTypes.node,
  preview: PropTypes.node,
  title: PropTypes.node,
  html: PropTypes.node,
  css: PropTypes.node,
  userMenu: PropTypes.node
};
