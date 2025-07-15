import { initContract } from "@ts-rest/core";
import { generateOpenApi } from "@ts-rest/open-api";
import { z } from "zod";

const energyOfferSchema = z.object({
  id: z.string().default("offer_fr_001_02"),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  provider_id: z.string(),
  consumption_pricing: z.number(),
  subscription_cost: z.number(),
  metadata: z.object({
    energy_type: z.string(),
    contract_duration: z.string(),
    price_guarantee: z.string(),
  }),
});

const energyProviderSchema = z.object({
  id: z.string().default("fr_003"),
  slug: z.string(),
  display_name: z.string(),
  country: z.string(),
});

const energyOfferSchemaWithDefault = energyOfferSchema.extend({
  id: z.string().default("offer_fr_001_02"),
});

const energyProviderSchemaWithDefault = energyProviderSchema.extend({
  id: z.string().default("fr_003"),
});

const c = initContract();

export const contract = c.router({
  energy: {
    getProviders: {
      method: "GET",
      path: "/api/energy/providers",
      responses: {
        200: z.array(energyProviderSchema),
      },
    },
    getProviderById: {
      method: "GET",
      path: "/api/energy/providers/:id",
      responses: {
        200: energyProviderSchemaWithDefault,
      },
    },
    getOffers: {
      method: "GET",
      path: "/api/energy/offers",
      responses: {
        200: z.array(energyOfferSchema),
      },
    },
    getOfferById: {
      method: "GET",
      path: "/api/energy/offers/:id",
      responses: {
        200: energyOfferSchemaWithDefault,
      },
    },
    getOffersByProviderId: {
      method: "GET",
      path: "/api/energy/providers/:id/offers",
      responses: {
        200: z.array(energyOfferSchemaWithDefault),
      },
    },
  },
  country: {
    getCountries: {
      method: "GET",
      path: "/api/countries",
      responses: {
        200: z.string().array(),
      },
    },
  },
  enum: {
    getPricingTypes: {
      method: "GET",
      path: "/api/enum/pricingTypes",
      responses: {
        200: z.array(z.string()),
      },
    },
    getDurations: {
      method: "GET",
      path: "/api/enum/durations",
      responses: {
        200: z.array(z.string()),
      },
    },
  },
});

export const openApi = generateOpenApi(contract, {
  info: {
    title: "Energy Provider API",
    description: "API for energy providers",
    version: "1.0.0",
  },
});
