'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function DiscoverPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-blue-600">devfound</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/discover" className="text-gray-800 font-medium">Discover</Link>
              <Link href="/jobs" className="text-gray-600 hover:text-gray-800">Find Jobs</Link>
              <Link href="/companies" className="text-gray-600 hover:text-gray-800">For Recruiters</Link>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800">Log In</Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">Sign Up</Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-gray-800 text-center">Discover</h1>

        {/* Discover Sub-navigation */}
        <nav className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-1">
            {['All', 'Startups', 'Blog', 'Featured Lists'].map((item, index) => (
              <button
                key={item}
                onClick={() => item === 'Startups' ? router.push('/startups') : null}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        {/* Featured Section */}
        <section className="mb-12">
          <div className="bg-blue-600 text-white p-6 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <Image src="/placeholder.svg?height=50&width=50&text=Trophy" alt="Trophy" width={50} height={50} className="mr-4" />
              <h2 className="text-2xl font-bold">Startups of the year 2024</h2>
            </div>
            <Button variant="secondary">View now on Hackerearth!</Button>
          </div>
        </section>

        {/* Featured Content Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 line-clamp-2">Security in the Skies: 5 High Altitude Startups</CardTitle>
            </CardHeader>
            <CardContent>
              <Image src="/placeholder.svg?height=200&width=400&text=Security+Startups" alt="Security Startups" width={400} height={200} className="w-full rounded-md" />
              <p className="mt-2 text-gray-600 line-clamp-3">Explore innovative startups in satellite and balloon technology.</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Space Tech</Badge>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800">Learn More →</Button>
            </CardFooter>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 line-clamp-2">Christie Kim | COO Interview, Grammarly</CardTitle>
            </CardHeader>
            <CardContent>
              <Image src="/placeholder.svg?height=200&width=400&text=Christie+Kim" alt="Christie Kim" width={400} height={200} className="w-full rounded-md" />
              <p className="mt-2 text-gray-600 line-clamp-3">Insights from Grammarly's COO on leadership and innovation.</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Interview</Badge>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800">Learn More →</Button>
            </CardFooter>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 line-clamp-2">5 Startups Merging Tech and Sports</CardTitle>
            </CardHeader>
            <CardContent>
              <Image src="/placeholder.svg?height=200&width=400&text=Tech+and+Sports+Startups" alt="Tech and Sports Startups" width={400} height={200} className="w-full rounded-md" />
              <p className="mt-2 text-gray-600 line-clamp-3">Discover companies revolutionizing the sports industry with technology.</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Sports Tech</Badge>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800">Learn More →</Button>
            </CardFooter>
          </Card>
        </section>

        {/* Find Startups */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Find Startups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Biotechnology</CardTitle>
              </CardHeader>
              <CardContent>
                <Image src="/placeholder.svg?height=150&width=300&text=Biotechnology" alt="Biotechnology" width={300} height={150} className="w-full rounded-md mb-4" />
                <p className="text-gray-600">Discover startups in the biotechnology field</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Link href="/startups/biotechnology">
                  <Button variant="outline">Explore</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">SaaS</CardTitle>
              </CardHeader>
              <CardContent>
                <Image src="/placeholder.svg?height=150&width=300&text=SaaS" alt="SaaS" width={300} height={150} className="w-full rounded-md mb-4" />
                <p className="text-gray-600">Find Software as a Service startups</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Link href="/startups/saas">
                  <Button variant="outline">Explore</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">AI & Machine Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <Image src="/placeholder.svg?height=150&width=300&text=AI+%26+Machine+Learning" alt="AI & Machine Learning" width={300} height={150} className="w-full rounded-md mb-4" />
                <p className="text-gray-600">Explore startups in AI and machine learning</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Link href="/startups/ai-ml">
                  <Button variant="outline">Explore</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Discover Industries */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Discover Industries</h2>
          <div className="flex flex-wrap gap-3">
            {['Workplace', 'Data', 'Design', 'E-commerce', 'Education', 'Fintech', 'Healthcare', 'Real Estate', 'Travel'].map((industry) => (
              <Badge key={industry} variant="outline" className="text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer text-lg py-2 px-4">
                {industry}
              </Badge>
            ))}
          </div>
        </section>

        {/* Featured Lists */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Featured Lists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "5 Space Startups to Watch", category: "Space Tech", image: "Space+Tech", description: "Innovative companies pushing the boundaries of space exploration." },
              { title: "Top 10 AI-Powered Fitness Apps", category: "Health Tech", image: "Fitness+Tech", description: "Revolutionary apps transforming personal fitness with artificial intelligence." },
              { title: "8 Promising Fintech Startups", category: "Fintech", image: "Fintech", description: "Emerging companies disrupting traditional financial services." }
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Image src={`/placeholder.svg?height=200&width=400&text=${item.image}`} alt={item.title} width={400} height={200} className="w-full rounded-t-lg" />
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-3 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-3">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">{item.category}</Badge>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-800">View List →</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* From the Founders */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">From the Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Image src={`/placeholder.svg?height=200&width=400&text=Founder+${i}`} alt={`Founder ${i}`} width={400} height={200} className="w-full rounded-md mb-4" />
                  <h3 className="font-bold text-xl mb-2">From the Founder {i}</h3>
                  <p className="text-gray-600">Insights and advice from successful startup founders</p>
                  <Button variant="ghost" className="mt-4 text-blue-600 hover:text-blue-800">Read More →</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16 bg-blue-50 rounded-lg">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">We have a lot of exciting startup opportunities and candidates</h2>
          <p className="text-2xl mb-8 text-gray-600">— only a few are perfect for you.</p>
          <p className="text-xl mb-10 text-gray-600">We'll help you find the few.</p>
          <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors text-lg px-8 py-3">Get Started</Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 text-gray-800">For Candidates</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Overview</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Startup Jobs</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Salary Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-800">For Recruiters</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Overview</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Recruit</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link></li>
              
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-gray-800">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms & Risks</Link></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-600">&copy; 2024 devfound. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
