import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Briefcase, DollarSign, Globe, MapPin } from "lucide-react"

export default function CompanyProfile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold">TC</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">TechCorp Inc.</h1>
          <p className="text-gray-600">Innovating for a better tomorrow</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-500" />
          <span>1000-5000 employees</span>
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5 text-gray-500" />
          <span>Series C</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-gray-500" />
          <span>San Francisco, CA</span>
        </div>
      </div>
      <Tabs defaultValue="about" className="space-y-4">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="jobs">Open Roles</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="space-y-4">
          <p>
            TechCorp Inc. is a leading technology company specializing in artificial intelligence and machine learning
            solutions. Our mission is to leverage cutting-edge technology to solve complex problems and improve lives
            around the globe.
          </p>
          <h2 className="text-xl font-semibold">Company Culture</h2>
          <p>
            At TechCorp, we foster a culture of innovation, collaboration, and continuous learning. We believe in
            empowering our employees to take ownership of their work and make a real impact.
          </p>
        </TabsContent>
        <TabsContent value="jobs" className="space-y-4">
          <div className="grid gap-4">
            {["Senior Frontend Developer", "Machine Learning Engineer", "Product Manager", "UX Designer"].map((job) => (
              <div key={job} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{job}</h3>
                <div className="mt-2 flex space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Briefcase className="mr-1 h-4 w-4" />
                    Full-time
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    San Francisco, CA
                  </div>
                </div>
                <Button className="mt-4" variant="outline">
                  View Job
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="benefits" className="space-y-4">
          <h2 className="text-xl font-semibold">Employee Benefits</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Competitive salary and equity packages</li>
            <li>Comprehensive health, dental, and vision insurance</li>
            <li>401(k) matching</li>
            <li>Flexible work hours and remote work options</li>
            <li>Professional development budget</li>
            <li>Generous paid time off</li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  )
}
