"use client"

import { useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  const router = useRouter()

  useLayoutEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      router.replace("/")
      return
    }

    setAuthChecked(true)
  }, [router])

  if (!authChecked) {
    return null
  }

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Login failed")
        setLoading(false)
        return
      }

      localStorage.setItem("token", data.token)
      router.replace("/")
    } catch {
      alert("Something went wrong")
      setLoading(false)
    }
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
          width: "320px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
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
          value={password}
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
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Don’t have an account?{' '}
          <span
            onClick={() => router.push("/signup")}
            style={{ color: "#3b82f6", cursor: "pointer" }}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  )
}
