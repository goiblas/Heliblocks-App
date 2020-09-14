import React, { useState, useEffect, useContext } from "react";
import {
  Heading,
  Button,
  Text,
  Box,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  RadioGroup,
  Radio,
} from "@chakra-ui/core";
import { AuthContext } from "services/auth";
import { createSubscription } from "services/subscription";

const FeedbackUsage = () => (
  <StatGroup>
    <Stat>
      <StatLabel color="gray.700">Feedback</StatLabel>
      <StatNumber fontWeight="medium">∞</StatNumber>
      <StatHelpText>10,000 limit</StatHelpText>
    </Stat>

    <Stat>
      <StatLabel color="gray.700">Sites</StatLabel>
      <StatNumber fontWeight="medium">1/∞</StatNumber>
      <StatHelpText>Unlimited Sites</StatHelpText>
    </Stat>
  </StatGroup>
);

const subscriptionsTypes = { monthly: "monthly", annual: "annual" };

const ManageSubscription = () => {
  const { isLoaded, user } = useContext(AuthContext);
  const [isBillingLoading, setBillingLoading] = useState(false);
  const [subscriptionSeleted, setSubcription] = useState(
    subscriptionsTypes.monthly
  );

  if (!isLoaded) {
    return null;
  }

  const subcribe = async () => {
    setBillingLoading(true);
    try {
      createSubscription(user.uid, { type: subscriptionSeleted });
    } catch (error) {}
    setBillingLoading(false);
  };
  return (
    <>
      <FeedbackUsage />
      <Heading as="h2" mb="2">
        Upgrade to PRO
      </Heading>
      <Text>Unlimited private blocks</Text>
      <RadioGroup
        isInline
        spacing={4}
        defaultValue={subscriptionSeleted}
        onChange={(e) => {
          console.log(e);
          setSubcription(e);
        }}
      >
        <Radio value={subscriptionsTypes.monthly}>Monthly</Radio>
        <Radio value={subscriptionsTypes.annual}>Annual</Radio>
      </RadioGroup>

      <Button
        onClick={subcribe}
        variantColor="primary"
        isLoading={isBillingLoading}
      >
        Subscribe to PRO Plan
      </Button>
    </>
  );
};

export default ManageSubscription;
