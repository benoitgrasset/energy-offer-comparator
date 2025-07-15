import { OffersList } from "~/components/offers/OffersList";
import { getOffers, getProviders } from "~/lib/energy-data-json";

export default async function CountryPage({
  params,
}: {
  params: { country: string };
}) {
  const { country } = await params;

  // Call the functions directly instead of making HTTP requests
  const offers = await getOffers();
  const providers = await getProviders();

  return (
    <div>
      <OffersList providers={providers} country={country} />
    </div>
  );
}
