import { RedisImplement } from './RedisImplement'

export class WeathrApi {

    static async getWeater(url: string) {

        const client = await RedisImplement.inicialClient()
        const cache = await RedisImplement.getCache(client, 'clima')

        if (cache) {
            return cache
        }

        const res = await fetch(url)
        const json = await res.json()
        
        await RedisImplement.setCache(client, 'clima', JSON.stringify(json))
        return json
    }
}