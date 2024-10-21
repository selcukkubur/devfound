'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const allStartups = [
  { id: 1, name: 'HomeLight', description: 'Our vision is a world where every real estate transaction is simple, certain, and satisfying.', industry: 'Real Estate', location: 'San Francisco', logo: '/placeholder.svg?height=40&width=40&text=HL' },
  { id: 2, name: 'Rippling', description: 'HR, IT & Operations. Everything your employees need, in one place.', industry: 'HR Tech', location: 'San Francisco', logo: '/placeholder.svg?height=40&width=40&text=RP' },
  { id: 3, name: 'YipitData', description: 'A remote-first company with employees across the globe. Inc\'s Best Workplaces.', industry: 'Financial Services', location: 'New York City', logo: '/placeholder.svg?height=40&width=40&text=YD' },
  { id: 4, name: 'Pantheon Platform', description: 'Provides website tools, optimization and hosting for developers and marketers.', industry: 'Web Development', location: 'San Francisco', logo: '/placeholder.svg?height=40&width=40&text=PP' },
  { id: 5, name: 'BitcoinTech', description: 'Innovative solutions in the Bitcoin space.', industry: 'Blockchain', location: 'New York City', logo: '/placeholder.svg?height=40&width=40&text=BT' },
  { id: 6, name: 'AI Innovations', description: 'Cutting-edge AI solutions for businesses.', industry: 'AI & Machine Learning', location: 'San Francisco', logo: '/placeholder.svg?height=40&width=40&text=AI' },
  { id: 7, name: 'FinTech Solutions', description: 'Revolutionary financial technology services.', industry: 'FinTech', location: 'London', logo: '/placeholder.svg?height=40&width=40&text=FS' },
  { id: 8, name: 'HealthTech Pioneers', description: 'Advancing healthcare through technology.', industry: 'HealthTech', location: 'Boston', logo: '/placeholder.svg?height=40&width=40&text=HP' },
  { id: 9, name: 'EduTech Innovators', description: 'Transforming education with cutting-edge tech.', industry: 'EdTech', location: 'Chicago', logo: '/placeholder.svg?height=40&width=40&text=ET' },
  { id: 10, name: 'CleanTech Solutions', description: 'Sustainable technology for a greener future.', industry: 'CleanTech', location: 'Seattle', logo: '/placeholder.svg?height=40&width=40&text=CS' },
  { id: 11, name: 'E-commerce Experts', description: 'Next-generation e-commerce platforms.', industry: 'E-commerce', location: 'Los Angeles', logo: '/placeholder.svg?height=40&width=40&text=EE' },
  { id: 12, name: 'CyberGuard', description: 'Advanced cybersecurity solutions for enterprises.', industry: 'Cybersecurity', location: 'Washington D.C.', logo: '/placeholder.svg?height=40&width=40&text=CG' },
]

const industries = ['All', 'Real Estate', 'HR Tech', 'Financial Services', 'Web Development', 'AI & Machine Learning', 'FinTech', 'HealthTech', 'EdTech', 'CleanTech', 'E-commerce', 'Cybersecurity', 'Blockchain'];
const cities = ['All', 'San Francisco', 'New York City', 'Los Angeles', 'Chicago', 'Boston', 'Seattle', 'London', 'Washington D.C.'];

export default function StartupsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStartups, setFilteredStartups] = useState(allStartups);

  useEffect(() => {
    const filtered = allStartups.filter(startup => 
      (selectedIndustry === 'All' || startup.industry === selectedIndustry) &&
      (selectedCity === 'All' || startup.location === selectedCity) &&
      (startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       startup.industry.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredStartups(filtered);
  }, [selectedIndustry, selectedCity, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
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
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Discover Startups</h1>

        {/* Filtering */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input 
            type="search" 
            placeholder="Search startups..." 
            className="w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredStartups.map((startup) => (
            <Card key={startup.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Image src={startup.logo} alt={startup.name} width={40} height={40} className="rounded-full mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold">{startup.name}</h3>
                    <span className="text-sm text-gray-500">{startup.location}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{startup.description}</p>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">{startup.industry}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStartups.length === 0 && (
          <p className="text-center text-gray-600">No startups found matching your criteria.</p>
        )}

        {/* Call to Action */}
        <section className="text-center py-16 bg-blue-50 rounded-lg mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Find Your Next Opportunity</h2>
          <p className="text-xl mb-8 text-gray-600">Discover exciting startups and take your career to the next level.</p>
          <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">Explore Jobs</Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
            <div>
              <h3 className="font-bold mb-4 text-gray-800">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Twitter</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-600">&copy; 2024 devfound. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
