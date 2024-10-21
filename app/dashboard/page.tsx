"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from '@supabase/supabase-js'
import { Bell, ChevronDown, Home, User, Briefcase, MessageSquare, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function DashboardPage() {
  const [profileData, setProfileData] = useState({
    full_name: '',
    title: '',
    location: '',
    profile_photo_url: '/placeholder.svg?height=96&width=96',
    job_search_status: '',
  })
  const [appliedJobs, setAppliedJobs] = useState([])
  const [recommendedJobs, setRecommendedJobs] = useState([])
  const [followedStartups, setFollowedStartups] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    fetchUserProfile()
    fetchAppliedJobs()
    fetchRecommendedJobs()
    fetchFollowedStartups()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) throw userError
      if (!user) throw new Error('No authenticated user found')

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error

      if (data) {
        setProfileData(data)
      } else {
        console.log('No profile data found for user')
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
      toast({
        title: "Error",
        description: "Failed to fetch user profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchAppliedJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('applied_jobs')
        .select('*, job:jobs(*)')
        .order('applied_at', { ascending: false })
        .limit(3)

      if (error) throw error

      setAppliedJobs(data || [])
    } catch (error) {
      console.error('Error fetching applied jobs:', error)
      toast({
        title: "Error",
        description: "Failed to fetch applied jobs. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchRecommendedJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .limit(3)

      if (error) throw error

      setRecommendedJobs(data || [])
    } catch (error) {
      console.error('Error fetching recommended jobs:', error)
      toast({
        title: "Error",
        description: "Failed to fetch recommended jobs. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchFollowedStartups = async () => {
    try {
      const { data, error } = await supabase
        .from('followed_startups')
        .select('*, startup:startups(*)')
        .limit(3)

      if (error) throw error

      setFollowedStartups(data || [])
    } catch (error) {
      console.error('Error fetching followed startups:', error)
      toast({
        title: "Error",
        description: "Failed to fetch followed startups. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleJobStatusChange = async (status) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ job_search_status: status })
        .eq('user_id', (await supabase.auth.getUser()).data.user.id)

      if (error) throw error

      setProfileData(prev => ({ ...prev, job_search_status: status }))
      toast({
        title: "Success",
        description: "Job search status updated successfully.",
      })
    } catch (error) {
      console.error('Error updating job search status:', error)
      toast({
        title: "Error",
        description: "Failed to update job search status. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white p-4 border-r hidden lg:block">
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-6">
            <Image src="/placeholder.svg?height=40&width=40&text=W" alt="Logo" width={40} height={40} />
            <span className="ml-2 text-2xl font-bold text-blue-600">devfound</span>
          </div>
          <nav className="flex-1">
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard" className="flex items-center p-2 text-blue-600 bg-blue-50 rounded">
                  <Home className="mr-3 h-5 w-5" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/profile" className="flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
                  <User className="mr-3 h-5 w-5" />
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
                  <Briefcase className="mr-3 h-5 w-5" />
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/messages" className="flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
                  <MessageSquare className="mr-3 h-5 w-5" />
                  Messages
                </Link>
              </li>
              <li>
                <Link href="/discover" className="flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
                  <Search className="mr-3 h-5 w-5" />
                  Discover
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-800">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-800">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </header>

          {/* User Profile Summary */}
          <Card className="bg-white shadow-sm mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileData.profile_photo_url} alt={profileData.full_name} />
                  <AvatarFallback>{profileData.full_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{profileData.full_name}</h2>
                  <p className="text-gray-600">{profileData.title}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Search className="mr-1 h-4 w-4" />
                    {profileData.location}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Search Status */}
          <Card className="bg-white shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">Where are you in your job search?</h2>
                  <p className="text-sm text-gray-500">Keep your job status up-to-date to inform employers of your search.</p>
                </div>
                <Select value={profileData.job_search_status} onValueChange={handleJobStatusChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ready to interview">Ready to interview</SelectItem>
                    <SelectItem value="Actively looking">Actively looking</SelectItem>
                    <SelectItem value="Open to opportunities">Open to opportunities</SelectItem>
                    <SelectItem value="Not interested">Not interested</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card className="bg-white shadow-sm mb-6">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Recommended Jobs</CardTitle>
              <Button variant="link" className="text-sm">Change job preferences</Button>
            </CardHeader>
            <CardContent className="p-6">
              {recommendedJobs.length > 0 ? (
                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <div key={job.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.company}</p>
                        <p className="text-sm text-gray-500">{job.location}</p>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Job</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <Image src="/placeholder.svg?height=200&width=200&text=No+Jobs" width={200} height={200} alt="No jobs" className="mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">We have no job recommendations yet.</h3>
                  <p className="text-sm text-gray-500 mb-4">Start exploring jobs to get personalized recommendations.</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Browse Jobs</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recently Applied Jobs */}
          <Card className="bg-white shadow-sm mb-6">
            <CardHeader>
              <CardTitle>Recently Applied Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              {appliedJobs.length > 0 ? (
                <div className="space-y-4">
                  {appliedJobs.map((application) => (
                    <div key={application.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${application.job.company.charAt(0)}`} alt={application.job.company} />
                          <AvatarFallback>{application.job.company.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{application.job.title}</h3>
                          <p className="text-sm text-gray-500">{application.job.company}</p>
                          <p className="text-sm text-gray-500">{application.job.location}</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">{application.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">You haven't applied to any jobs yet.</p>
              )}
              <Button variant="link" className="mt-4 w-full text-blue-600 hover:text-blue-700">See all applied jobs</Button>
            </CardContent>
          </Card>

          {/* Followed Startups */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Followed Startups</CardTitle>
              <Button variant="link" className="text-sm">Discover Startups</Button>
            </CardHeader>
            <CardContent className="p-6">
              {followedStartups.length > 0 ? (
                <div className="space-y-4">
                  {followedStartups.map((followedStartup) => (
                    <div key={followedStartup.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          
                          <AvatarImage src={followedStartup.startup.logo_url} alt={followedStartup.startup.name} />
                          <AvatarFallback>{followedStartup.startup.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{followedStartup.startup.name}</h3>
                          <p className="text-sm text-gray-500">{followedStartup.startup.industry}</p>
                        </div>
                      </div>
                      <Button variant="outline">View Profile</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <Image src="/placeholder.svg?height=200&width=200&text=No+Startups" width={200} height={200} alt="No startups" className="mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">You have not followed any startups yet!</h3>
                  <p className="text-sm text-gray-500 mb-4">Stay up to date with startups you're interested in by following them.</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Discover Startups</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
