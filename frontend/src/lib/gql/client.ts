import { GraphQLClient } from "graphql-request";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase exposes pg_graphql at /graphql/v1
export const gqlClient = new GraphQLClient(`${SUPABASE_URL}/graphql/v1`, {
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  },
});
