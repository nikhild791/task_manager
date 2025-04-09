import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.PORT
export const admin_secret_token = process.env.ADMIN_SECRET_TOKEN
export const user_secret_token = process.env.USER_SECRET_TOKEN

