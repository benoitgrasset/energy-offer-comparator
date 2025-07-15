"use client";

import { DollarSign, Filter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { useOffers } from "~/hooks/useOffers";
import type {
  EnergyOffer,
  EnergyProvider,
  PriceGuarantee,
  PriceView,
  SortOption,
} from "~/types";
import { calculateTotalAnnualCost } from "~/utils/pricing";
import { FilterSidebar } from "./FilterSidebar";
import { OfferCard } from "./OfferCard";

type Props = {
  providers: EnergyProvider[];
  country: string;
};

export const OffersList = ({ providers, country }: Props) => {
  const [priceView, setPriceView] = useState<PriceView>("monthly");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [renewable, setRenewable] = useState<boolean | null>(null);
  const [selectedPricingTypes, setSelectedPricingTypes] = useState<
    PriceGuarantee[]
  >([]);
  const [selectedContractDurations, setSelectedContractDurations] = useState<
    string[]
  >([]);
  const maxPrice = priceView === "monthly" ? 20 : 300;

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  const [sortOption, setSortOption] = useState<SortOption>({
    field: "price",
    direction: "asc",
  });

  const { data: offers, isLoading } = useOffers({
    selectedProviders,
    renewable,
    priceGuarantee: selectedPricingTypes,
    contractDuration: selectedContractDurations,
  });

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  const handleOfferSelect = (offer: EnergyOffer) => {
    const providerName = providers.find(
      (provider) => provider.id === offer.provider_id
    )?.display_name;
    toast.success(`You selected: ${offer.name} by ${providerName}`);
  };

  const handleClearFilters = () => {
    setSelectedProviders([]);
    setRenewable(null);
    setSelectedPricingTypes([]);
    setSelectedContractDurations([]);
    setPriceRange([0, maxPrice]);
  };

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split("-") as [
      SortOption["field"],
      SortOption["direction"]
    ];
    setSortOption({ field, direction });
  };

  const filteredOffers = useMemo(
    () =>
      offers
        ?.filter((offer) => {
          const totalAnnualCost = calculateTotalAnnualCost(offer);
          const price =
            priceView === "monthly" ? totalAnnualCost / 12 : totalAnnualCost;
          return price >= priceRange[0] && price <= priceRange[1];
        })
        .sort((a, b) => {
          if (sortOption.field === "price") {
            const aPrice = calculateTotalAnnualCost(a);
            const bPrice = calculateTotalAnnualCost(b);
            return sortOption.direction === "asc"
              ? aPrice - bPrice
              : bPrice - aPrice;
          }
          return 0;
        }),
    [offers, priceRange, priceView, sortOption]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-gray-600">
          Compare {filteredOffers?.length} energy offers from {providers.length}{" "}
          providers
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 rounded-lg border">
        <div className="flex items-center space-x-2">
          <Switch
            id="price-view"
            checked={priceView === "annual"}
            onCheckedChange={(checked) =>
              setPriceView(checked ? "annual" : "monthly")
            }
          />
          <Label htmlFor="price-view" className="text-sm font-medium">
            Show {priceView === "monthly" ? "Annual" : "Monthly"} Prices
          </Label>
          <Badge variant="outline" className="ml-2">
            {priceView === "monthly" ? "Monthly" : "Annual"}
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="sort" className="text-sm font-medium">
            Sort by:
          </Label>
          <Select
            value={`${sortOption.field}-${sortOption.direction}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price: Low to High
                </div>
              </SelectItem>
              <SelectItem value="price-desc">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price: High to Low
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar
            providers={providers}
            selectedProviders={selectedProviders}
            onProviderChange={setSelectedProviders}
            renewable={renewable}
            onRenewableChange={setRenewable}
            selectedPricingTypes={selectedPricingTypes}
            onPricingTypesChange={setSelectedPricingTypes}
            selectedContractDurations={selectedContractDurations}
            onContractDurationsChange={setSelectedContractDurations}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            maxPrice={maxPrice}
            onClearFilters={handleClearFilters}
            priceView={priceView}
          />
        </div>

        {/* Offers Grid */}
        <div className="lg:col-span-3">
          {filteredOffers?.length === 0 ? (
            <Card className="p-8 text-center">
              <Filter className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No offers found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters to see more options.
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Clear All Filters
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredOffers?.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  priceView={priceView}
                  onSelect={handleOfferSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
