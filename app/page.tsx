import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Users, Zap, BarChart, Calendar } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            devfound
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/discover" className="text-gray-600 hover:text-blue-600 transition-colors">Discover</Link>
            <Link href="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors">Jobs</Link>
            <Link href="/companies" className="text-gray-600 hover:text-blue-600 transition-colors">Companies</Link>
          </nav>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/signin" className="text-gray-600 hover:text-blue-600 transition-colors">
              Log in
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
            Find what's next
          </h1>
          <div className="max-w-2xl mx-auto mb-8">
            <Input type="text" placeholder="Search jobs, companies, or keywords" className="w-full" />
          </div>
          <p className="text-xl mb-8 text-gray-600">Where startups and job seekers connect</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/companies">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">Find your next hire</Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">Find your next job</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2">8M+</h2>
              <p className="text-blue-100">Matches made</p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2">150K+</h2>
              <p className="text-blue-100">Startup jobs</p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2">10M+</h2>
              <p className="text-blue-100">Candidates</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {['Postmates', 'Plaid', 'Airtable', 'Nerdwallet', 'Adonis'].map((company) => (
              <div key={company} className="text-blue-100 hover:text-white transition-colors">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4 text-gray-800">Why job seekers love us</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-2 text-2xl">🚀</span>
                    <p className="text-gray-600">Connect directly with founders and hiring managers</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-2xl">💼</span>
                    <p className="text-gray-600">Get salary and equity upfront</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-2xl">🔍</span>
                    <p className="text-gray-600">Find salary and equity information for thousands of jobs</p>
                  </li>
                </ul>
                <Link href="/app/profile">
                  <Button className="mt-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors">Learn more</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4 text-gray-800">Why recruiters love us</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-2 text-2xl">🎯</span>
                    <p className="text-gray-600">High-quality candidates, vetted by our team</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-2xl">⚡</span>
                    <p className="text-gray-600">Everything you need to kickstart your recruiting</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-2xl">📊</span>
                    <p className="text-gray-600">Powerful tools to help you manage and grow your pipeline</p>
                  </li>
                </ul>
                <Link href="/app/employer-dashboard">
                  <Button className="mt-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors">Learn more</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Promotional Sections */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4 text-gray-800">Let us show you off</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-gray-600">
                  We've selected 10 top startups across 10 trending industries to showcase as we close out 2024. We selected these teams based on their potential to not only succeed, but to make a lasting impact.
                </CardDescription>
                <Link href="/app/featured-startups">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">Explore our 10 of 10</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-100 to-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4 text-gray-800">Know your worth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-gray-600">
                  Use our salary calculator to know your market value and negotiate better offers.
                </CardDescription>
                <Link href="/app/salary-calculator">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">Calculate your salary</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">From the blog</h2>
          <div className="space-y-8">
            {[
              { title: "18 Innovative Space Startups Hiring Now", category: "Job Collection", slug: "space-startups-hiring" },
              { title: "20 Women-Led Startups Expanding Their Remote Teams in 2024", category: "Job Collection", slug: "women-led-startups-2024" },
              { title: "Why Naval Ravikant Thinks Remote Work Is The Future", category: "Blog Post", slug: "naval-ravikant-remote-work" },
              { title: "19 Hot Crypto Startups Hiring Remotely in 2024", category: "Job Collection", slug: "crypto-startups-hiring-2024" },
              { title: "30 Questions to Ask Before Joining a Startup", category: "Blog Post", slug: "questions-before-joining-startup" },
              { title: "The Truth About Finding Your First Engineering Job", category: "Blog Post", slug: "first-engineering-job-truth" },
            ].map((post, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <CardDescription className="text-sm text-gray-500">{post.category}</CardDescription>
                    <CardTitle className="text-xl font-semibold text-gray-800">{post.title}</CardTitle>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">Read more</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">For Candidates</h4>
              <ul className="space-y-2">
                <li><Link href="/app/profile" className="hover:text-blue-200 transition-colors">Overview</Link></li>
                <li><Link href="/jobs" className="hover:text-blue-200 transition-colors">Startup Jobs</Link></li>
                <li><Link href="/app/jobs?category=web3" className="hover:text-blue-200 transition-colors">Web3 Jobs</Link></li>
                <li><Link href="/app/featured-startups" className="hover:text-blue-200 transition-colors">Featured</Link></li>
                <li><Link href="/app/salary-calculator" className="hover:text-blue-200 transition-colors">Salary Calculator</Link></li>
                <li><Link href="/app/hiring-data" className="hover:text-blue-200 transition-colors">Startup Hiring Data</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Recruiters</h4>
              <ul className="space-y-2">
                <li><Link href="/app/employer-dashboard" className="hover:text-blue-200 transition-colors">Overview</Link></li>
                <li><Link href="/app/post-job" className="hover:text-blue-200 transition-colors">Recruit</Link></li>
                <li><Link href="/app/curated-candidates" className="hover:text-blue-200 transition-colors">Curated</Link></li>
                <li><Link href="/app/recruiter-cloud" className="hover:text-blue-200 transition-colors">RecruiterCloud</Link></li>
                <li><Link href="/app/hire-developers" className="hover:text-blue-200 transition-colors">Hire Developers</Link></li>
                <li><Link href="/pricing" className="hover:text-blue-200 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-blue-200 transition-colors">About</Link></li>
                <li><Link href="/angellist-venture" className="hover:text-blue-200 transition-colors">AngelList Venture</Link></li>
                <li><Link href="/help" className="hover:text-blue-200 transition-colors">Help</Link></li>
                <li><Link href="/blog" className="hover:text-blue-200 transition-colors">Blog</Link></li>
                <li><Link href="/terms" className="hover:text-blue-200 transition-colors">Terms & Risks</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-200 transition-colors">Privacy & Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-blue-500">
            <p className="mb-4 md:mb-0">&copy; 2024 DevFound Network, Inc. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com/devfound" className="text-white hover:text-blue-200 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0  01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="https://github.com/devfound" className="text-white hover:text-blue-200 transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
