"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      alert("Your message has been sent!")
      setIsLoading(false)
      setName("")
      setEmail("")
      setMessage("")
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-start mb-8">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-700 mb-4">
            We would love to hear from you! Please fill out the form below.
          </p>
        </div>
        <div className="w-1/2">
          <img
            src="assets/industry-hr-tech.svg" // Replace with your SVG path
            alt="Talent Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
      
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              Fill out the form below to send us a message.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4">Company Information</h2>
        <p className="text-lg text-gray-700 mb-2">DevFound.io</p>
        <p className="text-lg text-gray-700 mb-2">123 Tech Lane</p>
        <p className="text-lg text-gray-700 mb-2">San Francisco, CA 94105</p>
        <p className="text-lg text-gray-700 mb-2">Email: support@devfound.io</p>
        <p className="text-lg text-gray-700 mb-2">Phone: (123) 456-7890</p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Follow Us</h2>
        <div className="flex space-x-4">
          <a href="https://twitter.com/devfound" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Twitter</Button>
          </a>
          <a href="https://linkedin.com/company/devfound" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">LinkedIn</Button>
          </a>
          <a href="https://facebook.com/devfound" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Facebook</Button>
          </a>
        </div>
      </section>
    </div>
  )
}
