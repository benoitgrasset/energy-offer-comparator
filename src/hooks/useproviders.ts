import { useQuery } from "@tanstack/react-query";
import type { EnergyProvider } from "~/types";

const getProviders = async () => {
  const providers = await fetch(`/api/energy/providers`);
  return providers.json() as Promise<EnergyProvider[]>;
};

export const useProviders = () => {
  return useQuery({
    queryKey: ["providers"],
    queryFn: () => getProviders(),
  });
};
