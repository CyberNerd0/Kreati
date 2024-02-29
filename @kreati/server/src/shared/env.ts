import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

const env = createEnv({
	clientPrefix: "",
	client: {},
	server: {
		NODE_ENV: z.enum(["production", "development", "test"]),
		PORT: z.coerce.number().min(0).max(65535),
		DATABASE_URL: z.string().url(),
		ACCESS_TOKEN_SECRET: z.string().min(32),
		ACCESS_TOKEN_VALIDITY_PERIOD: z.coerce.number(),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		PORT: process.env.SERVER_PORT,
		DATABASE_URL: process.env.SERVER_DATABASE_URL,
		ACCESS_TOKEN_SECRET: process.env.SERVER_ACCESS_TOKEN_SECRET,
		ACCESS_TOKEN_VALIDITY_PERIOD: process.env.SERVER_ACCESS_TOKEN_VALIDITY_PERIOD,
	}
})

export default env
