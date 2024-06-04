//* RPC client for the hono server which will use AppType from route.ts

import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
