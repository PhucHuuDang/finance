import { accounts } from "../../../db/schema";
// communicate with accounts.ts in [[...route]] folder
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetAccountDetail = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", { id }],
    queryFn: async () => {
      //* client will get path url from hono.ts
      const response = await client.api.accounts[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch account detail");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
