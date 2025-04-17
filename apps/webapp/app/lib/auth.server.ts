import { betterAuth } from "better-auth";
import pg from "pg";
const { Pool } = pg;
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      roles: {
        type: "string[]",
      },
    },
  },
  database: new Pool({
    connectionString: import.meta.env.VITE_DATABASE_URL,
  }),
});

export type AuthSession = typeof auth.$Infer.Session;
