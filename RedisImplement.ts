import { createClient } from "redis";

export class RedisImplement {

    static async inicialClient() {
        const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();

        return client;
    }

    static async getCache(client: any, key: string) {
        const cache = await client.get(key);
        return cache;
    }

    static async setCache(client: any, key: string, value: any) {
        await client.set(key, value);
    }
}