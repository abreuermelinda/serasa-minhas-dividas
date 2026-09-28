import type {
  ReviewRequest,
  ReviewResponse,
} from "@/types/review";

export async function review(
  data: ReviewRequest,
): Promise<ReviewResponse> {
  const response = await fetch("/api/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Não foi possível confirmar o acordo");
  }

  return response.json();
}