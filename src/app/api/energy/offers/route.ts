import { type NextRequest, NextResponse } from "next/server";
import { getOffers } from "~/lib/energy-data-json";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const country = searchParams.get("country") || undefined;
    const providers = searchParams.get("providers");
    const renewable = searchParams.get("renewable");
    const priceGuarantee = searchParams.get("priceGuarantee");
    const contractDuration = searchParams.get("contractDuration");

    const rawOffers = await getOffers(country);

    const offers = rawOffers.filter((offer) => {
      // Filter by providers if specified
      if (providers && !providers.includes(offer.provider_id)) {
        return false;
      }

      // Filter by renewable energy type if specified
      if (renewable === "true" && offer.metadata.energy_type !== "green") {
        return false;
      }

      if (renewable === "false" && offer.metadata.energy_type !== "mixed") {
        return false;
      }

      // Filter by fixed price if specified
      if (
        priceGuarantee &&
        !priceGuarantee.includes(offer.metadata.price_guarantee)
      ) {
        return false;
      }

      if (
        contractDuration &&
        !contractDuration.includes(offer.metadata.contract_duration)
      ) {
        return false;
      }

      return true;
    });

    return NextResponse.json(offers, { status: 200 });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json(
      { error: "Failed to fetch offers" },
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
};
