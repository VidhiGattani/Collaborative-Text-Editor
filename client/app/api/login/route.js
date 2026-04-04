export const runtime = "nodejs";

import { pool } from "../../../lib/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return Response.json({ error: "Missing fields" }, { status: 400 })
    }

    // 🔍 Find user
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )

    if (result.rows.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    const user = result.rows[0]

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // 🔑 Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    return Response.json({ token })

  } catch (error) {
    console.error("LOGIN ERROR:", error)
    return Response.json({ error: "Login failed" }, { status: 500 })
  }
}