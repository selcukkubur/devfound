"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Briefcase, MapPin, DollarSign, Search, Home, User, MessageSquare, Bell, Settings, ChevronDown, Clock, Building, Users, Globe, ChevronLeft } from "lucide-react"

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isRemoteOnly, setIsRemoteOnly] = useState(false)
  const [jobType, setJobType] = useState("All Types")
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [isApplying, setIsApplying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [searchTerm, isRemoteOnly, jobType])

  const fetchJobs = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .rpc('search_job_posts', { 
        search_term: searchTerm, 
        remote_only: isRemoteOnly, 
        job_type: jobType 
      })

    if (error) {
      console.error('Error fetching jobs:', error)
    } else {
      setJobs(data)
    }
    setIsLoading(false)
  }

  const handleJobClick = async (jobId) => {
    const { data, error } = await supabase
      .from('job_posts')
      .select('*')
      .eq('id', jobId)
      .single()

    if (error) {
      console.error('Error fetching job details:', error)
    } else {
      setSelectedJob(data)
    }
  }

  const handleApply = () => {
    setIsApplying(true)
    setTimeout(() => {
      setIsApplying(false)
      alert("Your application has been submitted successfully!")
      setSelectedJob(null)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
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
                <Link href="/dashboard" className="flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
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
                <Link href="/jobs" className="flex items-center p-2 text-blue-600 bg-blue-50 rounded">
                  <Briefcase className="mr-3 h-5 w-5" />
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs/applied" className="flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
                  <Briefcase className="mr-3 h-5 w-5" />
                  Applied
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
          <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Search for jobs</h1>
          
          <Tabs defaultValue="browse" className="mb-4">
            <TabsList>
              <TabsTrigger value="browse">Browse all</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="hidden">Hidden</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Input
              placeholder="Add a job title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[300px]"
            />
            <div className="flex items-center">
              <Checkbox
                id="remote-only"
                checked={isRemoteOnly}
                onCheckedChange={setIsRemoteOnly}
              />
              <label htmlFor="remote-only" className="ml-2 text-sm text-gray-700">Remote only</label>
            </div>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="text-gray-700">
              Filters <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {isLoading ? (
            <p className="text-center text-gray-600">Loading jobs...</p>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start mb-4">
                      <Image src={job.company_logo || "/placeholder.svg?height=40&width=40&text=C"} alt={job.company} width={40} height={40} className="rounded-full mr-3" />
                      <div>
                        <h2 className="text-lg font-semibold">{job.company}</h2>
                        <p className="text-sm text-gray-600">{job.company_description}</p>
                        <p className="text-xs text-gray-500">{job.company_size}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-t">
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.location}</p>
                        <p className="text-sm text-gray-600">{job.salary}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">{new Date(job.posted_date).toLocaleDateString()}</p>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Save</Button>
                          <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleJobClick(job.id)}>Learn more</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {jobs.length === 0 && !isLoading && (
            <p className="text-center text-gray-600">No jobs found matching your criteria.</p>
          )}

          {/* Call to Action */}
          <section className="text-center py-16 bg-blue-50 rounded-lg mt-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Find Your Next Opportunity</h2>
            <p className="text-xl mb-8 text-gray-600">Discover exciting jobs and take your career to the next level.</p>
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">Explore More Jobs</Button>
          </section>
        </div>
      </main>

      {/* Job Detail Dialog */}
      <Dialog open={selectedJob !== null} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-4xl">
          <DialogClose className="absolute right-4 top-4" />
          {selectedJob && (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-bold">{selectedJob.title}</CardTitle>
                        <CardDescription className="text-lg">{selectedJob.company}</CardDescription>
                      </div>
                      <Button onClick={handleApply} disabled={isApplying} className="bg-blue-600 text-white hover:bg-blue-700">
                        {isApplying ? "Applying..." : "Apply Now"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <Badge variant="secondary" className="flex items-center bg-blue-100 text-blue-800">
                        <Briefcase className="mr-1 h-4 w-4" />
                        {selectedJob.type}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center bg-blue-100 text-blue-800">
                        <MapPin className="mr-1 h-4 w-4" />
                        {selectedJob.location}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center bg-blue-100 text-blue-800">
                        <DollarSign className="mr-1 h-4 w-4" />
                        {selectedJob.salary}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center bg-blue-100 text-blue-800">
                        <Clock className="mr-1 h-4 w-4" />
                        {selectedJob.experience}
                      </Badge>
                    </div>
                    <Tabs defaultValue="description">
                      <TabsList>
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="requirements">Requirements</TabsTrigger>
                        <TabsTrigger value="benefits">Benefits</TabsTrigger>
                      </TabsList>
                      <TabsContent value="description" className="mt-4 space-y-4">
                        <p>{selectedJob.description}</p>
                        <h3 className="text-lg font-semibold">Responsibilities:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {selectedJob.responsibilities && selectedJob.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </TabsContent>
                      <TabsContent value="requirements" className="mt-4">
                        <ul className="list-disc pl-5 space-y-2">
                          {selectedJob.requirements && selectedJob.requirements.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </TabsContent>
                      <TabsContent value="benefits" className="mt-4">
                        <ul className="list-disc pl-5 space-y-2">
                          {selectedJob.benefits && selectedJob.benefits.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Posted {new Date(selectedJob.posted_date).toLocaleDateString()} • Application deadline: {selectedJob.application_deadline}
                    </p>
                  </CardFooter>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Company Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={selectedJob.company_logo || "/placeholder.svg?height=50&width=50&text=C"} alt={selectedJob.company} />
                        <AvatarFallback>{selectedJob.company.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedJob.company}</h3>
                        <a href={selectedJob.company_website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          Visit Website
                        </a>
                      </div>
                    </div>
                    <p className="text-sm mb-4">{selectedJob.company_description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{selectedJob.company_size}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{selectedJob.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Similar Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {jobs.slice(0, 3).map((similarJob) => (
                        <li key={similarJob.id}>
                          <Link href="#" className="block hover:bg-gray-100 p-2 rounded-md transition-colors" onClick={() => handleJobClick(similarJob.id)}>
                            <div className="font-medium">{similarJob.title}</div>
                            <div className="text-sm text-gray-600">{similarJob.company}</div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
