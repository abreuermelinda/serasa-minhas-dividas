import type { PaymentMethod } from "@/types/paymentMethod";

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const response = await fetch("/api/payment-methods");

  if (!response.ok) {
    throw new Error(
      "Não foi possível carregar as formas de pagamento",
    );
  }

  return response.json();
}