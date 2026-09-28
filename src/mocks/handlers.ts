import { http, HttpResponse } from "msw";

import { offers } from "./data/offers";
import { paymentMethods } from "./data/paymentMethods";

import type { ReviewRequest } from "@/types/review";

export const handlers = [
  http.get("/api/offers", () => {
    return HttpResponse.json(offers);
  }),

  http.get("/api/payment-methods", () => {
    return HttpResponse.json(paymentMethods);
  }),

   http.post("/api/review", async ({ request }) => {
    const body = (await request.json()) as ReviewRequest;

    if (!body.offerId || !body.paymentMethodId) {
      return HttpResponse.json(
        {
          message: "Dados inválidos para confirmar o acordo",
        },
        {
          status: 400,
        },
      );
    }

    return HttpResponse.json(
      {
        agreementId: "agreement-001",
        status: "confirmed",
      },
      {
        status: 201,
      },
    );
  }),
];