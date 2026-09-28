export type PaymentCondition =
  | {
      type: "cash";
    }
  | {
      type: "installment";
      downPayment: number;
      installments: number;
      installmentAmount: number;
    };

export type Offer = {
  id: string;
  creditorName: string;
  debtType: string;
  debtSince: string;
  originalAmount: number;
  negotiatedAmount: number;
  discountPercentage: number;
  paymentCondition: PaymentCondition;
  isBestOffer: boolean;
}