"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

// Initialize Supabase client
const supabase = createClientComponentClient()

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleEmailSignIn = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Error signing in:", error)
      setIsLoading(false)
    } else {
      router.push("/profile")
    }
  }

  const handleGoogleSignIn = async (credentialResponse: any) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: credentialResponse.credential,
    })

    if (error) {
      console.error("Error signing in with Google:", error)
    } else {
      router.push("/profile")
    }
  }

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ''}>
      <div className="flex min-h-screen">
        {/* Left side - Login form */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="mb-8">
              <Image src="/placeholder.svg?height=40&width=200" alt="DevFound Logo" width={200} height={40} />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Login</h2>
              <p className="mt-2 text-sm text-gray-600">
                Find the job made for you!
              </p>
            </div>

            <div className="mt-8">
              <div>
                <GoogleLogin
                  onSuccess={handleGoogleSignIn}
                  onError={() => console.log('Login Failed')}
                  theme="outline"
                  size="large"
                  width="100%"
                  text="signin_with"
                  shape="rectangular"
                />
              </div>

              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or Login with Email</span>
                </div>
              </div>

              <div className="mt-6">
                <form onSubmit={handleEmailSignIn} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="mt-1"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-end">
                    <div className="text-sm">
                      <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Logging in...' : 'Log in'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Not registered?{' '}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Create an Account
              </Link>
            </p>

            <p className="mt-4 text-center text-xs text-gray-500">
              Looking for AngelList Venture?{' '}
              <a href="https://angel.co" className="font-medium text-gray-900 hover:underline">
                Visit AngelList.com
              </a>
            </p>
          </div>
        </div>

        {/* Right side - Decorative content */}
        <div className="hidden lg:block relative w-0 flex-1">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-400 to-indigo-600">
            <div className="absolute inset-0 bg-white opacity-20">
              <div className="absolute top-0 right-0 h-64 w-64 bg-yellow-400 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 h-64 w-64 bg-green-400 rounded-tr-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 w-32 bg-red-400 rounded-full"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h2 className="text-4xl font-bold mb-4">Find the job made for you.</h2>
              <p className="text-xl max-w-md text-center">
                Browse over 130K jobs at top companies and fast-growing startups.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}
