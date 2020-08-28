import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as FathomClient from "fathom-client";

export const Fathom = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      FathomClient.load(process.env.REACT_APP_FATHOM_SITE_ID, {
        includedDomains: ["heliblocks.com"],
      });
    }
  }, []);

  useEffect(() => {
    FathomClient.trackPageview();
  }, [pathname]);

  return null;
};
