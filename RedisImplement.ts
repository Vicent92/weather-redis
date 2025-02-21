import { createClient } from "redis";

export interface CacheStrategy {
  inicialClient(): Promise<any>;
  getCache(client: any, key: string): Promise<any>;
  setCache(client: any, key: string, value: any): Promise<void>;
}

export class RedisImplement implements CacheStrategy {
  async inicialClient() {
    const client = await createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();

    return client;
  }

  async getCache(client: any, key: string) {
    const cache = await client.get(key);
    return cache;
  }

  async setCache(client: any, key: string, value: any) {
    await client.set(key, value);
  }
}
