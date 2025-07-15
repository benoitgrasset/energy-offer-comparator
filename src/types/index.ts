export type EnergyType = "mixed" | "green";
export type PriceGuarantee = "fixed" | "dynamic" | "indexed" | "dual_rate";

export type EnergyOffer = {
  id: string;
  slug: string;
  name: string;
  description: string;
  provider_id: string;
  consumption_pricing: number;
  subscription_cost: number;
  metadata: {
    energy_type: EnergyType;
    contract_duration: string;
    price_guarantee: PriceGuarantee;
  };
};

export type EnergyProvider = {
  id: string;
  slug: string;
  display_name: string;
  country: string;
};

export type SortOption = {
  field: "price" | "provider";
  direction: "asc" | "desc";
};

export type PriceCalculation = {
  consumptionCost: number;
  subscriptionCost: number;
  totalAnnual: number;
  totalMonthly: number;
  savingsPercentage?: number;
};

export type PriceView = "monthly" | "annual";
