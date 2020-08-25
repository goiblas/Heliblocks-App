import { useContext, useEffect } from "react";
import { AnalyticsContext } from "services/analytics";
import { AuthContext } from "services/auth";
import { useLocation } from "react-router-dom";
import * as Fathom from "fathom-client";

export const Tracker = () => {
  const { pathname } = useLocation();
  const { setCurrentScreen, setUserId } = useContext(AnalyticsContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      Fathom.load(process.env.REACT_APP_FATHOM_SITE_ID, {
        includedDomains: ["heliblocks.com"],
      });
    }
  }, []);

  useEffect(() => {
    Fathom.trackPageview();
  }, [pathname]);

  useEffect(() => {
    setCurrentScreen(pathname);
  }, [pathname, setCurrentScreen]);

  useEffect(() => {
    if (user && user.uid) {
      setUserId(user.uid);
    }
  }, [user, setUserId]);

  return null;
};
