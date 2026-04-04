"use client"

import { useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [docCode, setDocCode] = useState("")

  useLayoutEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.replace("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  // ⛔ BLOCK rendering until auth check finishes
  if (isAuthenticated === null) return null

  return (
    <div className="h-screen flex items-center justify-center bg-blue-950 text-white px-4">
      <div className="max-w-md w-full bg-slate-900/90 border border-white/10 shadow-2xl p-8 rounded-3xl text-center backdrop-blur-md">
        <h1 className="mb-6 text-2xl font-semibold">Collaborative Editor</h1>

        <button
          className="w-full bg-sky-500 hover:bg-sky-400 transition-colors px-5 py-3 rounded-2xl font-medium"
          onClick={() => {
            const id = Math.random().toString(36).substring(2, 8)
            window.location.href = `/doc/${id}`
          }}
        >
          Create Document
        </button>

        <div className="mt-5 text-sm text-slate-300">OR</div>

        <input
          value={docCode}
          onChange={(e) => setDocCode(e.target.value)}
          placeholder="Enter document code"
          className="mt-4 w-full rounded-2xl border border-slate-700 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-sky-400 focus:outline-none"
        />

        <button
          className="w-full bg-emerald-500 hover:bg-emerald-400 transition-colors px-5 py-3 rounded-2xl font-medium mt-4"
          onClick={() => {
            if (!docCode) return
            window.location.href = `/doc/${docCode}`
          }}
        >
          Join Document
        </button>
      </div>
    </div>
  )
}