import Stripe from 'stripe';
import log from '../helpers/logger';
import { sendPushover } from '../helpers/pushover';

const stripe = new Stripe('', {
  apiVersion: '2020-08-27',
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "";

export async function stripeWebhook(request: any, response: any) {
  const sig = request.headers['stripe-signature'];

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
    case 'checkout.session.completed':
      await sendPushover("Received payment from " + event.data.customer_email || event.data.customer_details.email)
      console.log("received checkout complete event!")
      console.log(event.data)
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
}
