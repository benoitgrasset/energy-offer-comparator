import type { EnergyOffer, EnergyProvider } from "~/types";
import EneryOffersJSON from "../server/data/Energy_Offers.json";
import EnergyProvidersJSON from "../server/data/Energy_Providers.json";

export const getProviders = async (
  country?: string | null
): Promise<EnergyProvider[]> => {
  const providers = EnergyProvidersJSON.energy_providers as EnergyProvider[];
  if (country) {
    return providers.filter((provider) => provider.country === country);
  }
  return providers;
};

export const getProviderById = async (
  id: string
): Promise<EnergyProvider | null> => {
  const provider = EnergyProvidersJSON.energy_providers.find(
    (p) => p.id === id
  );
  return provider || null;
};

export const getOffers = async (country?: string): Promise<EnergyOffer[]> => {
  const offers = EneryOffersJSON.energy_offers as EnergyOffer[];
  if (country) {
    const providers = await getProviders(country);
    return offers.filter((offer) =>
      providers.some((provider) => provider.id === offer.provider_id)
    );
  }
  return offers;
};

export const getOffersByProviderId = async (
  providerId: string
): Promise<EnergyOffer[]> => {
  return EneryOffersJSON.energy_offers.filter(
    (offer) => offer.provider_id === providerId
  ) as EnergyOffer[];
};

export const getOfferById = async (id: string): Promise<EnergyOffer | null> => {
  const offer = (EneryOffersJSON.energy_offers as EnergyOffer[]).find(
    (o) => o.id === id
  );
  return offer || null;
};
