import { z } from "zod";

import { Hono } from "hono";
import { handle } from "hono/vercel";

import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/hello", clerkMiddleware(), (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      error: "Unauthorized",
    });
  }

  return c.json({
    message: "Hello Next.js 123!",
    userId: auth.userId,
    sessionId: auth.sessionId,
  });
});

//   return c.json({
//     message: "Hello Next.js 123!",
//     userId: auth.userId,
//     sessionId: auth.sessionId,
//   });
// });
//   .get(
//     "/hello/:test",
//     zValidator(
//       "param",
//       z.object({
//         test: z.string(),
//       })
//     ),
//     (context) => {
//       const { test } = context.req.valid("param"); //? have to get right the param

//       return context.json({
//         message: "Harry Dang",
//         test: test,
//       });
//     }
//   )
//   .post(
//     "/create/:postId",
//     zValidator(
//       "json",
//       z.object({
//         name: z.string(),
//         userId: z.number(),
//       })
//     ),
//     zValidator(
//       "param",
//       z.object({
//         postId: z.string(),
//       })
//     ),
//     (c) => {
//       const { name, userId } = c.req.valid("json");
//       const { postId } = c.req.valid("param");
//       return c.json({});
//     }
//   );

export const GET = handle(app);
export const POST = handle(app);
