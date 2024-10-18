import Termekekhez from "@/components/Termekekhez";
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
    return (
      <div className="flex-col items-center min-h-[calc(100vh-304px)] flex justify-center pt-[20vh]">
        <p className="text-red-500 font-semibold text-3xl md:text-4xl mb-[8vh]">
          Sikeres fizetés
        </p>
        <Termekekhez text="Vissza a Festményekhez" />
      </div>
    );
  }

  return (
    <div className="flex-col items-center min-h-[calc(100vh-304px)] flex justify-center pt-[20vh]">
      <p className="text-green-500 font-semibold text-3xl md:text-4xl mb-[8vh]">
        Sikeres fizetés
      </p>
      <Termekekhez text="További Festmények" />
    </div>
  );
}
