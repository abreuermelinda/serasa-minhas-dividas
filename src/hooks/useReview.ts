import { useMutation } from "@tanstack/react-query";

import { review } from "@/services/review";

export function useReview() {
  return useMutation({
    mutationFn: review,
  });
}