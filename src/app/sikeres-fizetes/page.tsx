import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function page({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (paymentIntent.status !== "succeeded") {
    return <div className="text-red-500">Sikertelen fizetés</div>;
  }

  return (
    <div className="text-green-500 min-h-[calc(100vh-304px)] flex justify-center pt-[20vh] font-semibold text-xl">
      Sikeres fizetés
    </div>
  );
}
