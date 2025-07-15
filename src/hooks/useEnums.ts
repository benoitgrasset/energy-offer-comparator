import { useQuery } from "@tanstack/react-query";
import type { PriceGuarantee } from "~/types";

const getDurations = async () => {
  const durations = await fetch("/api/enum/durations");
  return durations.json() as Promise<string[]>;
};

const getPricingTypes = async () => {
  const pricingTypes = await fetch("/api/enum/pricingTypes");
  return pricingTypes.json() as Promise<PriceGuarantee[]>;
};

export const useDurations = () => {
  return useQuery({
    queryKey: ["durations"],
    queryFn: () => getDurations(),
  });
};

export const usePricingTypes = () => {
  return useQuery({
    queryKey: ["pricingTypes"],
    queryFn: () => getPricingTypes(),
  });
};
