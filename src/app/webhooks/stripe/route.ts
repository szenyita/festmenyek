import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature")!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const orderDataAsString = charge.metadata.orderDataAsString;
    const orderData = JSON.parse(orderDataAsString);
    const pricePaid = charge.amount;

    const {
      felhasznaloId,
      vezeteknev,
      keresztnev,
      telefonszam,
      varos,
      iranyitoszam,
      utca,
      hazszam,
      emelet,
      ajto,
      csengo,
      festmenyIds,
    } = orderData;

    await prisma.rendeles.create({
      data: {
        vezeteknev,
        keresztnev,
        telefonszam,
        varos,
        iranyitoszam,
        utca,
        hazszam,
        emelet: emelet || null,
        ajto: ajto || null,
        csengo: csengo || null,
        felhasznalo: { connect: { felhasznaloId } },
        festmenyek: {
          connect: festmenyIds.map((id: number) => ({ festmenyId: id })),
        },
      },
    });
    await prisma.festmeny.updateMany({
      where: { festmenyId: { in: festmenyIds } },
      data: { elerheto: false },
    });
  }
}
