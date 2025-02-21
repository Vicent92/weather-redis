import { serve } from "bun";
import { createClient } from "redis";
import { WeathrApi } from "./GetWeatherApi";
import { RedisImplement } from "./RedisImplement";

const weatherAapi = new WeathrApi(new RedisImplement());
const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

serve({
  async fetch(req) {
    const path = new URL(req.url);
    const queryParam = path.searchParams;

    if (path.pathname === "/clima") {
      const city = queryParam.get("city");
      const data = await weatherAapi.getWeater(
        `${process.env.API_WEATHER}/${city}?key=${process.env.KEY_API_WEATHER}`,
      );

      return new Response(JSON.stringify(data), { status: 200 });
    }
    // console.log(path.pathname)
    return new Response(`QLQ`);
  },
});

console.log("Server started on http://localhost:3000");
