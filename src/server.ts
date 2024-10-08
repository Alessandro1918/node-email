import fastify from "fastify"
import cors from '@fastify/cors'

import { errorHandler } from "./errors/error-handler"
import { env } from './env'
import { helloWorld } from './routes/hello-world'
import { sendTripConfirmationRoute } from './routes/send-trip-confirmation'
import { receiveTripConfirmationRoute } from './routes/receive-trip-confirmation'

const app = fastify()

app.register(cors, {
  origin: '*',
})

//Replace the default error handler for my handler, that can send different messages / status codes
app.setErrorHandler(errorHandler)

app.register(helloWorld)
app.register(sendTripConfirmationRoute)
app.register(receiveTripConfirmationRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server running at http://localhost:${env.PORT}`)
})