export type ReviewRequest = {
  offerId: string;
  paymentMethodId: string;
};

export type ReviewResponse = {
  agreementId: string;
  status: "confirmed";
};