"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getClientSecret(
  amount: number,
  orderData: {
    vezeteknev: string | null;
    keresztnev: string | null;
    telefonszam: string | null;
    varos: string | null;
    iranyitoszam: string | null;
    utca: string | null;
    hazszam: string | null;
    emelet: string | null;
    ajto: string | null;
    csengo: string | null;
    festmenyIds: string[];
  }
) {
  const orderDataAsString = JSON.stringify(orderData);

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
