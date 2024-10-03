import nodemailer from "nodemailer"
import { env } from '../env'

export async function getMailClient() {
  const account = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    
    //Test account:
    // host: "smtp.ethereal.email",
    // port: 587,      // Port for secure SMTP
    // secure: false,  // Use `true` for port 465, `false` for all other ports
    // auth: {
    //   user: account.user,
    //   pass: account.pass,
    // },

    //Outlook acount:
    //September 16th, 2024: Basic Authentication no longer available to access any Outlook account
    // host: "smtp-mail.outlook.com",
    // port: 587,
    // // secure: false,
    // auth: {
    //   user: env.EMAIL_ADDRESS,
    //   pass: env.EMAIL_PASSWORD
    // },
    // tls: {
    //   ciphers: "SSLv3",
    //   rejectUnauthorized: false,
    // }

    //Gmail acount:
    //https://nodemailer.com/usage/using-gmail/
    service: "gmail", 
    auth: { 
      user: env.EMAIL_ADDRESS, 
      pass: env.EMAIL_PASSWORD 
    }
  })

  return transporter
}