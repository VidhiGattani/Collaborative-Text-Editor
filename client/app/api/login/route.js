import { pool } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "mysecretkey"; // later move to env

export async function POST(req) {
  const { email, password } = await req.json();

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 400,
    });
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 400,
    });
  }

  const token = jwt.sign({ userId: user.id, email }, SECRET);

  return new Response(JSON.stringify({ token }), {
    status: 200,
  });
}