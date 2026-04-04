"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [docCode, setDocCode] = useState("")

  useEffect(() => {
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
    <div className="h-screen flex items-center justify-center bg-blue-950 text-white">
      <div className="bg-white/10 p-8 rounded-xl text-center">
        <h1 className="mb-4 text-lg">Collaborative Editor</h1>

        <button
          className="bg-blue-500 px-4 py-2 rounded"
          onClick={() => {
            const id = Math.random().toString(36).substring(2, 8)
            window.location.href = `/doc/${id}`
          }}
        >
          Create Document
        </button>

        <div className="mt-4 text-white">OR</div>

        <input
          value={docCode}
          onChange={(e) => setDocCode(e.target.value)}
          placeholder="Enter document code"
          className="mt-4 p-2 text-black w-full rounded"
        />

        <button
          className="bg-green-500 px-4 py-2 rounded mt-2 w-full"
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