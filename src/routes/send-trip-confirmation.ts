import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { sendTripConfirmationService } from '../services/send-trip-confirmation'

export async function sendTripConfirmationRoute(app: FastifyInstance) {

  app.post("/send-trip-confirmation", async (request, reply) => {

    //De-structure without Zod:
    // const { destination, ... } = request.body

    //With Zod:
    const requestSchema = z.object({
      destination: z.string(),
      starts_at: z.string().date(),
      ends_at: z.string().date(),
      owner_name: z.string(),
      owner_email: z.string().email(),
      emails_to_invite: z.string().email().array()
    })

    const body = requestSchema.parse(request.body)

    const {
      destination,
      starts_at,
      ends_at,
      owner_name,
      owner_email,
      emails_to_invite,
    } = body

    const trip = await sendTripConfirmationService({
      destination, 
      starts_at,
      ends_at,
      owner_name,
      owner_email,
      emails_to_invite
    })

    return { tripId: trip.id }

  })
}