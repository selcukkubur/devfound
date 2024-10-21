"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About DevFound.io</h1>
      
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          At DevFound.io, our mission is to connect talented job seekers with innovative companies, creating opportunities for growth and success in the tech industry. We believe in empowering individuals to find their dream jobs while helping companies discover top talent.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside space-y-2">
          <li className="text-lg text-gray-700">Integrity: We uphold the highest standards of integrity in all our actions.</li>
          <li className="text-lg text-gray-700">Innovation: We embrace change and strive for continuous improvement.</li>
          <li className="text-lg text-gray-700">Collaboration: We believe in the power of teamwork and collaboration.</li>
          <li className="text-lg text-gray-700">Diversity: We celebrate diversity and are committed to creating an inclusive environment.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">John Doe</CardTitle>
              <CardDescription>CEO & Founder</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">John is a visionary leader with over 10 years of experience in the tech industry. He is passionate about connecting talent with opportunity.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Jane Smith</CardTitle>
              <CardDescription>CTO</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Jane is a tech enthusiast and expert in software development. She leads our engineering team to build innovative solutions.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Emily Johnson</CardTitle>
              <CardDescription>Head of Marketing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Emily is a marketing guru with a knack for storytelling. She drives our brand strategy and outreach efforts.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-lg text-gray-700 mb-4">
          We would love to hear from you! Whether you have questions, feedback, or just want to connect, feel free to reach out.
        </p>
        <Button variant="outline" onClick={() => window.location.href = "/contact"}>
          Contact Us
        </Button>
      </section>
    </div>
  )
}
