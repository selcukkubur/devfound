"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, FileText, BarChart, Search, Edit, Trash2, Eye } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function EmployerDashboard() {
  const [jobPostings, setJobPostings] = useState([
    { id: 1, title: "Senior Frontend Developer", applicants: 45, status: "Active" },
    { id: 2, title: "Full Stack Engineer", applicants: 32, status: "Active" },
    { id: 3, title: "UX Designer", applicants: 18, status: "Active" },
    { id: 4, title: "Product Manager", applicants: 27, status: "Paused" },
  ])

  const [applicants, setApplicants] = useState([
    { id: 1, name: "John Doe", job: "Senior Frontend Developer", date: "2023-06-15", status: "New" },
    { id: 2, name: "Jane Smith", job: "Full Stack Engineer", date: "2023-06-14", status: "Reviewed" },
    { id: 3, name: "Bob Johnson", job: "UX Designer", date: "2023-06-13", status: "Interviewed" },
    { id: 4, name: "Alice Brown", job: "Product Manager", date: "2023-06-12", status: "Offered" },
    { id: 5, name: "Charlie Wilson", job: "Senior Frontend Developer", date: "2023-06-11", status: "Rejected" },
  ])

  const analyticsData = [
    { name: 'Jan', applicants: 40, interviews: 24 },
    { name: 'Feb', applicants: 30, interviews: 13 },
    { name: 'Mar', applicants: 20, interviews: 8 },
    { name: 'Apr', applicants: 27, interviews: 15 },
    { name: 'May', applicants: 18, interviews: 12 },
    { name: 'Jun', applicants: 23, interviews: 17 },
  ]

  const handleDeleteJob = (id) => {
    setJobPostings(jobPostings.filter(job => job.id !== id))
  }

  const handleToggleJobStatus = (id) => {
    setJobPostings(jobPostings.map(job => 
      job.id === id ? { ...job, status: job.status === "Active" ? "Paused" : "Active" } : job
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Job Postings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobPostings.length}</div>
            <p className="text-xs text-muted-foreground">
              {jobPostings.filter(job => job.status === "Active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicants.length}</div>
            <p className="text-xs text-muted-foreground">
              {applicants.filter(app => app.status === "New").length} new
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applicants.filter(app => app.status === "Interviewed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offer Acceptance Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="job-postings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="job-postings">Job Postings</TabsTrigger>
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="job-postings" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Job Postings</h2>
            <Button>
              <Briefcase className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobPostings.map(job => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.applicants} applicants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-sm ${
                      job.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {job.status}
                    </span>
                    <div className="space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleToggleJobStatus(job.id)}>
                        {job.status === "Active" ? <Eye className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteJob(job.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="applicants" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Applicants</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied For</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applicants.map(applicant => (
                  <tr key={applicant.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{applicant.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{applicant.job}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{applicant.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        applicant.status === "New" ? "bg-green-100 text-green-800" :
                        applicant.status === "Reviewed" ? "bg-yellow-100 text-yellow-800" :
                        applicant.status === "Interviewed" ? "bg-blue-100 text-blue-800" :
                        applicant.status === "Offered" ? "bg-purple-100 text-purple-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Recruitment Analytics</h2>
          <Card>
            <CardHeader>
              <CardTitle>Application and Interview Trends</CardTitle>
              <CardDescription>Number of applicants and interviews over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="applicants" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="interviews" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
