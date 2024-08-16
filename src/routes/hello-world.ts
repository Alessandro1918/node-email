import type { FastifyInstance } from 'fastify'

export async function helloWorld(app: FastifyInstance) {

  app.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
  })

}