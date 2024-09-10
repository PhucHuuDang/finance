import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$delete"]
>;

// type RequestType = InferRequestType<
//   (typeof client.api.accounts)[":id"]["$delete"]
// >["json"];

export const useDeleteAccount = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.accounts[":id"]["$delete"]({
        param: { id },
      });

      return await response.json();
    },

    onSuccess: () => {
      toast.success("Account deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["account", { id }] }); //* refetch all accounts
      queryClient.invalidateQueries({ queryKey: ["accounts"] }); //* refetch all accounts
      // TODO: Invalidate summary and transactions
    },

    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  return mutation;
};
