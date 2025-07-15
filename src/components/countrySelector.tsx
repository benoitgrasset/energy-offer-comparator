"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useCountries } from "~/hooks/useCountries";
import { countryList, isoToEmoji } from "~/utils/countries";
import { capitalize } from "~/utils/string";
import { Skeleton } from "./ui/skeleton";

const CountrySelector = () => {
  const router = useRouter();
  const pathName = usePathname();
  const country = pathName.split("/")[2] || "france";
  const { data: countries, isLoading } = useCountries();
  const [isPending, startTransition] = useTransition();
  const [optimisticCountry, setOptimisticCountry] = useOptimistic(
    country,
    (_state, action: string) => action
  );

  const handleValueChange = (value: string) => {
    startTransition(() => {
      setOptimisticCountry(value);
      router.push(`/energy-comparator/${value}`);
    });
  };

  const countriesObject = countryList.filter((countryObj) =>
    countries?.includes(countryObj.name)
  );

  return (
    <div className="min-w-30">
      <Select
        onValueChange={handleValueChange}
        value={isLoading || isPending ? undefined : optimisticCountry}
        disabled={isLoading || isPending}
      >
        <SelectTrigger disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <SelectValue placeholder="Select a country" />
          )}
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <div className="flex items-center gap-2 p-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="w-24 h-4 rounded-full" />
            </div>
          ) : (
            countriesObject.map((country) => (
              <SelectItem
                key={country.name}
                value={country.name}
                className="flex items-center gap-2"
              >
                <span>{country.flagCode && isoToEmoji(country.flagCode)}</span>
                <span>{capitalize(country.name)}</span>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelector;
