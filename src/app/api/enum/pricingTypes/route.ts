import { NextRequest, NextResponse } from "next/server";
import { getOffers } from "~/lib/energy-data-json";

export const GET = async (_request: NextRequest) => {
  const offers = await getOffers();
  const pricingTypes = new Set(
    offers.map((offer) => offer.metadata.price_guarantee)
  );
  return NextResponse.json(Array.from(pricingTypes).sort(), { status: 200 });
};
