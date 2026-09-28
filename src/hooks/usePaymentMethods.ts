import { useQuery } from "@tanstack/react-query";

import { getPaymentMethods } from "@/services/paymentMethods";

export function usePaymentMethods() {
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: getPaymentMethods,
  });
}
