import { type NextRequest, NextResponse } from "next/server";
import { getOffers } from "~/lib/energy-data-json";

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Offer ID is required" },
        { status: 400 }
      );
    }

    const offers = await getOffers();
    const offer = offers.find((o) => o.id === id);

    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json(offer, { status: 200 });
  } catch (error) {
    console.error("Error fetching offer:", error);
    return NextResponse.json(
      { error: "Failed to fetch offer" },
      { status: 500 }
    );
  }
};
