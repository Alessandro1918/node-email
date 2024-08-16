import fastify from "fastify"
import cors from '@fastify/cors'

import { env } from './env'
import { helloWorld } from './routes/hello-world'

const app = fastify()

app.register(cors, {
  origin: '*',
})

app.register(helloWorld)

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server running at http://localhost:${env.PORT}`)
})