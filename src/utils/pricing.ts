import type { EnergyOffer } from "~/types";

// Average annual consumption in kWh per year
export const AVERAGE_ANNUAL_CONSUMPTION_KWH = 400;

/**
 * Calculate the total annual cost for an energy offer
 * Formula: (consumption_pricing × annual_consumption) + subscription_cost
 *
 * @param offer - The energy offer with consumption_pricing (€/kWh) and subscription_cost (€/year)
 * @param annualConsumption - Annual consumption in kWh (defaults to 400 kWh)
 * @returns Total annual cost in euros
 */
export function calculateTotalAnnualCost(
  offer: EnergyOffer,
  annualConsumption: number = AVERAGE_ANNUAL_CONSUMPTION_KWH
): number {
  const consumptionCost = offer.consumption_pricing * annualConsumption;
  const totalCost = consumptionCost + offer.subscription_cost;

  // Round to 2 decimal places for currency precision
  return Math.round(totalCost * 100) / 100;
}

/**
 * Calculate the consumption cost component only
 *
 * @param offer - The energy offer with consumption_pricing (€/kWh)
 * @param annualConsumption - Annual consumption in kWh (defaults to 400 kWh)
 * @returns Consumption cost in euros
 */
export function calculateConsumptionCost(
  offer: EnergyOffer,
  annualConsumption: number = AVERAGE_ANNUAL_CONSUMPTION_KWH
): number {
  const consumptionCost = offer.consumption_pricing * annualConsumption;
  return Math.round(consumptionCost * 100) / 100;
}

/**
 * Format a price in euros with proper currency formatting
 *
 * @param price - Price in euros
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Format a price per kWh in euros with proper currency formatting
 *
 * @param pricePerKwh - Price per kWh in euros
 * @returns Formatted price string
 */
export function formatPricePerKwh(pricePerKwh: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(pricePerKwh);
}

/**
 * Compare two offers and return the savings
 *
 * @param offer1 - First energy offer
 * @param offer2 - Second energy offer
 * @param annualConsumption - Annual consumption in kWh
 * @returns Savings in euros (positive if offer1 is cheaper)
 */
export function calculateSavings(
  offer1: EnergyOffer,
  offer2: EnergyOffer,
  annualConsumption: number = AVERAGE_ANNUAL_CONSUMPTION_KWH
): number {
  const cost1 = calculateTotalAnnualCost(offer1, annualConsumption);
  const cost2 = calculateTotalAnnualCost(offer2, annualConsumption);

  return Math.round((cost2 - cost1) * 100) / 100;
}
