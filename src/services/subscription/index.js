import firebase, { database } from "../firebase";
import getStripe from "./stripe";

export async function createCheckoutSession(uid) {
  const docRef = await database
    .collection("customers")
    .doc(uid)
    .collection("checkout_sessions")
    .add({
      price: "price_1HOPcsB0UO1rlgTelWYoyIO1",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
  // Wait for the CheckoutSession to get attached by the extension
  docRef.onSnapshot(async (snap) => {
    const { error, sessionId } = snap.data();
    if (error) {
      // Show an error to your customer and
      // inspect your Cloud Function logs in the Firebase console.
      alert(`An error occured: ${error.message}`);
    }
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}

const SUBSCRIPTIONS_TYPES = {
  monthly: "price_1HOPcsB0UO1rlgTelWYoyIO1",
  annual: "price_1HOPctB0UO1rlgTek6wvazKx",
};
export async function createSubscription(uid, { type }) {
  const docRef = await database
    .collection("customers")
    .doc(uid)
    .collection("checkout_sessions")
    .add({
      price: SUBSCRIPTIONS_TYPES[type],
      allow_promotion_codes: true,
      success_url: window.location.origin + "/account-settings",
      cancel_url: window.location.origin + "/account-settings",
    });
  // Wait for the CheckoutSession to get attached by the extension
  docRef.onSnapshot(async (snap) => {
    const { error, sessionId } = snap.data();
    if (error) {
      throw new Error(`An error occured: ${error.message}`);
    }
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}

export async function goToBillingPortal() {
  const functionRef = firebase
    .app()
    .functions("europe-west2")
    .httpsCallable("ext-firestore-stripe-subscriptions-createPortalLink");

  const { data } = await functionRef({
    returnUrl: `${window.location.origin}/account-settings`,
  });

  window.location.assign(data.url);
}
