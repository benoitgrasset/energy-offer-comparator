import { type NextRequest, NextResponse } from "next/server";
import { getProviderById } from "~/lib/energy-data-json";

export const GET = async (
  _request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Provider ID is required" },
        { status: 400 }
      );
    }

    const provider = await getProviderById(id);

    if (!provider) {
      return NextResponse.json(
        { error: "Provider not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(provider, { status: 200 });
  } catch (error) {
    console.error("Error fetching provider:", error);
    return NextResponse.json(
      { error: "Failed to fetch provider" },
      { status: 500 }
    );
  }
};
