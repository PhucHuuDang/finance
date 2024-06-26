import { accounts } from "./../../../db/schema";
// communicate with accounts.ts in [[...route]] folder
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      //* client will get path url from hono.ts
      const response = await client.api.accounts.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
