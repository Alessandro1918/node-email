
type ReceiveTripConfirmationType = {
  trip_id: string
}

export async function receiveTripConfirmationService({
  trip_id
}: ReceiveTripConfirmationType) {

  //TODO:
  //Save confirmation @ the db.

  console.log(`Trip ${trip_id} confirmed!`)

  return { tripId: trip_id }
}
