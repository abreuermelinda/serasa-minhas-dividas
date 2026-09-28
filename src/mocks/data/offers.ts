import type { Offer } from "@/types/offer";

export const offers: Offer[] = [
  {
    id: "offer-001",
    creditorName: "Banco Horizonte",
    debtType: "Cartão de crédito",
    debtSince: "2023-03",
    originalAmount: 3480.9,
    negotiatedAmount: 689,
    discountPercentage: 80,
    paymentCondition: {
      type: "cash",
    },
    isBestOffer: true,
  },
  {
    id: "offer-002",
    creditorName: "Conecta Telecom",
    debtType: "Conta de celular",
    debtSince: "2024-08",
    originalAmount: 412.37,
    negotiatedAmount: 98.9,
    discountPercentage: 76,
    paymentCondition: {
      type: "cash",
    },
    isBestOffer: false,
  },
  {
    id: "offer-003",
    creditorName: "Loja Vitrine",
    debtType: "Crediário",
    debtSince: "2024-01",
    originalAmount: 1250,
    negotiatedAmount: 450,
    discountPercentage: 64,
    paymentCondition: {
      type: "installment",
      downPayment: 90,
      installments: 4,
      installmentAmount: 90,
    },
    isBestOffer: false,
  },
];