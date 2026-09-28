type PaymentMethodBase = {
  id: string;
  label: string;
  description: string;
  isFastest: boolean;
};

type PixPaymentMethod = PaymentMethodBase & {
  type: "pix";
};

type BoletoPaymentMethod = PaymentMethodBase & {
  type: "boleto";
  dueDate: string;
  clearingDays: number;
};

export type PaymentMethod =
  | PixPaymentMethod
  | BoletoPaymentMethod;