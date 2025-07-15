"use client";

import { Clock, Leaf, Shield, Star, Zap } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useProviders } from "~/hooks/useproviders";
import type { EnergyOffer, PriceView } from "~/types";
import {
  calculateConsumptionCost,
  calculateTotalAnnualCost,
  formatPrice,
  formatPricePerKwh,
} from "~/utils/pricing";

// Mock some missing data for better UX
const mockFeatures = [
  "24/7 customer support",
  "Online account management",
  "Monthly billing",
];

// Generate consistent random values based on offer ID
const generateRandomValues = (offerId: string) => {
  const seed = offerId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const rating = seededRandom(seed) * (5 - 3) + 3;
  const reviewCount = Math.floor(seededRandom(seed + 1) * (500 - 50) + 50);

  return {
    rating: Math.round(rating * 10) / 10,
    reviewCount,
  };
};

type Props = {
  offer: EnergyOffer;
  priceView: PriceView;
  onSelect: (offer: EnergyOffer) => void;
};

export const OfferCard = ({ offer, priceView, onSelect }: Props) => {
  // Calculate price information using available utilities
  const totalAnnualCost = calculateTotalAnnualCost(offer);
  const consumptionCost = calculateConsumptionCost(offer);
  const { data: providers, isLoading } = useProviders();
  // Generate consistent random values for this offer
  const { rating, reviewCount } = generateRandomValues(offer.id);

  const price =
    priceView === "monthly" ? totalAnnualCost / 12 : totalAnnualCost;
  const period = priceView === "monthly" ? "month" : "year";

  const getProviderName = (providerId: string) => {
    const provider = providers?.find((p) => p.id === providerId);
    return provider?.display_name;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-2 hover:border-blue-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">
              {offer.name}
            </CardTitle>
            <div className="text-sm text-gray-600 mt-1">
              {isLoading ? (
                <Skeleton className="w-24 h-4" />
              ) : (
                getProviderName(offer.provider_id)
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-2">{offer.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold text-blue-900">
              {formatPrice(price)}
            </span>
            <span className="text-sm text-gray-600">per {period}</span>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs text-gray-600 cursor-help">
                  {formatPricePerKwh(offer.consumption_pricing)} per kWh +{" "}
                  {formatPrice(offer.subscription_cost)} annual fee
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p>Based on 400 kWh annual consumption</p>
                  <p>Consumption: {formatPrice(consumptionCost)}/year</p>
                  <p>
                    Subscription: {formatPrice(offer.subscription_cost)}/year
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {offer.metadata.energy_type === "green" && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Leaf className="w-3 h-3 mr-1" />
              Renewable
            </Badge>
          )}
          {offer.metadata.price_guarantee === "fixed" && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Shield className="w-3 h-3 mr-1" />
              Fixed Price
            </Badge>
          )}
          {offer.metadata.contract_duration !== "no commitment" && (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              <Clock className="w-3 h-3 mr-1" />
              {offer.metadata.contract_duration}
            </Badge>
          )}
        </div>

        {/* Features */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-900">Key Features</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {mockFeatures.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center">
                <Zap className="w-3 h-3 mr-2 text-blue-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Contract Details */}
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>Contract Duration:</span>
            <span>{offer.metadata.contract_duration}</span>
          </div>
          <div className="flex justify-between">
            <span>Price Guarantee:</span>
            <span className="capitalize">{offer.metadata.price_guarantee}</span>
          </div>
          <div className="flex justify-between">
            <span>Energy Type:</span>
            <span className="capitalize">{offer.metadata.energy_type}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onSelect(offer)}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Select This Offer
        </Button>
      </CardContent>
    </Card>
  );
};
