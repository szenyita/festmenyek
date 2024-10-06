"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getClientSecret(
  amount: number,
  orderDataAsString: string
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "HUF",
    metadata: { orderDataAsString },
  });

  if (paymentIntent.client_secret === null) {
    throw Error("Stripe failed to create payment intent");
  }

  return paymentIntent.client_secret;
}
