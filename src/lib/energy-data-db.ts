import type { EnergyOffer, EnergyProvider } from "@prisma/client";
import { db } from "~/server/db";
import EneryOffersJSON from "../server/data/Energy_Offers.json";
import EnergyProvidersJSON from "../server/data/Energy_Providers.json";

export const seedDatabase = async () => {
  const providers = EnergyProvidersJSON.energy_providers;
  const offers = EneryOffersJSON.energy_offers;

  await db.energyProvider.createMany({ data: providers });
  await db.energyOffer.createMany({ data: offers });
};

export const getProviders = async (): Promise<EnergyProvider[]> => {
  try {
    const providers = await db.energyProvider.findMany({
      orderBy: { id: "asc" },
    });
    return providers;
  } catch (error) {
    console.error("Error loading providers:", error);
    return [];
  }
};

export const getProviderById = async (
  id: string
): Promise<EnergyProvider | null> => {
  try {
    const provider = await db.energyProvider.findUnique({
      where: { id },
    });
    return provider;
  } catch (error) {
    console.error("Error loading provider:", error);
    return null;
  }
};

export const getOffers = async (): Promise<EnergyOffer[]> => {
  try {
    const offers = await db.energyOffer.findMany({
      orderBy: { id: "asc" },
    });
    return offers;
  } catch (error) {
    console.error("Error loading offers:", error);
    return [];
  }
};

export const getOffersByProviderId = async (
  providerId: string
): Promise<EnergyOffer[]> => {
  try {
    const offers = await db.energyOffer.findMany({
      where: { provider_id: providerId },
      orderBy: { id: "asc" },
    });
    return offers;
  } catch (error) {
    console.error("Error loading offers for provider:", error);
    return [];
  }
};

export const getOfferById = async (id: string): Promise<EnergyOffer | null> => {
  try {
    const offer = await db.energyOffer.findUnique({
      where: { id },
    });
    return offer;
  } catch (error) {
    console.error("Error loading offer:", error);
    return null;
  }
};
