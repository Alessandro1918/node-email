
type ReceiveTripConfirmationType = {
  trip_id: string
}

export async function receiveTripConfirmationService({
  trip_id
}: ReceiveTripConfirmationType) {

  //TODO:
  //Save confirmation @ the db.
  console.log(`Trip ${trip_id} confirmed!`)

  const trip = {
    emails_to_invite: [
    "1@gmail.com",
    "2@gmail.com"
    ]
  }

  //TODO:
  //Send email invitation to all the "emails_to_invite" of this trip.
  console.log("Sending emails...")
  trip.emails_to_invite.map(email => {
    console.log(`Email sento to: ${email}`)
  })

  return { tripId: trip_id }
}
