import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, MapPin, DollarSign, Clock, Building, Users, Globe } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface JobDetailModalProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    experience: string;
    posted: string;
    applicationDeadline: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    companyInfo: {
      name: string;
      logo: string;
      description: string;
      size: string;
      founded: string;
      website: string;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobDetailModal({ job, isOpen, onClose }: JobDetailModalProps) {
  const [isApplying, setIsApplying] = useState(false)

  if (!job || !isOpen) {
    return null;
  }

  const handleApply = () => {
    setIsApplying(true)
    // Here you would typically handle the application submission
    setTimeout(() => {
      setIsApplying(false)
      alert("Your application has been submitted successfully!")
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <button onClick={onClose} className="float-right text-gray-500 hover:text-gray-700">
            Close
          </button>
          <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
          <p className="text-gray-600 mb-4">{job.company}</p>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold">{job?.title}</CardTitle>
                      <CardDescription className="text-lg">{job?.company}</CardDescription>
                    </div>
                    <Button onClick={handleApply} disabled={isApplying}>
                      {isApplying ? "Applying..." : "Apply Now"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      <Briefcase className="mr-1 h-4 w-4" />
                      {job?.type}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job?.location}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      <DollarSign className="mr-1 h-4 w-4" />
                      {job?.salary}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      <Clock className="mr-1 h-4 w-4" />
                      {job?.experience}
                    </span>
                  </div>
                  <Tabs defaultValue="description">
                    <TabsList>
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="requirements">Requirements</TabsTrigger>
                      <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-4 space-y-4">
                      <p>{job?.description}</p>
                      <h3 className="text-lg font-semibold">Responsibilities:</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {job?.responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="requirements" className="mt-4">
                      <ul className="list-disc pl-5 space-y-2">
                        {job?.requirements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="benefits" className="mt-4">
                      <ul className="list-disc pl-5 space-y-2">
                        {job?.benefits.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Posted {job?.posted} • Application deadline: {job?.applicationDeadline}
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
                      <AvatarImage src={job?.companyInfo?.logo} alt={job?.companyInfo?.name} />
                      <AvatarFallback>{job?.companyInfo?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{job?.companyInfo?.name}</h3>
                      <a href={job?.companyInfo?.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                        Visit Website
                      </a>
                    </div>
                  </div>
                  <p className="text-sm mb-4">{job?.companyInfo?.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{job?.companyInfo?.size}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Founded in {job?.companyInfo?.founded}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{job?.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
