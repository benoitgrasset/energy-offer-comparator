import {
  AVERAGE_ANNUAL_CONSUMPTION_KWH,
  calculateConsumptionCost,
  calculateSavings,
  calculateTotalAnnualCost,
  formatPrice,
} from "src/utils/pricing";
import { expect, test } from "vitest";
import type { EnergyOffer } from "~/types";

const sampleOffer: EnergyOffer = {
  id: "offer_fr_001_01",
  slug: "voltaire-energie-classique",
  name: "Voltaire Classique",
  description: "Offre d'électricité standard avec prix fixe pendant 2 ans",
  provider_id: "fr_001",
  consumption_pricing: 0.1845, // €/kWh
  subscription_cost: 120.0, // €/year
  metadata: {
    energy_type: "mixed",
    contract_duration: "24 months",
    price_guarantee: "fixed",
  },
};

test("calculateTotalAnnualCost", () => {
  const annualConsumption = AVERAGE_ANNUAL_CONSUMPTION_KWH;
  const expectedCost =
    sampleOffer.consumption_pricing * annualConsumption +
    sampleOffer.subscription_cost;
  const totalCost = calculateTotalAnnualCost(sampleOffer, annualConsumption);
  expect(totalCost).toBe(expectedCost);
});

test("formatPrice", () => {
  const price = 123.456;
  const formatted = formatPrice(price);
  expect(formatted).toBe("123,46 €");
});

// Test with a few more offers
const offers: EnergyOffer[] = [
  {
    name: "Lumière Éco",
    consumption_pricing: 0.165,
    subscription_cost: 108.0,
  },
  {
    name: "Power Basic",
    consumption_pricing: 0.169,
    subscription_cost: 100.0,
  },
  {
    name: "Voltaire Flexible",
    consumption_pricing: 0.172,
    subscription_cost: 95.0,
  },
].map((offer, index) => ({
  ...offer,
  id: `offer_fr_001_0${index + 2}`,
  slug: `offer_fr_001_0${index + 2}`,
  provider_id: "fr_001",
  description: `Description for ${offer.name}`,
  metadata: {
    energy_type: "mixed",
    contract_duration: "12 months",
    price_guarantee: "fixed",
  },
}));

const expectedCosts: Record<string, number> = {
  "Lumière Éco": 174,
  "Power Basic": 167.6,
  "Voltaire Flexible": 163.8,
};

test("calculateTotalAnnualCost for multiple offers", () => {
  for (const offer of offers) {
    const totalCost = calculateTotalAnnualCost(
      offer,
      AVERAGE_ANNUAL_CONSUMPTION_KWH
    );
    const expectedCost = expectedCosts[offer.name];
    console.log(offer.name);
    expect(totalCost).toBe(expectedCost);
  }
});

test("calculateConsumptionCost", () => {
  const annualConsumption = AVERAGE_ANNUAL_CONSUMPTION_KWH;
  const expectedCost = sampleOffer.consumption_pricing * annualConsumption;
  const consumptionCost = calculateConsumptionCost(
    sampleOffer,
    annualConsumption
  );
  expect(consumptionCost).toBe(expectedCost);
});

test("calculateSavings", () => {
  const offer1: EnergyOffer = {
    id: "offer1",
    slug: "offer1",
    name: "Offer 1",
    description: "Description for Offer 1",
    provider_id: "provider1",
    consumption_pricing: 0.15,
    subscription_cost: 100,
    metadata: {
      energy_type: "mixed",
      contract_duration: "12 months",
      price_guarantee: "fixed",
    },
  };

  const offer2: EnergyOffer = {
    id: "offer2",
    slug: "offer2",
    name: "Offer 2",
    description: "Description for Offer 2",
    provider_id: "provider2",
    consumption_pricing: 0.18,
    subscription_cost: 120,
    metadata: {
      energy_type: "mixed",
      contract_duration: "12 months",
      price_guarantee: "fixed",
    },
  };

  const savings = calculateSavings(offer1, offer2);
  expect(savings).toBe(32);
});
