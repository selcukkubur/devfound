'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profileData, setProfileData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        fetchProfile(user.id)
      } else {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      // Ensure all array fields are initialized
      const sanitizedData = {
        ...data,
        skills: data.skills || [],
        work_experience: data.work_experience || [],
        education: data.education || [],
        preferred_locations: data.preferred_locations || [],
        preferred_company_sizes: data.preferred_company_sizes || [],
        preferred_company_values: data.preferred_company_values || [],
      }

      setProfileData(sanitizedData)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (updatedData) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updatedData)
        .eq('id', user.id)

      if (error) throw error

      setProfileData(updatedData)
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  const value = {
    user,
    profileData,
    setProfileData,
    isLoading,
    updateProfile,
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
