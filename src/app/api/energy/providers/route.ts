import { type NextRequest, NextResponse } from "next/server";
import { getProviders } from "~/lib/energy-data-json";

export const GET = async (request: NextRequest) => {
  const country = request.nextUrl.searchParams.get("country");

  try {
    const providers = await getProviders(country);
    return NextResponse.json(providers, { status: 200 });
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json(
      { error: "Failed to fetch providers" },
      { status: 500 }
    );
  }
};
