"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Briefcase, MapPin, Clock, Home, User, MessageSquare, Search, Bell, Settings, PlusCircle, Upload, FileIcon, Edit, Check, X, Trash2 } from "lucide-react"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    full_name: '',
    title: '',
    location: '',
    years_of_experience: 0,
    profile_photo_url: '/placeholder.svg?height=100&width=100',
    looking_for: '',
    achievements: '',
    skills: [],
    education: [],
    experience: [],
    resume_file_url: '',
    video_resume_url: '',
    preferred_job_type: '',
    preferred_locations: [],
    desired_salary: '',
    desired_salary_currency: '',
    job_search_status: '',
    work_authorization: '',
    preferred_company_sizes: [],
    job_importance: [],
    remote_work_preference: '',
    interested_industries: [],
  })

  const [editMode, setEditMode] = useState({
    looking_for: false,
    achievements: false,
    skills: false,
    education: false,
    experience: false,
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const { toast } = useToast()

  useEffect(() => {
    fetchUserProfile()
  }, [])

  useEffect(() => {
    setUploadStatus('idle')
  }, [imageFile])

  const fetchUserProfile = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) throw userError
      if (!user) throw new Error('No authenticated user found')

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error

      if (data) {
        setProfileData(data)
      } else {
        console.log('No profile data found for user')
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
      toast({
        title: "Error",
        description: "Failed to fetch user profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'years_of_experience' || name === 'desired_salary') {
      const numValue = value === '' ? null : Number(value)
      setProfileData(prev => ({ ...prev, [name]: numValue }))
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (name: string, value: string, isChecked: boolean) => {
    setProfileData(prev => ({
      ...prev,
      [name]: isChecked
        ? [...prev[name], value]
        : prev[name].filter((item: string) => item !== value)
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const uploadImage = async () => {
    if (!imageFile) return null

    setUploadStatus('uploading')

    try {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `profile-pics/${fileName}`

      // Check file size (example: 5MB limit)
      if (imageFile.size > 5 * 1024 * 1024) {
        throw new Error('File size exceeds 5MB limit')
      }

      const { data, error: uploadError } = await supabase.storage
        .from('user-files')
        .upload(filePath, imageFile)

      if (uploadError) {
        console.error('Upload error details:', JSON.stringify(uploadError, null, 2))
        throw uploadError
      }

      if (!data) {
        throw new Error('Upload successful but no data returned')
      }

      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from('user-files')
        .getPublicUrl(filePath)

      if (urlError) {
        console.error('URL error details:', JSON.stringify(urlError, null, 2))
        throw urlError
      }

      setUploadStatus('success')
      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      if (error instanceof Error) {
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
      } else {
        console.error('Unknown error type:', typeof error, JSON.stringify(error, null, 2))
      }
      setUploadStatus('error')
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) {
        console.error('User error details:', JSON.stringify(userError, null, 2))
        throw userError
      }
      if (!user) throw new Error('No authenticated user found')

      let updatedProfileData = { ...profileData }

      if (imageFile) {
        const publicUrl = await uploadImage()
        if (publicUrl) {
          updatedProfileData.profile_photo_url = publicUrl
        }
      }

      const { error } = await supabase
        .from('user_profiles')
        .upsert({ 
          user_id: user.id,
          ...updatedProfileData
        }, { 
          onConflict: 'user_id' 
        })

      if (error) {
        console.error('Upsert error details:', JSON.stringify(error, null, 2))
        throw error
      }

      setProfileData(updatedProfileData)
      await fetchUserProfile()
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      if (error instanceof Error) {
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
      } else {
        console.error('Unknown error type:', typeof error, JSON.stringify(error, null, 2))
      }
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fileType: 'resume' | 'video') => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const fileName = `${fileType}/${Date.now()}_${file.name}`
        const { data, error } = await supabase.storage
          .from('user-files')
          .upload(fileName, file)

        if (error) throw error

        const { data: { publicUrl }, error: urlError } = supabase.storage
          .from('user-files')
          .getPublicUrl(fileName)

        if (urlError) throw urlError

        setProfileData(prev => ({
          ...prev,
          [`${fileType}_file_url`]: publicUrl
        }))

        toast({
          title: "Success",
          description: `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} uploaded successfully.`,
        })
      } catch (error) {
        console.error(`Error uploading ${fileType}:`, error)
        toast({
          title: "Error",
          description: `Failed to upload ${fileType}. Please try again.`,
          variant: "destructive",
        })
      }
    }
  }

  const toggleEditMode = (field: string) => {
    setEditMode(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSkillAdd = (skill: string) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
    }
  }

  const handleSkillRemove = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  const handleEducationChange = (index: number, field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const handleEducationAdd = () => {
    setProfileData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', year: '' }]
    }))
  }

  const handleEducationRemove = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }))
  }

  const handleExperienceChange = (index: number, field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const handleExperienceAdd = () => {
    setProfileData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', start_date: '', end_date: '', description: '' }]
    }))
  }

  const handleExperienceRemove = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white p-4 border-r hidden lg:block">
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-6">
            <Image src="/placeholder.svg?height=40&width=40&text=W" alt="Logo" width={40} height={40} />
            <span className="ml-2 text-2xl font-bold text-blue-600">devfound</span>
          </div>
          <nav className="flex-1">
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard" className="flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
                  <Home className="mr-3 h-5 w-5" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/profile" className="flex items-center p-2 text-blue-600 bg-blue-50 rounded">
                  <User className="mr-3 h-5 w-5" />
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
                  <Briefcase className="mr-3 h-5 w-5" />
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/messages" className="flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
                  <MessageSquare className="mr-3 h-5 w-5" />
                  Messages
                </Link>
              </li>
              <li>
                <Link href="/discover" className="flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
                  <Search className="mr-3 h-5 w-5" />
                  Discover
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Edit your devfound profile</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileData.profile_photo_url} alt={profileData.full_name} />
                  <AvatarFallback>{profileData.full_name.charAt(0)}</AvatarFallback>
                
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{profileData.full_name}</h2>
                  <p className="text-gray-600">{profileData.title}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <MapPin className="mr-1 h-4 w-4" />
                    {profileData.location}
                    <span className="mx-2">•</span>
                    <Clock className="mr-1 h-4 w-4" />
                    {profileData.years_of_experience} years of exp
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="profile-photo" className="cursor-pointer">
                      <div className="flex items-center space-x-2 text-blue-500">
                        <Upload size={20} />
                        <span>Upload new photo</span>
                      </div>
                    </Label>
                    <Input 
                      id="profile-photo" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                    {imageFile && (
                      <p className="text-sm text-gray-500 mt-1">
                        {imageFile.name}
                        {uploadStatus === 'uploading' && ' (Uploading...)'}
                        {uploadStatus === 'success' && ' (Upload successful)'}
                        {uploadStatus === 'error' && ' (Upload failed)'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="resume">Resume / CV</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="culture">Culture</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>What recruiters will see</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">Looking for</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleEditMode('looking_for')}
                          >
                            {editMode.looking_for ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                        </div>
                        {editMode.looking_for ? (
                          <Textarea
                            name="looking_for"
                            value={profileData.looking_for}
                            onChange={handleInputChange}
                            className="mt-2"
                          />
                        ) : (
                          <p className="text-gray-600">{profileData.looking_for}</p>
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">Achievements</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleEditMode('achievements')}
                          >
                            {editMode.achievements ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                        </div>
                        {editMode.achievements ? (
                          <Textarea
                            name="achievements"
                            value={profileData.achievements}
                            onChange={handleInputChange}
                            className="mt-2"
                          />
                        ) : (
                          <p className="text-gray-600">{profileData.achievements}</p>
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">Skills</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleEditMode('skills')}
                          >
                            {editMode.skills ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                              {skill}
                              {editMode.skills && (
                                <button
                                  className="ml-1 text-xs"
                                  onClick={() => handleSkillRemove(skill)}
                                >
                                  ×
                                </button>
                              )}
                            </Badge>
                          ))}
                        </div>
                        {editMode.skills && (
                          <Input
                            className="mt-2"
                            placeholder="Add a skill and press Enter"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                const target = e.target as HTMLInputElement
                                handleSkillAdd(target.value)
                                target.value = ''
                              }
                            }}
                          />
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">Education</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleEditMode('education')}
                          >
                            {editMode.education ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                        </div>
                        {editMode.education ? (
                          <div className="space-y-4">
                            {profileData.education.map((edu, index) => (
                              <div key={index} className="space-y-2">
                                <Input
                                  placeholder="School"
                                  value={edu.school}
                                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                                />
                                <Input
                                  placeholder="Degree"
                                  value={edu.degree}
                                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                />
                                <Input
                                  placeholder="Year"
                                  value={edu.year}
                                  onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEducationRemove(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleEducationAdd}
                            >
                              <PlusCircle className="h-4 w-4 mr-2" />
                              Add Education
                            </Button>
                          </div>
                        ) : (
                          profileData.education.map((edu: any, index: number) => (
                            <div key={index} className="mb-2">
                              <p className="font-medium">{edu.school}</p>
                              <p className="text-sm text-gray-500">{edu.degree}, {edu.year}</p>
                            </div>
                          ))
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">Experience</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleEditMode('experience')}
                          >
                            {editMode.experience ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                        </div>
                        {editMode.experience ? (
                          <div className="space-y-4">
                            {profileData.experience.map((exp, index) => (
                              <div key={index} className="space-y-2">
                                <Input
                                  placeholder="Title"
                                  value={exp.title}
                                  onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                                />
                                <Input
                                  placeholder="Company"
                                  value={exp.company}
                                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                />
                                <Input
                                  placeholder="Start Date"
                                  value={exp.start_date}
                                  onChange={(e) => handleExperienceChange(index, 'start_date', e.target.value)}
                                />
                                <Input
                                  placeholder="End Date"
                                  value={exp.end_date}
                                  onChange={(e) => handleExperienceChange(index, 'end_date', e.target.value)}
                                />
                                <Textarea
                                  placeholder="Description"
                                  value={exp.description}
                                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleExperienceRemove(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleExperienceAdd}
                            >
                              <PlusCircle className="h-4 w-4 mr-2" />
                              Add Experience
                            </Button>
                          </div>
                        ) : (
                          profileData.experience.map((exp: any, index: number) => (
                            <div key={index} className="mb-2">
                              <p className="font-medium">{exp.title}</p>
                              <p className="text-sm text-gray-500">{exp.company} • {exp.start_date} to {exp.end_date || 'Present'}</p>
                              <p className="text-sm text-gray-600">{exp.description}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          value={profileData.full_name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={profileData.title}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={profileData.location}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="years_of_experience">Years of Experience</Label>
                        <Input
                          id="years_of_experience"
                          name="years_of_experience"
                          type="number"
                          value={profileData.years_of_experience ?? ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resume">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume / CV</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Upload Resume</Label>
                        <div className="mt-2">
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileUpload(e, 'resume')}
                          />
                        </div>
                      </div>
                      {profileData.resume_file_url && (
                        <div className="flex items-center space-x-2">
                          <FileIcon className="h-6 w-6" />
                          <span>{profileData.resume_file_url.split('/').pop()}</span>
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm" onClick={() => 
                            handleSelectChange('resume_file_url', '')}>Remove</Button>
                        </div>
                      )}
                      <div>
                        <Label>Video Resume</Label>
                        <div className="mt-2">
                          <Input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleFileUpload(e, 'video')}
                          />
                        </div>
                      </div>
                      {profileData.video_resume_url && (
                        <div>
                          <video controls className="mt-2 w-full max-w-md">
                            <source src={profileData.video_resume_url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <Button variant="outline" size="sm" className="mt-2" onClick={() =>
                            handleSelectChange('video_resume_url', '')}>Remove Video</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="preferred_job_type">Preferred Job Type</Label>
                        <Select
                          value={profileData.preferred_job_type}
                          onValueChange={(value) => handleSelectChange('preferred_job_type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Preferred Locations</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {profileData.preferred_locations.map((location, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                              {location}
                              <button
                                className="ml-1 text-xs"
                                onClick={() => handleArrayChange('preferred_locations', location, false)}
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <Input
                          className="mt-2"
                          placeholder="Add location"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              const target = e.target as HTMLInputElement
                              handleArrayChange('preferred_locations', target.value, true)
                              target.value = ''
                            }
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="desired_salary">Desired Salary</Label>
                        <div className="flex space-x-2">
                          <Select
                            value={profileData.desired_salary_currency}
                            onValueChange={(value) => handleSelectChange('desired_salary_currency', value)}
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            id="desired_salary"
                            name="desired_salary"
                            type="number"
                            value={profileData.desired_salary ?? ''}
                            onChange={handleInputChange}
                            placeholder="Amount"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="job_search_status">Job Search Status</Label>
                        <Select
                          value={profileData.job_search_status}
                          onValueChange={(value) => handleSelectChange('job_search_status', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Actively looking">Actively looking</SelectItem>
                            <SelectItem value="Open to opportunities">Open to opportunities</SelectItem>
                            <SelectItem value="Not looking">Not looking</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="work_authorization">Work Authorization</Label>
                        <Select
                          value={profileData.work_authorization}
                          onValueChange={(value) => handleSelectChange('work_authorization', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select work authorization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US Citizen">US Citizen</SelectItem>
                            <SelectItem value="Green Card Holder">Green Card Holder</SelectItem>
                            <SelectItem value="H1B Visa">H1B Visa</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="culture">
                <Card>
                  <CardHeader>
                    <CardTitle>Culture Fit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Preferred Company Sizes</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {['Startup', 'Small', 'Medium', 'Large', 'Enterprise'].map((size) => (
                            <div key={size} className="flex items-center space-x-2">
                              <Checkbox
                                id={`company-size-${size}`}
                                checked={profileData.preferred_company_sizes.includes(size)}
                                onCheckedChange={(checked) => 
                                  handleArrayChange('preferred_company_sizes', size, checked as boolean)
                                }
                              />
                              <Label htmlFor={`company-size-${size}`}>{size}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>What's important to you in a job?</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {['Work-life balance', 'Career growth', 'Compensation', 'Company culture', 'Remote work'].map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                              <Checkbox
                                id={`job-importance-${item}`}
                                checked={profileData.job_importance.includes(item)}
                                onCheckedChange={(checked) => 
                                  handleArrayChange('job_importance', item, checked as boolean)
                                }
                              />
                              <Label htmlFor={`job-importance-${item}`}>{item}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="remote_work_preference">Remote Work Preference</Label>
                        <Select
                          value={profileData.remote_work_preference}
                          onValueChange={(value) => handleSelectChange('remote_work_preference', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select remote work preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Remote only">Remote only</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="On-site">On-site</SelectItem>
                            <SelectItem value="Flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Interested Industries</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {profileData.interested_industries.map((industry, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                              {industry}
                              <button
                                className="ml-1 text-xs"
                                onClick={() => handleArrayChange('interested_industries', industry, false)}
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <Input
                          className="mt-2"
                          placeholder="Add industry"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              const target = e.target as HTMLInputElement
                              handleArrayChange('interested_industries', target.value, true)
                              target.value = ''
                            }
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
