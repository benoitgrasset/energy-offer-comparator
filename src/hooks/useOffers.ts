import { useQuery } from "@tanstack/react-query";
import type { EnergyOffer, PriceGuarantee } from "~/types";

const getOffers = async (params: URLSearchParams) => {
  const offers = await fetch(`/api/energy/offers?${params}`);
  return offers.json() as Promise<EnergyOffer[]>;
};

export const useOffers = ({
  country,
  selectedProviders,
  renewable,
  priceGuarantee,
  contractDuration,
}: {
  country: string;
  selectedProviders: string[];
  renewable: boolean | null;
  priceGuarantee: PriceGuarantee[];
  contractDuration: string[];
}) => {
  const params = new URLSearchParams({
    country,
    ...(selectedProviders.length > 0 && {
      providers: selectedProviders.join(","),
    }),
    ...(renewable !== null && { renewable: renewable.toString() }),
    ...(priceGuarantee.length > 0 && {
      priceGuarantee: priceGuarantee.join(","),
    }),
    ...(contractDuration.length > 0 && {
      contractDuration: contractDuration.join(","),
    }),
  });

  return useQuery({
    queryKey: [
      "offers",
      country,
      selectedProviders,
      renewable,
      priceGuarantee,
      contractDuration,
    ],
    queryFn: () => getOffers(params),
  });
};
