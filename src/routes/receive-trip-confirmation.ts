import type { FastifyInstance } from 'fastify'

export async function receiveTripConfirmation(app: FastifyInstance) {
  app.get("/trips/:trip_id/confirm", async (request: any, reply) => {

    const {
      trip_id
    } = request.params

    //TODO:
    //Save confirmation @ the db.

    console.log(`Trip ${trip_id} confirmed!`)

    //TODO:
    //Redirect user to some page @ the frontend.

    return { tripId: trip_id }

  })
}