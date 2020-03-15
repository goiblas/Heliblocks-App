import React from "react";
import useMediaQuery from "react-use-media-query-hook";
import DesktopEditor from "./desktop";
import MobileEditor from "./mobile";

const Editor = () => {
  const isDesktop = useMediaQuery("(min-width: 880px)");
  return isDesktop ? ( <DesktopEditor /> ) : ( <MobileEditor /> )
}

export default Editor;