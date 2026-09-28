import { http, HttpResponse } from "msw";

import { offers } from "./data/offers";
import { paymentMethods } from "./data/paymentMethods";

export const handlers = [
  http.get("/api/offers", () => {
    return HttpResponse.json(offers);
  }),

  http.get("/api/payment-methods", () => {
    return HttpResponse.json(paymentMethods);
  }),
];