import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

export default function Educations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          You haven't added any education yet. Add your educational background to highlight your qualifications.
        </p>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </CardContent>
    </Card>
  )
}
