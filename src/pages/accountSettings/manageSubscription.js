import React, { useState, useContext } from "react";
import {
  Heading,
  Button,
  Text,
  Box,
  RadioGroup,
  Radio,
  Tag,
} from "@chakra-ui/react";
import { AuthContext } from "services/auth";
import { createSubscription, goToBillingPortal } from "services/subscription";

const isPRO = (user) => user.stripeRole === "pro";
const subscriptionsTypes = { monthly: "monthly", annual: "annual" };

const ManageSubscription = () => {
  const { user } = useContext(AuthContext);
  const [isBillingLoading, setBillingLoading] = useState(false);
  const [subscriptionSeleted, setSubcription] = useState(
    subscriptionsTypes.monthly
  );

  if (!user) {
    return null;
  }

  const subcribe = async () => {
    setBillingLoading(true);
    try {
      await createSubscription(user.uid, { type: subscriptionSeleted });
    } catch (error) {
      setBillingLoading(false);
    }
  };

  if (isPRO(user)) {
    return (
      <>
        <Heading as="h2" pt="4" mb="4" fontSize="2xl">
          Congratulations! You are PRO
        </Heading>
        <Text color="gray.500" mb="6" maxW="640px">
          Heliblocks uses Stripe to update, change, or cancel your subscription.
          You can also update card information and billing addresses through the
          secure portal.
        </Text>
        <Button
          colorScheme="primary"
          onClick={() => {
            setBillingLoading(true);
            goToBillingPortal();
          }}
          isLoading={isBillingLoading}
        >
          Manage Billing
        </Button>
      </>
    );
  }

  return (
    <>
      <Box py="8">
        <Heading as="h2" mb="2">
          Upgrade to PRO{" "}
          <Tag
            fontSize="md"
            verticalAlign="top"
            fontWeight="semibold"
            backgroundColor="yellow.200"
          >
            PRO
          </Tag>
        </Heading>
        <Text>Unlimited private blocks</Text>
      </Box>

      <RadioGroup
        isInline
        mb="8"
        w="100%"
        spacing={10}
        defaultValue={subscriptionSeleted}
        onChange={(e) => {
          setSubcription(e.target.value);
        }}
      >
        <Radio value={subscriptionsTypes.monthly} mb="6">
          <Box pl="1">
            <Text fontSize="lg" fontWeight="bold">
              6€ per month
            </Text>
            <Text color="gray.600">Cancel and get a refund any time</Text>
          </Box>
        </Radio>
        <Radio value={subscriptionsTypes.annual} mb="6">
          <Box pl="1">
            <Text fontSize="lg" fontWeight="bold">
              56€ per year
            </Text>
            <Text color="gray.600">Save 23% vs paying monthly</Text>
          </Box>
        </Radio>
      </RadioGroup>

      <Button
        onClick={subcribe}
        colorScheme="primary"
        isLoading={isBillingLoading}
      >
        Subscribe to PRO Plan
      </Button>
    </>
  );
};

export default ManageSubscription;
