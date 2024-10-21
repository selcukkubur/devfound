"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, MapPin, DollarSign, Clock, Building, Users, Globe, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function JobDetailPage() {
  const [job, setJob] = useState({
    id: 0,
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    experience: "",
    posted: "",
    applicationDeadline: "",
    description: "",
    responsibilities: [],
    requirements: [],
    benefits: [],
    companyInfo: {
      name: "",
      logo: "",
      description: "",
      size: "",
      founded: "",
      website: "",
    },
  })

  const [isApplying, setIsApplying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching job data
    setTimeout(() => {
      setJob({
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        salary: "$120k - $150k",
        type: "Full-time",
        experience: "5+ years",
        posted: "2 weeks ago",
        applicationDeadline: "2023-07-31",
        description: "We are seeking a talented Senior Frontend Developer to join our innovative team. The ideal candidate will have a strong background in modern web technologies and a passion for creating exceptional user experiences.",
        responsibilities: [
          "Develop and maintain high-quality, responsive web applications",
          "Collaborate with cross-functional teams to define, design, and ship new features",
          "Optimize applications for maximum speed and scalability",
          "Ensure the technical feasibility of UI/UX designs",
          "Identify and correct bottlenecks and fix bugs",
        ],
        requirements: [
          "5+ years of experience in frontend development",
          "Expert knowledge of JavaScript, HTML5, and CSS3",
          "Proficiency in React.js and its core principles",
          "Experience with modern frontend build pipelines and tools",
          "Familiarity with RESTful APIs and GraphQL",
          "Strong understanding of responsive design principles",
          "Excellent problem-solving skills and attention to detail",
        ],
        benefits: [
          "Competitive salary and equity package",
          "Health, dental, and vision insurance",
          "401(k) plan with company match",
          "Flexible work hours and remote work options",
          "Professional development budget",
          "Regular team events and outings",
        ],
        companyInfo: {
          name: "TechCorp Inc.",
          logo: "/placeholder.svg?height=50&width=50",
          description: "TechCorp Inc. is a leading technology company specializing in innovative software solutions. We are dedicated to creating cutting-edge products that transform the way businesses operate.",
          size: "500-1000 employees",
          founded: "2010",
          website: "https://techcorp-example.com",
        },
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleApply = () => {
    setIsApplying(true)
    // Here you would typically handle the application submission
    setTimeout(() => {
      setIsApplying(false)
      alert("Your application has been submitted successfully!")
    }, 1500)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/jobs" className="flex items-center text-primary hover:underline mb-4">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Job Listings
      </Link>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
                  <CardDescription className="text-lg">{job.company}</CardDescription>
                </div>
                <Button onClick={handleApply} disabled={isApplying}>
                  {isApplying ? "Applying..." : "Apply Now"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-4">
                <Badge variant="secondary" className="flex items-center">
                  <Briefcase className="mr-1 h-4 w-4" />
                  {job.type}
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {job.location}
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4" />
                  {job.salary}
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {job.experience}
                </Badge>
              </div>
              <Tabs defaultValue="description">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4 space-y-4">
                  <p>{job.description}</p>
                  <h3 className="text-lg font-semibold">Responsibilities:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="requirements" className="mt-4">
                  <ul className="list-disc pl-5 space-y-2">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="benefits" className="mt-4">
                  <ul className="list-disc pl-5 space-y-2">
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Posted {job.posted} • Application deadline: {job.applicationDeadline}
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
                  <AvatarImage src={job.companyInfo.logo} alt={job.companyInfo.name} />
                  <AvatarFallback>{job.companyInfo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{job.companyInfo.name}</h3>
                  <a href={job.companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    Visit Website
                  </a>
                </div>
              </div>
              <p className="text-sm mb-4">{job.companyInfo.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{job.companyInfo.size}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Founded in {job.companyInfo.founded}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{job.location}</span>
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
                {[
                  { title: "Frontend Developer", company: "WebTech Solutions" },
                  { title: "React Specialist", company: "InnovateSoft" },
                  { title: "UI Engineer", company: "DesignMasters" },
                ].map((similarJob, index) => (
                  <li key={index}>
                    <Link href="#" className="block hover:bg-muted p-2 rounded-md transition-colors">
                      <div className="font-medium">{similarJob.title}</div>
                      <div className="text-sm text-muted-foreground">{similarJob.company}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
