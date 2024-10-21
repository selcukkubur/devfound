import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Calendar } from 'lucide-react'

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            devfound
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/companies" className="text-blue-600 font-semibold">Overview</Link>
            <Link href="/companies/find-talent" className="text-gray-600 hover:text-blue-600 transition-colors">Find Talent</Link>
            <Link href="/post-job" className="text-gray-600 hover:text-blue-600 transition-colors">Post a Job</Link>
            <Link href="/free-ats" className="text-gray-600 hover:text-blue-600 transition-colors">Free ATS</Link>
            <Link href="/customers" className="text-gray-600 hover:text-blue-600 transition-colors">Customers</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/signin" className="text-gray-600 hover:text-blue-600 transition-colors">
              Sign In
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
              The all-in-one platform to find, connect & hire your team
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Instantly access a talent pool of 10M+ candidates, connect with top talent, and streamline your hiring process.
            </p>
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Get started for free
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center space-x-8 md:space-x-16 text-center">
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-2 text-blue-600">10M+</h2>
              <p className="text-gray-600">active candidates</p>
            </div>
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-2 text-blue-600">25k+</h2>
              <p className="text-gray-600">companies</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2 text-blue-600">100k+</h2>
              <p className="text-gray-600">jobs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Access Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image src="/placeholder.svg?height=400&width=600&text=Talent+Pool" alt="Talent pool illustration" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Instant access to a talent pool of 10M+</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Verified candidates</h3>
                    <p className="text-gray-600">Our rigorous verification process ensures you're connecting with genuine, qualified professionals.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Diverse talent pool</h3>
                    <p className="text-gray-600">Access candidates from various industries, skill sets, and experience levels to find your perfect match.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">AI-powered matching</h3>
                    <p className="text-gray-600">Our advanced algorithms connect you with candidates who best fit your job requirements and company culture.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* High Exposure Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">High exposure, great connection</h2>
              <p className="text-gray-600 mb-6">
                Reach millions of active job seekers and passive candidates. Our platform ensures your job postings get maximum visibility, increasing your chances of finding the perfect hire.
              </p>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-100">
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image src="/placeholder.svg?height=400&width=600&text=High+Exposure" alt="High exposure illustration" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Make a Great First Impression Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image src="/placeholder.svg?height=400&width=600&text=First+Impression" alt="Great first impression illustration" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Make a great first impression</h2>
              <p className="text-gray-600 mb-6">
                Showcase your company culture, values, and opportunities with our customizable company profiles. Attract top talent by highlighting what makes your organization unique.
              </p>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-100">
                Create company profile <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ATS Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">A 100% free, lightweight ATS</h2>
              <p className="text-gray-600 mb-6">
                Streamline your hiring process with our built-in Applicant Tracking System. Manage applications, track candidate progress, and collaborate with your team - all in one place.
              </p>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-100">
                Explore ATS features <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image src="/placeholder.svg?height=400&width=600&text=ATS+Dashboard" alt="ATS dashboard" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Automate Sourcing Section */}
      <section className="py-20 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image src="/placeholder.svg?height=400&width=600&text=Automated+Sourcing" alt="Automated sourcing illustration" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-6">Let us automate your entire sourcing process</h2>
              <p className="text-xl mb-8">
                Save time and resources by leveraging our AI-powered sourcing tools. Focus on what matters most - building great teams and growing your business.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get started now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Flexible Solutions Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Flexible solutions for every stage of your hiring journey</h2>
              <p className="text-gray-600 mb-6">
                Whether you're a startup looking to make your first hire or an enterprise scaling your team, we have tailored solutions to meet your needs.
              </p>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Schedule a call <Calendar className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image src="/placeholder.svg?height=400&width=600&text=Flexible+Solutions" alt="Flexible solutions illustration" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-600">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                question: "How does devfound differ from other job boards?",
                answer: "devfound is more than just a job board. We offer an end-to-end hiring solution with AI-powered matching, applicant tracking, and advanced analytics to streamline your entire recruitment process."
              },
              {
                question: "Is devfound suitable for companies of all sizes?",
                answer: "Whether you're a startup looking for your first hire or a large corporation filling multiple positions, our platform scales to meet your needs."
              },
              {
                question: "How does the pricing work?",
                answer: "We offer flexible pricing plans to suit different company sizes and hiring needs. You can start with our free plan and upgrade as your hiring needs grow."
              },
              {
                question: "Can I integrate devfound with my existing HR tools?",
                answer: "Yes, devfound offers integrations with popular HRIS and ATS systems. Our API also allows for custom integrations to fit your specific workflow."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{faq.answer}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-gray-600 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4  text-gray-800">For Candidates</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Overview</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Startup Jobs</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Featured</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Salary Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">For Recruiters</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Overview</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Recruit</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Hire Developers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-blue-600 transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Help</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Terms & Risks</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p>&copy; 2024 devfound. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
