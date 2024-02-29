import env from "@kreati/server/shared/env"

const config = {
  db: {
    url: env.DATABASE_URL
  },
  server: {
    port: env.PORT
  },
  jwt: {
    accessToken: {
      validity: env.ACCESS_TOKEN_VALIDITY_PERIOD,
      secret: env.ACCESS_TOKEN_SECRET
    }
  }
}

export default config
