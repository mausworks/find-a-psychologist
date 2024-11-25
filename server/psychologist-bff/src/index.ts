import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

const PSYCHOLOGISTS_URL =
  "https://mindler.se/api/mindlerproxy/psychologists/available/";

const app = new Elysia()
  .use(cors())
  .get(
    "/psychologists/available",
    ({ query }) => {
      const search = new URLSearchParams(
        Object.entries(query).filter(([_, value]) => value !== undefined) as any
      ).toString();

      console.log("Fetching psychologists with query:", search);

      return fetch(PSYCHOLOGISTS_URL + "?" + search, {
        method: "GET",
        referrer: "https://mindler.se/en/our-psychologists/",
        referrerPolicy: "strict-origin-when-cross-origin",
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en-GB;q=0.9,en;q=0.8",
          applanguage: "en",
          countryid: "1",
          countryiso2code: "SE",
          languageid: "1",
          priority: "u=1, i",
        },
      });
    },
    {
      query: t.Object({
        languages: t.Optional(t.Numeric({ minimum: 0 })),
        specialities: t.Optional(t.Numeric({ minimum: 0 })),
      }),
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
