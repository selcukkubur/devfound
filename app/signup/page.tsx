"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const router = useRouter()

  const handleEmailSignUp = async (event: React.FormEvent, accountType: 'jobseeker' | 'employer') => {
    event.preventDefault()
    setIsLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          account_type: accountType,
          company_name: accountType === 'employer' ? companyName : null,
        }
      }
    })

    if (error) {
      console.error("Error signing up:", error)
      setIsLoading(false)
    } else {
      router.push(accountType === 'employer' ? "/app/employer-dashboard" : "/app/profile")
    }
  }

  const handleGoogleSignUp = async (accountType: 'jobseeker' | 'employer') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("Error signing up with Google:", error)
    } else {
      // The user will be redirected to Google for authentication
      // After successful authentication, they'll be redirected back to your app
      // You'll need to handle the redirect in the /auth/callback route
    }
  }

  const renderSignUpForm = (accountType: 'jobseeker' | 'employer') => (
    <div className="mt-8 space-y-6">
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center space-x-2 h-12"
        onClick={() => handleGoogleSignUp(accountType)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
        <span>Sign up with Google</span>
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or Sign up with Email</span>
        </div>
      </div>

      <form onSubmit={(e) => handleEmailSignUp(e, accountType)} className="space-y-4">
        <div>
          <Label htmlFor={`full-name-${accountType}`} className="block text-sm font-medium text-gray-700">
            Full Name
          </Label>
          <Input
            id={`full-name-${accountType}`}
            name="full-name"
            type="text"
            required
            className="mt-1"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        {accountType === 'employer' && (
          <div>
            <Label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
              Company Name
            </Label>
            <Input
              id="company-name"
              name="company-name"
              type="text"
              required
              className="mt-1"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
            />
          </div>
        )}

        <div>
          <Label htmlFor={`email-${accountType}`} className="block text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id={`email-${accountType}`}
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@website.com"
          />
        </div>

        <div>
          <Label htmlFor={`password-${accountType}`} className="block text-sm font-medium text-gray-700">
            Password
          </Label>
          <Input
            id={`password-${accountType}`}
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="min 8 characters"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  )

  return (
    <div className="flex min-h-screen">
      {/* Left side - Decorative content */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-pink-400 via-blue-400 to-indigo-500">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <h2 className="text-5xl font-bold mb-4 text-center">Find the job made for you.</h2>
          <p className="text-xl max-w-md text-center">
            Browse over 130K jobs at top companies and fast-growing startups.
          </p>
        </div>
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-8">
          <div className="bg-yellow-300 rounded-full"></div>
          <div className="bg-blue-500 rounded-lg transform rotate-45"></div>
          <div className="bg-green-400 rounded-lg"></div>
          <div className="bg-red-400 rounded-full"></div>
          <div className="bg-purple-500 rounded-lg transform -rotate-12"></div>
          <div className="bg-indigo-400 rounded-full"></div>
          <div className="bg-pink-400 rounded-lg transform rotate-12"></div>
          <div className="bg-blue-300 rounded-full"></div>
          <div className="bg-green-500 rounded-lg transform -rotate-45"></div>
        </div>
      </div>

      {/* Right side - Sign Up form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <Image src="/placeholder.svg?height=40&width=200" alt="DevFound Logo" width={200} height={40} />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Find your next opportunity!
            </p>
          </div>

          <Tabs defaultValue="jobseeker" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="jobseeker">Job Seeker</TabsTrigger>
              <TabsTrigger value="employer">Employer</TabsTrigger>
            </TabsList>
            <TabsContent value="jobseeker">
              {renderSignUpForm('jobseeker')}
            </TabsContent>
            <TabsContent value="employer">
              {renderSignUpForm('employer')}
            </TabsContent>
          </Tabs>

          <p className="mt-4 text-xs text-center text-gray-600">
            By continuing you accept our{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">terms and conditions</Link>
            {' '}and our{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">privacy policy</Link>.
          </p>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
