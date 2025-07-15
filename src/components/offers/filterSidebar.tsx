"use client";

import { ChevronDown, ChevronUp, Filter, LeafIcon, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CheckboxFilter } from "~/components/ui/checkbox-filter";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Slider } from "~/components/ui/slider";
import type { EnergyProvider, PriceGuarantee, PriceView } from "~/types";
import { formatPrice } from "~/utils/pricing";

type Props = {
  durations?: string[];
  maxPrice: number;
  onClearFilters: () => void;
  onContractDurationsChange: (contractDurations: string[]) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onPricingTypesChange: (pricingTypes: PriceGuarantee[]) => void;
  onProviderChange: (providers: string[]) => void;
  onRenewableChange: (renewable: boolean | null) => void;
  priceRange: [number, number];
  priceView: PriceView;
  pricingTypes?: PriceGuarantee[];
  providers: EnergyProvider[];
  renewable: boolean | null;
  selectedContractDurations: string[];
  selectedPricingTypes: PriceGuarantee[];
  selectedProviders: string[];
};

export function FilterSidebar({
  durations,
  maxPrice,
  onClearFilters,
  onContractDurationsChange,
  onPriceRangeChange,
  onPricingTypesChange,
  onProviderChange,
  onRenewableChange,
  priceRange,
  priceView,
  pricingTypes,
  providers,
  renewable,
  selectedContractDurations,
  selectedPricingTypes,
  selectedProviders,
}: Props) {
  const [openSections, setOpenSections] = useState({
    providers: false,
    energy: true,
    pricing: true,
    contract: true,
    price: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleProviderToggle = (provider: string) => {
    const newSelected = selectedProviders.includes(provider)
      ? selectedProviders.filter((p) => p !== provider)
      : [...selectedProviders, provider];
    onProviderChange(newSelected);
  };

  const handlePricingTypeToggle = (pricingType: PriceGuarantee) => {
    const newSelected = selectedPricingTypes.includes(pricingType)
      ? selectedPricingTypes.filter((p) => p !== pricingType)
      : [...selectedPricingTypes, pricingType];
    onPricingTypesChange(newSelected);
  };

  const handleContractDurationToggle = (contractDuration: string) => {
    const newSelected = selectedContractDurations.includes(contractDuration)
      ? selectedContractDurations.filter((d) => d !== contractDuration)
      : [...selectedContractDurations, contractDuration];
    onContractDurationsChange(newSelected);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedProviders.length > 0) count++;
    if (renewable !== null) count++;
    if (selectedPricingTypes.length > 0) count++;
    if (selectedContractDurations.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++;
    return count;
  };

  return (
    <Card className="h-fit sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
          {getActiveFiltersCount() > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {getActiveFiltersCount()}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="p-1 h-6 w-6 hover:bg-gray-100"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Providers Filter */}
        <Collapsible
          open={openSections.providers}
          onOpenChange={() => toggleSection("providers")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50">
            <span className="font-medium">Providers ({providers.length})</span>
            {openSections.providers ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            {providers.map((provider) => (
              <CheckboxFilter
                key={provider.id}
                id={provider.id}
                checked={selectedProviders.includes(provider.id)}
                onCheckedChange={() => handleProviderToggle(provider.id)}
                label={provider.display_name}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Energy Type Filter */}
        <Collapsible
          open={openSections.energy}
          onOpenChange={() => toggleSection("energy")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50">
            <span className="font-medium">Energy Type</span>
            {openSections.energy ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            <CheckboxFilter
              id="renewable"
              checked={renewable === true}
              onCheckedChange={(checked) =>
                onRenewableChange(checked ? true : null)
              }
              label={
                <span className="flex items-center gap-2">
                  <span>Renewable Energy Only</span>
                  <span className="text-xs text-gray-500">
                    <LeafIcon className="w-4 h-4" />
                  </span>
                </span>
              }
            />
            <CheckboxFilter
              id="conventional"
              checked={renewable === false}
              onCheckedChange={(checked) =>
                onRenewableChange(checked ? false : null)
              }
              label="Conventional Energy Only"
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Pricing Type Filter */}
        <Collapsible
          open={openSections.pricing}
          onOpenChange={() => toggleSection("pricing")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50">
            <span className="font-medium">Pricing Type</span>
            {openSections.pricing ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            {pricingTypes?.map((pricingType) => (
              <CheckboxFilter
                key={pricingType}
                id={pricingType}
                checked={selectedPricingTypes.includes(pricingType)}
                onCheckedChange={() => handlePricingTypeToggle(pricingType)}
                label={pricingType.replace("_", " ")}
                className="capitalize"
              />
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Contract Duration Filter */}
        <Collapsible
          open={openSections.contract}
          onOpenChange={() => toggleSection("contract")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50">
            <span className="font-medium">Contract Duration</span>
            {openSections.contract ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            {durations?.map((duration) => (
              <CheckboxFilter
                key={duration}
                id={duration}
                checked={selectedContractDurations.includes(duration)}
                onCheckedChange={() => handleContractDurationToggle(duration)}
                label={duration}
                className="capitalize"
              />
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Price Range Filter */}
        <Collapsible
          open={openSections.price}
          onOpenChange={() => toggleSection("price")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50">
            <span className="font-medium">
              {priceView === "monthly" ? "Monthly" : "Annual"} Price Range
            </span>
            {openSections.price ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-3">
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={(value) =>
                  onPriceRangeChange(value as [number, number])
                }
                max={maxPrice}
                min={0}
                step={priceView === "monthly" ? 0.1 : 10}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 px-2">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
