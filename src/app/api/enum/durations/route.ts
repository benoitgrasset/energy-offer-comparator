import { NextRequest, NextResponse } from "next/server";
import { getOffers } from "~/lib/energy-data-json";

export const GET = async (_request: NextRequest) => {
  const offers = await getOffers();
  const durations = new Set(
    offers.map((offer) => offer.metadata.contract_duration)
  );
  return NextResponse.json(Array.from(durations).sort(), { status: 200 });
};
