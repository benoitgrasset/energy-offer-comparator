import { type NextRequest, NextResponse } from "next/server";
import { getProviders } from "~/lib/energy-data-json";

export const GET = async (_request: NextRequest) => {
  try {
    const providers = await getProviders();
    const countries = providers.map((provider) => provider.country);
    // Remove duplicates
    const uniqueCountries = Array.from(new Set(countries));
    uniqueCountries.sort((a, b) => a.localeCompare(b));

    return NextResponse.json(uniqueCountries, { status: 200 });
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
};
