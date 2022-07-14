import Stripe from "stripe";
import log from "../../helpers/logger";
import { sendPushover } from "../../helpers/pushover";
import { Item } from "../../mongoose";

const stripe = new Stripe("", {
  apiVersion: "2020-08-27",
});

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET || "";

export async function stripeWebhook(request: any, response: any) {
  const sig = request.headers["stripe-signature"];

  if (!sig) {
    await log("error", "Bad sig");
    response.status(400).send(`Bad sig`);
    return;
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err: any) {
    await log("error", `Webhook Error: ${err.message}`);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const sessionData = event.data as any;
      const userEmail =
        sessionData.customer_email || sessionData.customer_details;
      await sendPushover("Received payment from " + userEmail);

      await Item.updateOne(
        { type: "USER", "data.email": userEmail },
        { $set: { "data.premiumSubscriptions.reddit": Date.now() + 31557600000 } }
      );
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
}
