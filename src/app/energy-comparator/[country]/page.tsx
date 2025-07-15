import { OffersList } from "~/components/offers/offersList";
import { getProviders } from "~/lib/energy-data-json";

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;

  // Call the functions directly instead of making HTTP requests
  const providers = await getProviders();

  return (
    <div>
      <OffersList providers={providers} country={country} />
    </div>
  );
}
