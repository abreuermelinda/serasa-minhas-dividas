import type { PaymentMethod } from "@/types/paymentMethod";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "payment-pix",
    type: "pix",
    label: "Pix",
    description: "Pagamento na hora, sem sair de casa",
    isFastest: true,
  },
  {
    id: "payment-boleto",
    type: "boleto",
    label: "Boleto",
    description: "Pague no app do banco ou em lotéricas",
    isFastest: false,
    dueDate: "2026-09-30",
    clearingDays: 3,
  },
];
