"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export default async function page(amount: number) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "HUF",
  });

  if (paymentIntent.client_secret === null) {
    throw Error("Stripe failed to create payment intent");
  }

  return paymentIntent.client_secret;
}
