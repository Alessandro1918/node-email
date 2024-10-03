import { z } from 'zod'

const envSchema = z.object({
  // DATABASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  WEB_BASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
})

//This "helper" will parse "process.env" file first, to ensure all the vars are OK.
//Other functions will read "env" from here, not from "process.env".
export const env = envSchema.parse(process.env)