import { RedisImplement, type CacheStrategy } from "./RedisImplement";

export class WeathrApi {
  private cacehStrategy: CacheStrategy;

  constructor(cacheStrategy: CacheStrategy) {
    this.cacehStrategy = cacheStrategy;
  }

  setCacheStrategy(cacheStrategy: CacheStrategy) {
    this.cacehStrategy = cacheStrategy;
  }

  async getWeater(url: string) {
    const client = await this.cacehStrategy.inicialClient();
    const cache = await this.cacehStrategy.getCache(client, "clima");

    if (cache) {
      return cache;
    }

    const res = await fetch(url);
    const json = await res.json();

    await this.cacehStrategy.setCache(client, "clima", JSON.stringify(json));
    return json;
  }
}
