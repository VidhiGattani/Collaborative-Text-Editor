"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Signup failed")
        setLoading(false)
        return
      }

      alert("Signup successful!")

      // 👉 redirect to login
      router.replace("/login")

    } catch (err) {
      alert("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
      }}
    >
      <div
        style={{
          padding: "30px",
          borderRadius: "10px",
          background: "#1e293b",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Signup</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            background: "#22c55e",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        {/* 👉 Go to Login */}
        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            style={{ color: "#3b82f6", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}