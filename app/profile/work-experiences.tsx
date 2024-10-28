import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

export default function WorkExperiences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          You haven't added any work experience yet. Add your professional history to stand out to recruiters.
        </p>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Work Experience
        </Button>
      </CardContent>
    </Card>
  )
}
