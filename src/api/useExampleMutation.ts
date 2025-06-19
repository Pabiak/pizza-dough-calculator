import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/utils/axiosInstance";

interface IMutationProps {
  reason: string;
  uid: string;
}

export const useBlock = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ reason, uid }: IMutationProps) => {
      const response = await axiosInstance.post(`/endpoint/${uid}`, {
        block_reason: reason,
      });

      if (response.status !== 200) {
        throw response.data;
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["key"] });
    },
  });

  return { ...mutation };
};
