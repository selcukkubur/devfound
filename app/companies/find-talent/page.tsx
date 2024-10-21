'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const AnimatedCircle = ({ src, alt, index }: { src: string; alt: string; index: number }) => (
  <div
    className="absolute rounded-full bg-white shadow-lg w-12 h-12 overflow-hidden animate-float"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${index * 0.5}s`,
    }}
  >
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      className="rounded-full"
    />
  </div>
)

const AnimatedCircles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(10)].map((_, i) => (
      <AnimatedCircle
        key={i}
        src={`https://i.pravatar.cc/150?img=${i + 11}`}
        alt={`Profile ${i + 1}`}
        index={i}
      />
    ))}
  </div>
)

const globalStyles = `
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`

export default function FindTalentPage() {
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = globalStyles
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            devfound
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/companies" className="text-gray-600 hover:text-blue-600 transition-colors">Overview</Link>
            <Link href="/companies/find-talent" className="text-blue-600 font-semibold">Find Talent</Link>
            <Link href="/post-job" className="text-gray-600 hover:text-blue-600 transition-colors">Post a Job</Link>
            <Link href="/free-ats" className="text-gray-600 hover:text-blue-600 transition-colors">Free ATS</Link>
            <Link href="/customers" className="text-gray-600 hover:text-blue-600 transition-colors">Customers</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Log in</Link>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">Sign up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Profile Images */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
            Find talent, your way.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with the best candidates for your startup. Streamline your hiring process and build your dream team.
          </p>
          <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors text-lg px-8 py-3">
            Start Sourcing
          </Button>
          <AnimatedCircles />
        </div>
      </section>

      {/* Feature Boxes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800">Source top talent</CardTitle>
                <CardDescription className="text-gray-600">Browse talent and author community</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>100M+ startup-ready candidates</li>
                  <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Powerful search and filtering</li>
                  <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>74% response rate</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors w-full">Start sourcing</Button>
              </CardFooter>
            </Card>
            <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Recruiter Cloud Assisted</CardTitle>
                <CardDescription className="text-blue-100">Let our experts recruit for you</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>100M+ startup-ready candidates</li>
                  <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Powerful search and filtering</li>
                  <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Get daily with the interested ones</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">Schedule a demo</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Connect with Active Talent */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Connect with active & engaged talent</h2>
              <p className="mb-4 text-gray-600">Access 100M+ startup-minded candidates, with 90% engagement rate compared to other job board communities.</p>
              <p className="mb-6 text-gray-600">From YC founders to senior engineers at FAANG companies, you'll find everyone here.</p>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">Start sourcing</Button>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <Image
                src="https://vbzwzmbuftahoanqreww.supabase.co/storage/v1/object/public/images/talent1.jpg"
                alt="Diverse group of professionals"
                width={250}
                height={200}
                className="rounded-lg shadow-lg"
              />
              <Image
                src="https://vbzwzmbuftahoanqreww.supabase.co/storage/v1/object/public/images/talent2.jpg"
                alt="Tech professionals collaborating"
                width={250}
                height={200}
                className="rounded-lg shadow-lg"
              />
              <Image
                src="https://vbzwzmbuftahoanqreww.supabase.co/storage/v1/object/public/images/talent3.jpg"
                alt="Startup team meeting"
                width={250}
                height={200}
                className="rounded-lg shadow-lg"
              />
              <Image
                src="https://vbzwzmbuftahoanqreww.supabase.co/storage/v1/object/public/images/talent4.jpg"
                alt="Developer working on code"
                width={250}
                height={200}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Automated Sourcing Process */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 order-2 md:order-1">
              <div className="flex-1 relative">
                <Image
                  src="https://vbzwzmbuftahoanqreww.supabase.co/storage/v1/object/public/images/automation1.jpg"
                  alt="AI-powered recruitment process"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex-1 order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Let us automate your entire sourcing process</h2>
              <p className="mb-6 text-gray-600">We'll review hundreds of profiles each week and reach out to the best candidates, automatically engage with responses, and set up interviews - all without any work required from you.</p>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">Schedule a demo</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8  text-center text-gray-800">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4 max-w-3xl mx-auto">
            <AccordionItem value="item-1" className="border border-gray-200 rounded-lg">
              <AccordionTrigger className="text-left px-4 py-3 hover:bg-gray-50">What kind of talent will you find on devfound?</AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-600">
                Our global community is primarily tech-focused, with an interest in startups and mission-driven companies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-gray-200 rounded-lg">
              <AccordionTrigger className="text-left px-4 py-3 hover:bg-gray-50">What are the top roles sourced on devfound?</AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-600">
                Software engineers, product managers, product designers, data analysts, marketing, sales, operations, plus a variety of other roles.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-gray-200 rounded-lg">
              <AccordionTrigger className="text-left px-4 py-3 hover:bg-gray-50">What makes our talent different than other job sites?</AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-600">
                Our global pool of candidates offers a strong educational background, direct experience scaling startups of all sizes, and an affinity for flexible work styles.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border border-gray-200 rounded-lg">
              <AccordionTrigger className="text-left px-4 py-3 hover:bg-gray-50">What makes devfound's matching capabilities unique?</AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-600">
                Our community is composed of founders and engaged candidates looking for founder-led teams. We help our job seekers find the best match, faster and more efficiently than any other job site.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-gray-800">For Candidates</h3>
              <ul className="space-y-2">
                <li><Link href="/candidates/overview" className="text-gray-600 hover:text-blue-600 transition-colors">Overview</Link></li>
                <li><Link href="/candidates/startup-jobs" className="text-gray-600 hover:text-blue-600 transition-colors">Startup Jobs</Link></li>
                <li><Link href="/candidates/web3-jobs" className="text-gray-600 hover:text-blue-600 transition-colors">Web3 Jobs</Link></li>
                <li><Link href="/candidates/featured" className="text-gray-600 hover:text-blue-600 transition-colors">Featured</Link></li>
                <li><Link href="/candidates/salary-calculator" className="text-gray-600 hover:text-blue-600 transition-colors">Salary Calculator</Link></li>
                <li><Link href="/candidates/startup-hiring-data" className="text-gray-600 hover:text-blue-600 transition-colors">Startup Hiring Data</Link></li>
                <li><Link href="/candidates/tech-startups" className="text-gray-600 hover:text-blue-600  transition-colors">Tech Startups</Link></li>
                <li><Link href="/candidates/remote" className="text-gray-600 hover:text-blue-600 transition-colors">Remote</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-800">For Recruiters</h3>
              <ul className="space-y-2">
                <li><Link href="/companies" className="text-gray-600 hover:text-blue-600 transition-colors">Overview</Link></li>
                <li><Link href="/companies/recruit-pro" className="text-gray-600 hover:text-blue-600 transition-colors">Recruit Pro</Link></li>
                <li><Link href="/companies/curated" className="text-gray-600 hover:text-blue-600 transition-colors">Curated</Link></li>
                <li><Link href="/companies/recruitercloud" className="text-gray-600 hover:text-blue-600 transition-colors">RecruiterCloud</Link></li>
                <li><Link href="/companies/hire-developers" className="text-gray-600 hover:text-blue-600 transition-colors">Hire Developers</Link></li>
                <li><Link href="/companies/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-800">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link></li>
                <li><Link href="/angellist-venture" className="text-gray-600 hover:text-blue-600 transition-colors">AngelList Venture</Link></li>
                <li><Link href="/help" className="text-gray-600 hover:text-blue-600 transition-colors">Help</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">Terms & Risks</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy & Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">Copyright © 2024 devfound (formerly AngelList Talent). All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
