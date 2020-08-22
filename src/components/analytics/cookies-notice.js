import React, { useContext, useEffect, useState } from "react";
import { AnalyticsContext } from "services/analytics";
import {
  Button,
  Checkbox,
  Link,
  Box,
  Grid,
  CheckboxGroup,
} from "@chakra-ui/core";
import Cookies from "js-cookie";

const COOKIES = {
  essential: "essential",
  analytic: "analytic",
  consent: "CookieConsent",
};

export const CookiesNotices = () => {
  const [activedCookies, setActivedCookies] = useState([
    COOKIES.essential,
    COOKIES.analytic,
  ]);
  const [visible, setVisible] = useState(false);
  const { acceptAnalytics } = useContext(AnalyticsContext);

  const onAccept = () => {
    Cookies.set(COOKIES.consent, JSON.stringify(activedCookies));
    setVisible(false);
    if (activedCookies.includes(COOKIES.analytic)) {
      acceptAnalytics();
    }
  };

  useEffect(() => {
    const consent = Cookies.get(COOKIES.consent);
    if (!consent) setVisible(true);
  }, []);

  useEffect(() => {
    const consent = Cookies.get(COOKIES.consent);
    if (consent) {
      const cookiesConsent = JSON.parse(consent);
      if (
        Array.isArray(cookiesConsent) &&
        cookiesConsent.includes(COOKIES.analytic)
      ) {
        acceptAnalytics();
      }
    }
  }, [acceptAnalytics]);

  return (
    visible && (
      <Box
        position="fixed"
        zIndex="sticky"
        bottom={["0","4"]}
        left={["0","4"]}
        right={["0","4"]}
        boxShadow="xl"
        padding={["4","8"]}
        backgroundColor="gray.900"
        color="white"
        borderRadius="lg"
        maxW="740px"
      >
        <Grid gridTemplateColumns={[null, null, "1fr auto"]} gap="8">
          <Box>
            <Box mb="4">
              We use cookies to collect data analytics and ensure you get the
              best online experience. By using our website you agree to our use
              of cookies in accordance with our
              <Link
                href={"/cookie"}
                rel="noopener noreferrer"
                target="_blank"
                ml="1"
                textDecoration="underline"
              >
                cookie policy
              </Link>
            </Box>
            <CheckboxGroup
              isInline
              onChange={setActivedCookies}
              defaultValue={activedCookies}
            >
              <Checkbox key="essential" value="essential" isDisabled mr="4">
                Essential cookies
              </Checkbox>
              <Checkbox key="analytic" value="analytic">
                Analytic cookies
              </Checkbox>
            </CheckboxGroup>
          </Box>
          <Button variantColor="green" px="8" onClick={onAccept}>
            Accept
          </Button>
        </Grid>
      </Box>
    )
  );
};
