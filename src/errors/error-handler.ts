import type { FastifyInstance } from "fastify"
import { ClientError } from "./client-error"
import { EmailError } from "./email-error"
import { ZodError } from "zod"

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Invalid input',
      errors: error.flatten().fieldErrors
    })
  }

  //This "ClientError" is a custom class I extended from Error and used in all the routes.
  //With more classes (like "AuthError", for ex), I could send different status codes.
  if (error instanceof ClientError) {
    return reply.status(400).send({
      message: error.message
    })
  }

  if (error instanceof EmailError) {
    return reply.status(535).send({
      message: error.message
    })
  }
  
  return reply.status(500).send({
    message: 'Internal server error'
  })
}