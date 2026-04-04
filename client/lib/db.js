import pkg from "pg"

const { Pool } = pkg

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "collab_editor",
  password: "Vidhi@321",
  port: 5432,
})