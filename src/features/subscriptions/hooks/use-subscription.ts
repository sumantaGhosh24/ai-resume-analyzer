import {useQuery} from "@tanstack/react-query";

import {authClient} from "@/lib/auth-client";

export const METER_MAP = {
  roadmap_generator: "1eb7e964-d0b8-4580-b27a-04fc093f3dca",
  cover_letter: "8633fed9-98e0-4fe3-8a0e-eb8bc2d980c9",
  resume_rewrite: "91795a3c-13bf-4546-abc5-6724a1da7ca3",
  ats_simulation: "cae3a6f0-39fd-40d2-bfe2-488a9a39e6d6",
  resume_analyze: "ec10b10c-0297-4fec-9eca-e4453bec2dc3",
} as const;

export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const {data} = await authClient.customer.state();
      return data;
    },
  });
};

export const useSubscriptionState = () => {
  const {data, isLoading, error, refetch} = useSubscription();

  const activeSubscription = data?.activeSubscriptions?.[0];

  const hasActiveSubscription =
    data?.activeSubscriptions && data.activeSubscriptions.length > 0;

  const plan =
    activeSubscription?.id === "eff61ef9-dcae-45b7-8c48-08e592b838db"
      ? "FREE"
      : "PRO";

  const meters = data?.activeMeters || [];

  const getMeter = (feature: keyof typeof METER_MAP) => {
    const meterId = METER_MAP[feature];

    return meters.find((m) => m.meterId === meterId);
  };

  const hasAccess = (feature: keyof typeof METER_MAP, required = 1) => {
    const meter = getMeter(feature);

    if (!meter) return false;

    return meter.balance >= required;
  };

  const getUsage = (feature: keyof typeof METER_MAP) => {
    const meter = getMeter(feature);

    if (!meter) return null;

    return {
      remaining: meter.balance,
      used: meter.consumedUnits,
      total: meter.creditedUnits,
    };
  };

  return {
    data,
    subscription: activeSubscription,
    hasActiveSubscription,
    plan,
    meters,
    getMeter,
    hasAccess,
    getUsage,
    isLoading,
    error,
    refetch,
  };
};
