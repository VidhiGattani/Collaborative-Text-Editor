export const runtime = "nodejs";

import { pool } from "../../../lib/db";
const bcrypt = require("bcryptjs");

export async function POST(req) {
  const { email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    return new Response(JSON.stringify({ message: "User created" }), {
      status: 200,
    });
  } catch {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }
}