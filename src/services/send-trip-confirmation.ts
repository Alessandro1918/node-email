
import { dayjs } from "../libs/dayjs"
// import { prisma } from '../lib/prisma'
import nodemailer from "nodemailer"
import { ClientError } from "../errors/client-error"
import { getMailClient } from "../libs/mail"
import { env } from "../env"

type SendTripConfirmationType = {
  destination: string,
  starts_at: string,
  ends_at: string,
  owner_name: string,
  owner_email: string,
  emails_to_invite: string[]
}

export async function sendTripConfirmationService({
  destination,
  starts_at,
  ends_at,
  owner_name,
  owner_email,
  emails_to_invite
}: SendTripConfirmationType) {

  //Error Handling
  if (dayjs(starts_at).isBefore(new Date())) {
    // throw new Error('Invalid start date.')
    throw new ClientError('Invalid start date.')
  }

  if (dayjs(ends_at).isBefore(starts_at)) {
    throw new ClientError('Invalid end date.')
  }

  //Save @ the db
  // const trip = await prisma.trip.create({
  //   data: {
  //     destination,
  //     starts_at,
  //     ends_at,
  //     participants: {
  //       createMany: {
  //         data: [
  //           {
  //             name: owner_name,
  //             email: owner_email,
  //             is_owner: true,
  //             is_confirmed: true,
  //           },
  //           ...emails_to_invite.map((email) => {
  //             return { email }
  //           }),
  //         ],
  //       },
  //     },
  //   },
  // })
  const trip = {
    id: "63bdd022-3a99-4b3d-9058-14a7c2e26730"
  }

  //Send email
  const formattedStartDate = dayjs(starts_at).format('LL')    //"2024-08-19" -> "19 de agosto de 2024"
  const formattedEndDate = dayjs(ends_at).format('LL')

  //In PROD, this email should have a link to a webpage (frontend), 
  //which in turn would call the "/receive-trip-confirmation" backend route.
  const confirmationLink = `${env.API_BASE_URL}/trips/${trip.id}/confirm`

  const mail = await getMailClient()

  console.log("Sending email...")
  
  const message = await mail.sendMail({
    from: {
      name: 'Equipe plann.er',
      address: 'oi@plann.er',
    },
    to: {
      name: owner_name,
      address: owner_email,
    },
    subject: `Confirme sua viagem para ${destination} em ${formattedStartDate}`,
    html: `
    <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
      <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
      <p>Para confirmar sua viagem, clique no link abaixo:</p>
      <p>
        <a href="${confirmationLink}">Confirmar viagem</a>
      </p>
      <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
    </div>
    `.trim(),
  })

  console.log("Email sent! Check at:")
  console.log(nodemailer.getTestMessageUrl(message))

  return trip
}