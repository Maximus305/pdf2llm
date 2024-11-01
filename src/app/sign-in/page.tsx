'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/auth.js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('') // New state for name
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (isSignUp) {
        // Call signUp with name, email, and password
        await signUp(email, password, name)
      } else {
        await signIn(email, password)
      }
      router.push('/home')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-[450px] border rounded-lg">
        <CardContent className="p-8">
          <h1 className="text-2xl font-normal text-center mb-8">
            {isSignUp ? "Create an account" : "Welcome back!"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            {isSignUp && (
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-10 px-3 border rounded"
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 px-3 border rounded"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-10 px-3 border rounded"
              />
            </div>
            <Button 
              type="submit"
              disabled={isLoading}
              className={`w-full h-10 rounded bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white hover:opacity-90`}
            >
              {isLoading ? (isSignUp ? "Creating account..." : "Signing in...") : (isSignUp ? "Sign up" : "Log in")}
            </Button>
            {!isSignUp && (
              <div className="text-center text-sm">
                <button 
                  type="button" 
                  onClick={() => router.push('/forgot-password')}
                  className="text-gray-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}
            <div className="text-center text-sm">
              <span className="text-gray-600">
                {isSignUp ? "Already have an account? " : "Don't have an Account? "}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setEmail('')
                  setPassword('')
                  setName('') // Reset name field
                }}
                className="text-black hover:underline"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}