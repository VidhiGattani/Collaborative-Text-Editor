import { pool } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const result = await pool.query(
      "SELECT content FROM documents WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return Response.json({ content: "" });
    }

    return Response.json({ content: result.rows[0].content });
  } catch (error) {
    console.error("GET ERROR:", error);
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, content } = body;

    await pool.query(
      `
      INSERT INTO documents (id, content)
      VALUES ($1, $2)
      ON CONFLICT (id)
      DO UPDATE SET content = $2, updated_at = CURRENT_TIMESTAMP
      `,
      [id, content]
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("POST ERROR:", error);
    return Response.json({ error: "Failed to save" }, { status: 500 });
  }
}