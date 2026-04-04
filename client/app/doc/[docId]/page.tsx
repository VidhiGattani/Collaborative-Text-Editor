"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import Editor from "../../../components/Editor"

export default function DocPage() {
  const params = useParams()
  const router = useRouter()
  const docId = params.docId as string

  // 🔐 AUTH GUARD
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
    }
  }, [])

  const copyLink = () => {
    const url = `${window.location.origin}/doc/${docId}`
    navigator.clipboard.writeText(url)
    alert("Link copied!")
  }

  const logout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <div>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          
          {/* Back Button */}
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "6px 10px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            ⬅ Back
          </button>

          <h2>Document: {docId}</h2>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ display: "flex", gap: "10px" }}>
          
          {/* Copy Link */}
          <button
            onClick={copyLink}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            🔗 Copy Code
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              borderRadius: "5px",
              background: "#ef4444",
              color: "white",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* EDITOR */}
      <Editor docId={docId} />
    </div>
  )
}