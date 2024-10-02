import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { receiveTripConfirmationService } from '../services/receive-trip-confirmation'

export async function receiveTripConfirmationRoute(app: FastifyInstance) {
  
  //In PROD, the confirmation email should have a link to a webpage (frontend), 
  //which in turn would call this backend route.

  app.get("/trips/:trip_id/confirm", async (request: any, reply) => {

    //De-structure without Zod:
    // const { trip_id } = request.params

    //With Zod:
    const requestSchema = z.object({
      trip_id: z.string().uuid()
    })

    const params = requestSchema.parse(request.params)

    const { trip_id } = params

    await receiveTripConfirmationService({ trip_id })

    return { tripId: trip_id }

  })
}