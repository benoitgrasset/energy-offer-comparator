import { useQuery } from "@tanstack/react-query";
import type { EnergyOffer, PriceGuarantee } from "~/types";

const getOffers = async (params: URLSearchParams) => {
  const offers = await fetch(`/api/energy/offers?${params}`);
  return offers.json() as Promise<EnergyOffer[]>;
};

export const useOffers = ({
  selectedProviders,
  renewable,
  priceGuarantee,
  contractDuration,
}: {
  selectedProviders: string[];
  renewable: boolean | null;
  priceGuarantee: PriceGuarantee[];
  contractDuration: string[];
}) => {
  const params = new URLSearchParams({
    ...(selectedProviders.length > 0 && {
      providers: selectedProviders.join(","),
    }),
    ...(renewable !== null && { renewable: renewable.toString() }),
    ...(priceGuarantee !== null && {
      priceGuarantee: priceGuarantee.join(","),
    }),
    ...(contractDuration.length > 0 && {
      contractDuration: contractDuration.join(","),
    }),
  });

  return useQuery({
    queryKey: [
      "offers",
      selectedProviders,
      renewable,
      priceGuarantee,
      contractDuration,
    ],
    queryFn: () => getOffers(params),
  });
};
