'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/auth.js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"


export default function AuthPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const router = useRouter()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const getFieldError = (field: string) => {
    if (!touchedFields.has(field)) return ''
    
    switch (field) {
      case 'email':
        return !formData.email 
          ? 'Email is required'
          : !validateEmail(formData.email)
          ? 'Please enter a valid email'
          : ''
      case 'password':
        return !formData.password
          ? 'Password is required'
          : !validatePassword(formData.password)
          ? 'Password must be at least 6 characters'
          : ''
      default:
        return ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setTouchedFields(prev => new Set(prev).add(name))
  }

  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouchedFields(new Set(['email', 'password']))

    // Validate all fields
    const emailError = getFieldError('email')
    const passwordError = getFieldError('password')
    if (emailError || passwordError) return

    setIsLoading(true)
    setError('')

    try {
      await signIn(formData.email, formData.password)
      router.push('/dashboard')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[450px] shadow-lg">
        <CardContent className="p-8">
          <h1 className="text-2xl font-semibold text-center mb-8">Welcome back!</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                required
                aria-describedby="email-error"
                className={`w-full ${getFieldError('email') ? 'border-red-500' : ''}`}
              />
              {getFieldError('email') && (
                <p id="email-error" className="text-sm text-red-500">
                  {getFieldError('email')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                required
                aria-describedby="password-error"
                className={`w-full ${getFieldError('password') ? 'border-red-500' : ''}`}
              />
              {getFieldError('password') && (
                <p id="password-error" className="text-sm text-red-500">
                  {getFieldError('password')}
                </p>
              )}
            </div>
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
            <div className="text-center text-sm">
              <span className="text-gray-600">Don&apos;t have an account? </span>
              <Button
                type="button"
                variant="link"
                onClick={() => router.push('/sign-up')}
                className="text-[#D7524A] hover:text-[#E2673F] p-0 h-auto font-normal"
              >
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}