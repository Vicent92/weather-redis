import { serve } from 'bun'
import { createClient } from 'redis'

const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

serve({
   async fetch(req) {
        const path = new URL(req.url)
        const queryParam = path.searchParams

        if (path.pathname === '/clima') {
            const cache = await client.get('clima')
            if (cache) {
                return new Response(cache, {status: 200})
            }

            const city = queryParam.get('city')
            const res = await fetch(`${process.env.API_WEATHER}/${city}?key=${process.env.KEY_API_WEATHER}`)
            const json = await res.json()

            await client.set('clima', JSON.stringify(json))
            return new Response(JSON.stringify(json), {status: 200})
        }
        // console.log(path.pathname)
        return new Response(`QLQ`)        
    },
})

console.log('Server started on http://localhost:3000')