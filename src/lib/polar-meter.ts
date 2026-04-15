import {TRPCError} from "@trpc/server";

import {polarClient} from "@/lib/polar";

export async function useMeter({
  customerId,
  externalCustomerId,
  meterName,
}: {
  customerId: string;
  externalCustomerId: string;
  meterName: string;
}) {
  const {result} = await polarClient.customerMeters.list({
    customerId,
  });

  const meter = result.items.find(
    (m: {meter: {name: string}}) => m.meter.name === meterName,
  );

  if (!meter || meter.balance <= 0) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `Insufficient ${meterName} balance`,
    });
  }

  await polarClient.events.ingest({
    events: [
      {
        name: meterName,
        externalCustomerId,
      },
    ],
  });

  return {
    success: true,
    remaining: meter.balance - 1,
  };
}
