import { useQuery } from "@tanstack/react-query";

const getCountries = async () => {
  const countries = await fetch(`/api/countries`);
  return countries.json() as Promise<string[]>;
};

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
  });
};
