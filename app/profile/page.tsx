'use client'

import React, { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Bell, Briefcase, ChevronDown, Code, DollarSign, FileIcon, Globe, GraduationCap, Home, MapPin, MessageSquare, Plus, Search, Settings, Upload, User, X, HelpCircle, LogOut } from 'lucide-react'
import { DayPicker } from "react-day-picker"
import { useProfile } from "../contexts/ProfileContext"

export default function ProfilePage() {
  const profile = useProfile()
  const { profileData, setProfileData, isLoading, user, updateProfile } = profile || {}
  const [supabase, setSupabase] = useState(null)

  const [newSkill, setNewSkill] = useState('')
  const [newExperience, setNewExperience] = useState({
    id: '',
    company: '',
    title: '',
    start_date: null,
    end_date: null,
    current_job: false,
    description: '',
    position_type: '',
  })
  const [newEducation, setNewEducation] = useState({
    id: '',
    school: '',
    degree: '',
    field_of_study: '',
    graduation_year: '',
    gpa: '',
    max_gpa: '4.0',
  })
  const [imageKey, setImageKey] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('idle')
  const { toast } = useToast()

  useEffect(() => {
    const initializeSupabase = async () => {
      const { createClientComponentClient } = await import('@supabase/auth-helpers-nextjs')
      const supabaseClient = createClientComponentClient({
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      })
      setSupabase(supabaseClient)
    }

    initializeSupabase()
  }, [])

  useEffect(() => {
    if (user && supabase) {
      fetchProfile()
    }
  }, [user, supabase])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error

      const parsedData = {
        ...data,
        work_experience: parseJsonField(data.work_experience, []),
        education: parseJsonField(data.education, []),
        skills: parseJsonField(data.skills, []),
        preferred_locations: parseJsonField(data.preferred_locations, []),
        preferred_company_sizes: parseJsonField(data.preferred_company_sizes, []),
        preferred_company_values: parseJsonField(data.preferred_company_values, []),
      }
      console.log('Parsed work_experience:', parsedData.work_experience)
      setProfileData(parsedData)
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast({
        title: "Error",
        description: "Failed to fetch profile data. Please try again.",
        variant: "destructive",
      })
    }
  }

  function parseJsonField(field: any, defaultValue: any[] = []) {
    if (Array.isArray(field)) return field
    if (typeof field === 'string') {
      try {
        return JSON.parse(field)
      } catch (error) {
        console.error(`Error parsing JSON field: ${error}`)
        return defaultValue
      }
    }
    return defaultValue
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (name, value, isChecked) => {
    setProfileData(prev => ({
      ...prev,
      [name]: isChecked
        ? [...(prev[name] || []), value]
        : (prev[name] || []).filter((item) => item !== value)
    }))
  }

  const handleSkillAdd = () => {
    if (newSkill && !profileData.skills?.includes(newSkill)) {
      const updatedSkills = [...(profileData.skills || []), newSkill]
      setProfileData(prev => ({
        ...prev,
        skills: updatedSkills
      }))
      setNewSkill('')
      handleSubmit({ skills: updatedSkills })
    }
  }

  const handleSkillRemove = (skill) => {
    const updatedSkills = (profileData.skills || []).filter(s => s !== skill)
    setProfileData(prev => ({
      ...prev,
      skills: updatedSkills
    }))
    handleSubmit({ skills: updatedSkills })
  }

  const handleExperienceAdd = () => {
    if (newExperience.company && newExperience.title && newExperience.start_date) {
      const id = Date.now().toString()
      const updatedExperience = {
        ...newExperience,
        id,
        start_date: format(new Date(newExperience.start_date), 'yyyy-MM-dd'),
        end_date: newExperience.current_job ? null : (newExperience.end_date ? format(new Date(newExperience.end_date), 'yyyy-MM-dd') : null),
      }
      const updatedWorkExperience = [...(profileData.work_experience || []), updatedExperience]
      setProfileData(prev => ({
        ...prev,
        work_experience: updatedWorkExperience
      }))
      setNewExperience({
        id: '',
        company: '',
        title: '',
        start_date: null,
        end_date: null,
        current_job: false,
        description: '',
        position_type: '',
      })
      handleSubmit({ work_experience: updatedWorkExperience })
    }
  }

  const handleExperienceRemove = (id) => {
    const updatedWorkExperience = (profileData.work_experience || []).filter(exp => exp.id !== id)
    setProfileData(prev => ({
      ...prev,
      work_experience: updatedWorkExperience
    }))
    handleSubmit({ work_experience: updatedWorkExperience })
  }

  const handleEducationAdd = () => {
    if (newEducation.school && newEducation.degree && newEducation.graduation_year) {
      const id = Date.now().toString()
      const updatedEducation = [...(profileData.education || []), { ...newEducation, id }]
      setProfileData(prev => ({
        ...prev,
        education: updatedEducation
      }))
      setNewEducation({
        id: '',
        school: '',
        degree: '',
        field_of_study: '',
        graduation_year: '',
        gpa: '',
        max_gpa: '4.0',
      })
      handleSubmit({ education: updatedEducation })
    }
  }

  const handleEducationRemove = (id) => {
    const updatedEducation = (profileData.education || []).filter(edu => edu.id !== id)
    setProfileData(prev => ({
      ...prev,
      education: updatedEducation
    }))
    handleSubmit({ education: updatedEducation })
  }

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      try {
        setUploadStatus('uploading')
        toast({
          title: "Uploading...",
          description: "Your profile picture is being uploaded.",
        })

        if (!user) throw new Error('No authenticated user')

        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${user.id}/${fileName}`

        let { error: uploadError, data } = await supabase.storage
          .from('profile-pics')
          .upload(filePath, file)

        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`)
        }

        if (!data) {
          throw new Error('No data returned from upload')
        }

        const { data: { publicUrl }, error: urlError } = supabase.storage
          .from('profile-pics')
          .getPublicUrl(data.path)

        if (urlError) {
          throw new Error(`Error getting public URL: ${urlError.message}`)
        }

        const updatedProfileData = {
          ...profileData,
          profile_photo_url: publicUrl
        }

        await updateProfile(updatedProfileData)

        setProfileData(updatedProfileData)
        setImageKey(prevKey => prevKey + 1)
        setUploadStatus('success')
        toast({
          title: "Success",
          description: "Profile picture uploaded and saved successfully",
        })
      } catch (error) {
        console.error('Error in image upload process:', error)
        setUploadStatus('error')
        toast({
          title: "Error",
          description: `Failed to upload profile picture: ${error.message}`,
          variant: "destructive",
        })
      }
    }
  }

  const handleSubmit = async (dataToUpdate = profileData) => {
    try {
      const formattedData = {
        ...dataToUpdate,
        work_experience: Array.isArray(dataToUpdate.work_experience) ? dataToUpdate.work_experience : [],
        education: Array.isArray(dataToUpdate.education) ? dataToUpdate.education : [],
        skills: Array.isArray(dataToUpdate.skills) ? dataToUpdate.skills : [],
        preferred_locations: Array.isArray(dataToUpdate.preferred_locations) ? dataToUpdate.preferred_locations : [],
        preferred_company_sizes: Array.isArray(dataToUpdate.preferred_company_sizes) ? dataToUpdate.preferred_company_sizes : [],
        preferred_company_values: Array.isArray(dataToUpdate.preferred_company_values) ? dataToUpdate.preferred_company_values : [],
      };

      const { error } = await supabase
        .from('profiles')
        .update(formattedData)
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getJobStatusColor = (status) => {
    switch (status) {
      case 'ready-to-interview':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'open-to-offers':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'closed-to-offers':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  if (!profile) {
    return <div>Error: Profile context is not available</div>
  }

  if (isLoading || !profileData) {
    return <div>Loading profile data...</div>
  }

  return (
    <div className="bg-white min-h-screen">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-blue-600">DF</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input className="pl-10 pr-4 py-2 w-64" placeholder="Search" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            value={profileData.job_search_status}
            onValueChange={(value) => handleSelectChange('job_search_status', value)}
          >
            <SelectTrigger className={`w-[200px] ${getJobStatusColor(profileData.job_search_status)}`}>
              <SelectValue placeholder="Set job search status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ready-to-interview">Ready to interview</SelectItem>
              <SelectItem value="open-to-offers">Open to offers</SelectItem>
              <SelectItem value="closed-to-offers">Closed to offers</SelectItem>
            </SelectContent>
          </Select>
          <Bell className="text-gray-600" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profileData.profile_photo_url} alt={profileData.full_name} />
                  <AvatarFallback>{profileData.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{profileData.full_name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profileData.job_search_status}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <span className="text-blue-600">Change</span>
              
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Personal</DropdownMenuLabel>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Edit profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Support</DropdownMenuLabel>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="bg-blue-600 text-white hover:bg-blue-700">
                <span>POST A JOB</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 p-4 border-r h-screen">
          <nav>
            <ul className="space-y-6">
              <li>
                <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                  <Home className="h-6 w-6 mb-1" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex flex-col items-center text-blue-600 font-semibold">
                  <User className="h-6 w-6 mb-1" />
                  <span>Profile</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                  <Briefcase className="h-6 w-6 mb-1" />
                  <span>Jobs</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                  <MessageSquare className="h-6 w-6 mb-1" />
                  <span>Messages</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                  <Search className="h-6 w-6 mb-1" />
                  <span>Discover</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Edit your Devfound profile</h1>
              <div className="text-sm text-gray-600">
                Profile last updated on: {new Date().toLocaleDateString()}
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="bg-muted">
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
                      <div className="flex items-start space-x-4 mb-6">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={profileData.profile_photo_url} alt={profileData.full_name} />
                          <AvatarFallback>{profileData.full_name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-xl font-semibold">{profileData.full_name}</h2>
                          <p className="text-gray-600">{profileData.title} • {profileData.years_of_experience} years of exp • {profileData.remote_work_preference}</p>
                          <div className="flex space-x-2 mt-2">
                            <Badge variant="outline">Active this week</Badge>
                            {profileData.website && <Badge variant="outline">Website</Badge>}
                            {profileData.resume_file_url && <Badge variant="outline">Resume</Badge>}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <section>
                          <h3 className="font-semibold mb-2">Looking for</h3>
                          <p>{profileData.looking_for}</p>
                        </section>

                        <section>
                          <h3 className="font-semibold mb-2">Achievements</h3>
                          <p>{profileData.achievements}</p>
                        </section>

                        <section>
                          <h3 className="font-semibold mb-2">Experience</h3>
                          {Array.isArray(profileData.work_experience) && profileData.work_experience.length > 0 ? (
                            profileData.work_experience.map((exp) => (
                              <div key={exp.id} className="mb-4">
                                <div className="flex items-center">
                                  <Briefcase className="mr-2 h-5 w-5 text-gray-500" />
                                  <h4 className="font-semibold">{exp.title}</h4>
                                </div>
                                <p className="text-gray-600 ml-7">{exp.company}</p>
                                <p className="text-sm text-gray-500 ml-7">
                                  {format(new Date(exp.start_date), 'MMM yyyy')} - 
                                  {exp.current_job ? 'Present' : (exp.end_date ? format(new Date(exp.end_date), 'MMM yyyy') : '')}
                                </p>
                                <p className="mt-2 ml-7">{exp.description}</p>
                              </div>
                            ))
                          ) : (
                            <p>No work experience added yet.</p>
                          )}
                        </section>

                        <section>
                          <h3 className="font-semibold mb-2">Education</h3>
                          {Array.isArray(profileData.education) && profileData.education.length > 0 ? (
                            profileData.education.map((edu) => (
                              <div key={edu.id} className="mb-2">
                                <div className="flex items-center">
                                  <GraduationCap className="mr-2 h-5 w-5 text-gray-500" />
                                  <p>{edu.school} • {edu.graduation_year}</p>
                                </div>
                                <p className="text-sm text-gray-500 ml-7">{edu.degree} in {edu.field_of_study}</p>
                                {edu.gpa && <p className="text-sm text-gray-500 ml-7">GPA: {edu.gpa}/{edu.max_gpa}</p>}
                              </div>
                            ))
                          ) : (
                            <p>No education history added yet.</p>
                          )}
                        </section>

                        <section>
                          <h3 className="font-semibold mb-2">Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(profileData.skills) && profileData.skills.length > 0 ? (
                              profileData.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">{skill}</Badge>
                              ))
                            ) : (
                              <p>No skills added yet.</p>
                            )}
                          </div>
                        </section>

                        <section>
                          <h3 className="font-semibold mb-2">Ideal next opportunity</h3>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <DollarSign className="mr-2 h-5 w-5 text-gray-500" />
                              <p><span className="font-semibold">Desired Salary:</span> ${profileData.desired_salary} {profileData.desired_salary_currency}</p>
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="mr-2 h-5 w-5 text-gray-500" />
                              <p><span className="font-semibold">Desired Role:</span> {profileData.title}</p>
                            </div>
                            <div className="flex items-center">
                              <Globe className="mr-2 h-5 w-5 text-gray-500" />
                              <p><span className="font-semibold">Remote Work:</span> {profileData.remote_work_preference}</p>
                            </div>
                            <div>
                              <div className="flex items-center mb-1">
                                <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                                <span className="font-semibold">Desired Location:</span>
                              </div>
                              <div className="flex flex-wrap gap-2 ml-7">
                                {Array.isArray(profileData.preferred_locations) && profileData.preferred_locations.length > 0 ? (
                                  profileData.preferred_locations.map((location, index) => (
                                    <Badge key={index} variant="outline">{location}</Badge>
                                  ))
                                ) : (
                                  <p>No preferred locations added yet.</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                      <p className="text-sm text-muted-foreground">Tell us about yourself so startups know who you are</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-24 h-24">
                          <AvatarImage key={imageKey} src={profileData.profile_photo_url} alt={profileData.full_name} />
                          <AvatarFallback>{profileData.full_name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Label htmlFor="profile-photo" className="cursor-pointer">
                            <div className="flex items-center space-x-2 text-blue-600">
                              <Upload className="h-4 w-4" />
                              <span>Upload a new photo</span>
                            </div>
                          </Label>
                          <Input
                            id="profile-photo"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                          {uploadStatus === 'uploading' && <p className="text-sm text-gray-500">Uploading...</p>}
                          {uploadStatus === 'error' && <p className="text-sm text-red-500">Upload failed. Please try again.</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="full_name">Your name*</Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          value={profileData.full_name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Where are you based?*</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="location"
                            name="location"
                            value={profileData.location}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Select your primary role*</Label>
                          <Select value={profileData.title} onValueChange={(value) => handleSelectChange('title', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                              <SelectItem value="Product Manager">Product Manager</SelectItem>
                              <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                              <SelectItem value="UX Designer">UX Designer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="years_of_experience">Years of experience*</Label>
                          <Select value={profileData.years_of_experience} onValueChange={(value) => handleSelectChange('years_of_experience', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select years" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-2">0-2 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="6-8">6-8 years</SelectItem>
                              <SelectItem value="9+">9+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Your bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleInputChange}
                          rows={5}
                        />
                        <p className="text-sm text-muted-foreground">275 characters left</p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Social Profiles</h3>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            name="website"
                            value={profileData.website}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            name="linkedin"
                            value={profileData.linkedin}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub</Label>
                          <Input
                            id="github"
                            name="github"
                            value={profileData.github}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="twitter">Twitter</Label>
                          <Input
                            id="twitter"
                            name="twitter"
                            value={profileData.twitter}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Your Skills</h3>
                        <p className="text-sm text-muted-foreground">Add up to 20 skills</p>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(profileData.skills) && profileData.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                                onClick={() => handleSkillRemove(skill)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="e.g. Python, React"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                          />
                          <Button onClick={handleSkillAdd} className="bg-blue-600 text-white hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Add
                          </Button>
                        </div>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="work-experience">
                          <AccordionTrigger>Your work experience</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              {Array.isArray(profileData.work_experience) && profileData.work_experience.map((exp) => (
                                <div key={exp.id} className="border p-4 rounded-md">
                                  <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold">{exp.title}</h4>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleExperienceRemove(exp.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <p>{exp.company}</p>
                                  <p className="text-sm text-gray-500">
                                    {format(new Date(exp.start_date), 'MMM yyyy')} - 
                                    {exp.current_job ? 'Present' : (exp.end_date ? format(new Date(exp.end_date), 'MMM yyyy') : '')}
                                  </p>
                                  <p className="mt-2">{exp.description}</p>
                                </div>
                              ))}
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="company">Company*</Label>
                                    <Input
                                      id="company"
                                      placeholder="Company name"
                                      value={newExperience.company}
                                      onChange={(e) =>                                         setNewExperience({ ...newExperience, company: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="title">Title*</Label>
                                    <Input
                                      id="title"
                                      placeholder="Job title"
                                      value={newExperience.title}
                                      onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="start_date">Start Date*</Label>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !newExperience.start_date && "text-muted-foreground"
                                          )}
                                        >
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {newExperience.start_date ? format(new Date(newExperience.start_date), "PPP") : <span>Pick a date</span>}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <DayPicker
                                          mode="single"
                                          selected={newExperience.start_date ? new Date(newExperience.start_date) : undefined}
                                          onSelect={(date) => setNewExperience({ ...newExperience, start_date: date ? date.toISOString() : null })}
                                          initialFocus
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="end_date">End Date</Label>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !newExperience.end_date && "text-muted-foreground"
                                          )}
                                          disabled={newExperience.current_job}
                                        >
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {newExperience.end_date ? format(new Date(newExperience.end_date), "PPP") : <span>Pick a date</span>}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <DayPicker
                                          mode="single"
                                          selected={newExperience.end_date ? new Date(newExperience.end_date) : undefined}
                                          onSelect={(date) => setNewExperience({ ...newExperience, end_date: date ? date.toISOString() : null })}
                                          initialFocus
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id="current-job"
                                    checked={newExperience.current_job}
                                    onCheckedChange={(checked) => setNewExperience({ ...newExperience, current_job: checked, end_date: null })}
                                  />
                                  <Label htmlFor="current-job">I currently work here</Label>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="description">Description</Label>
                                  <Textarea
                                    id="description"
                                    placeholder="Describe your role and responsibilities"
                                    value={newExperience.description}
                                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="position-type">Position Type</Label>
                                  <Select
                                    value={newExperience.position_type}
                                    onValueChange={(value) => setNewExperience({ ...newExperience, position_type: value })}
                                  >
                                    <SelectTrigger id="position-type">
                                      <SelectValue placeholder="Select position type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="full-time">Full-time</SelectItem>
                                      <SelectItem value="part-time">Part-time</SelectItem>
                                      <SelectItem value="contract">Contract</SelectItem>
                                      <SelectItem value="internship">Internship</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button onClick={handleExperienceAdd} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Work Experience
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="education">
                          <AccordionTrigger>Education</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              {Array.isArray(profileData.education) && profileData.education.map((edu) => (
                                <div key={edu.id} className="border p-4 rounded-md">
                                  <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold">{edu.school}</h4>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEducationRemove(edu.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <p>{edu.degree} in {edu.field_of_study}</p>
                                  <p className="text-sm text-gray-500">{edu.graduation_year}</p>
                                  {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}/{edu.max_gpa}</p>}
                                </div>
                              ))}
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="school">School*</Label>
                                    <Input
                                      id="school"
                                      placeholder="College or University"
                                      value={newEducation.school}
                                      onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="degree">Degree*</Label>
                                    <Select
                                      value={newEducation.degree}
                                      onValueChange={(value) => setNewEducation({ ...newEducation, degree: value })}
                                    >
                                      <SelectTrigger id="degree">
                                        <SelectValue placeholder="Select degree" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="bachelor">Bachelor's</SelectItem>
                                        <SelectItem value="master">Master's</SelectItem>
                                        <SelectItem value="phd">Ph.D.</SelectItem>
                                        <SelectItem value="associate">Associate's</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="field_of_study">Field of Study</Label>
                                    <Input
                                      id="field_of_study"
                                      placeholder="e.g. Computer Science"
                                      value={newEducation.field_of_study}
                                      onChange={(e) => setNewEducation({ ...newEducation, field_of_study: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="graduation_year">Graduation Year*</Label>
                                    <Input
                                      id="graduation_year"
                                      placeholder="YYYY"
                                      value={newEducation.graduation_year}
                                      onChange={(e) => setNewEducation({ ...newEducation, graduation_year: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="gpa">GPA</Label>
                                    <Input
                                      id="gpa"
                                      placeholder="e.g. 3.5"
                                      value={newEducation.gpa}
                                      onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="max_gpa">Max GPA</Label>
                                    <Input
                                      id="max_gpa"
                                      placeholder="e.g. 4.0"
                                      value={newEducation.max_gpa}
                                      onChange={(e) => setNewEducation({ ...newEducation, max_gpa: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <Button onClick={handleEducationAdd} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Education
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Achievements</h3>
                        <p className="text-sm text-muted-foreground">Sharing more details about yourself will help you stand out more</p>
                        <Textarea
                          name="achievements"
                          value={profileData.achievements}
                          onChange={handleInputChange}
                          placeholder="Share your notable achievements, awards, or recognition"
                          rows={5}
                        />
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
                          <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
                          <Input type="file" accept=".pdf,.doc,.docx" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Current Resume</h3>
                          {profileData.resume_file_url ? (
                            <div className="flex items-center space-x-2">
                              <FileIcon className="h-6 w-6" />
                              <span>{profileData.resume_file_url.split('/').pop()}</span>
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Delete</Button>
                            </div>
                          ) : (
                            <p>No resume uploaded yet.</p>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Video Resume</h3>
                          <Input type="file" accept="video/*" />
                        </div>
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
                      <div className="space-y-6">
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
                              <SelectItem value="full-time">Full-time</SelectItem>
                              <SelectItem value="part-time">Part-time</SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="internship">Internship</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Preferred Locations</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {['Remote', 'New York', 'San Francisco', 'London'].map((location) => (
                              <div key={location} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`location-${location}`}
                                  checked={profileData.preferred_locations?.includes(location)}
                                  onCheckedChange={(checked) => handleArrayChange('preferred_locations', location, checked)}
                                />
                                <label
                                  htmlFor={`location-${location}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {location}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="desired_salary">Desired Salary</Label>
                            <Input
                              id="desired_salary"
                              name="desired_salary"
                              type="number"
                              value={profileData.desired_salary}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="desired_salary_currency">Currency</Label>
                            <Select
                              value={profileData.desired_salary_currency}
                              onValueChange={(value) => handleSelectChange('desired_salary_currency', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                                <SelectItem value="GBP">GBP</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
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
                              <SelectItem value="us_citizen">US Citizen</SelectItem>
                              <SelectItem value="green_card">Green Card</SelectItem>
                              <SelectItem value="h1b">H1B Visa</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Preferred Company Sizes</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {['Startup', 'Small', 'Medium', 'Large'].map((size) => (
                              <div key={size} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`company-size-${size}`}
                                  checked={profileData.preferred_company_sizes?.includes(size)}
                                  onCheckedChange={(checked) => handleArrayChange('preferred_company_sizes', size, checked)}
                                />
                                <label
                                  htmlFor={`company-size-${size}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {size}
                                </label>
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
                              <SelectItem value="remote">Remote Only</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="onsite">On-site</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
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
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="looking_for">What are you looking for in your next role?</Label>
                          <Textarea
                            id="looking_for"
                            name="looking_for"
                            value={profileData.looking_for}
                            onChange={handleInputChange}
                            rows={4}
                          />
                        </div>
                        <div>
                          <Label>Work Style Preferences</Label>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            {[
                              'Collaborative', 'Independent',
                              'Fast-paced', 'Structured',
                              'Creative', 'Analytical',
                              'Leadership opportunities', 'Mentorship'
                            ].map((style) => (
                              <div key={style} className="flex items-center space-x-2">
                                <Checkbox id={`style-${style}`} />
                                <label
                                  htmlFor={`style-${style}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {style}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Values Alignment</Label>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            {[
                              'Work-life balance', 'Innovation',
                              'Diversity & Inclusion', 'Sustainability',
                              'Social impact', 'Career growth',
                              'Company stability', 'Cutting-edge technology'
                            ].map((value) => (
                              <div key={value} className="flex items-center space-x-2">
                                <Checkbox id={`value-${value}`} />
                                <label
                                  htmlFor={`value-${value}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {value}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <Button type="submit" className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
